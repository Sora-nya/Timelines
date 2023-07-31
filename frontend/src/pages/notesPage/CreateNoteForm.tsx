import axios from "axios";
import { AddButtonId } from "./types";


interface CreateNoteProps {
    getNotes: () => void;
    positionId: AddButtonId;
    id: string;
    onClose: () => void;
  }
  
  export const CreateNote: React.FC<CreateNoteProps> = (props) => {
    const { getNotes, positionId, id, onClose } = props;
    return (<form
  
      onSubmit={(e: React.SyntheticEvent) => {
        console.log(e);
        e.preventDefault();
        const target = e.target as typeof e.target & {
          title: { value: string };
          content: { value: string };
        };
        const title = target.title.value;
        const content = target.content.value;
        axios.post(`http://localhost:8080/api/timelines/${id}/notes`,
          {
            title,
            content,
            priorId: positionId.priorId,
            posteriorId: positionId.posteriorId
          }).then(() => {
            getNotes();
            onClose();
          });
  
      }}
    >
      <div>
        <label>
          Title:
          <input type="text" name="title" />
        </label>
      </div>
      <div>
        <label>
          Content:
          <input type="text" name="content" />
        </label>
      </div>
      <div>
        <input type="submit" value="Save note" />
      </div>
    </form>)
  }
  
  
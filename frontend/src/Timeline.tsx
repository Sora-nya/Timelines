import axios from "axios"
import { useEffect, useState } from "react"
import { Note } from "./types/types";

export const Timeline: React.FC = () => {
    const [notes, setNotes] = useState<Note[]>();

    useEffect(() => {
        getNotes();
    }, [])

    function getNotes() {
        axios.get('http://localhost:8080/api/notes').then((response) => {
            setNotes(response.data);
        }, (reason) => { console.log(reason) })
            .catch(e => {
                console.log(e)
            })
    }

    return (<div>
        <h1>Timeline</h1>
        <CreateNote getNotes={getNotes}/>
        <ol>
            {notes?.map((note)=> <li>{note.id}:{note.title}:{note.content}</li>)}
        </ol>
    </div>
    )
}

interface CreateNoteProps {
    getNotes: ()=>void
}

export const CreateNote: React.FC<CreateNoteProps> = (props) =>{
    const {getNotes} = props;
    return (<form
    //ref={formRef}
    onSubmit={(e: React.SyntheticEvent) => {
        console.log(e);
      e.preventDefault();
      const target = e.target as typeof e.target & {
        title: { value: string };
        content: { value: string };
      };
      const title = target.title.value; 
      const content = target.content.value; 
      axios.post('http://localhost:8080/api/notes',{title, content}).then(()=>{getNotes()});
      
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
      <input type="submit" value="Log in" />
    </div>
  </form>)
}

import axios from "axios";
import { AddButtonId } from "./types";
import { useFormik } from "formik";
import { useEffect, useRef } from "react";
import { ButtonContainer, CenteredContainer, FormContainer, StyledButton, StyledContentField, StyledTitleField } from "./Notes.style";

// todo - remove ambuguity with optional types (2 types? 2 more specific components like AddNote, EditNote, that use NoteForm?)
interface AddNoteFormProps {
  refreshNotes: () => void;
  positionId: AddButtonId;
  timelineId: string;
  onClose: () => void;
}


interface EditNoteFormProps {
  refreshNotes: () => void;
  timelineId: string;
  onClose: () => void;
  initialValues: {
    title?: string;
    content?: string;
  };
  noteId: string;
}

// TODO: ogarnąć u Pana Bucina jak to otypować
interface NoteFormProps {
  refreshNotes: () => void;
  timelineId: string;
  positionId?: AddButtonId;
  onClose: () => void;
  initialValues?: {
    title?: string;
    content?: string;
  };
  noteId?: string;
}
// type NoteFormProps=AddNoteFormProps & EditNoteFormProps;

export const AddNoteForm: React.FC<AddNoteFormProps> = (props) => {
  return (<NoteForm {...props}></NoteForm>)
}

export const EditNoteForm: React.FC<EditNoteFormProps> = (props) => {
  return (<NoteForm {...props}></NoteForm>)
}

const NoteForm: React.FC<NoteFormProps> = (props) => {
  const { refreshNotes: getNotes, positionId, timelineId: id, onClose, initialValues, noteId } = props;
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    const apiUrl = noteId
      ? `http://localhost:8080/api/timelines/${id}/notes/${noteId}`
      : `http://localhost:8080/api/timelines/${id}/notes`;

    const requestMethod = noteId ? axios.put : axios.post;

    const requestBody = noteId
      ? {
        id: noteId,
        title: values.title,
        content: values.content,
      }
      : {
        title: values.title,
        content: values.content,
        priorId: positionId!.priorId,
        posteriorId: positionId!.posteriorId,
      };

    requestMethod(apiUrl, requestBody)
      .then(() => {
        getNotes();
        onClose();
      })
      .catch((error) => {
        console.error('Error editing/creating note:', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      title: props.initialValues?.title || '',
      content: props.initialValues?.content || '',
    },
    onSubmit: handleSubmit,
  });

  useEffect(() => {
    if (formRef.current !== null) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [formRef]);

  return (
    <CenteredContainer>
      <FormContainer>

        <form ref={formRef} onSubmit={formik.handleSubmit}>
          <div>
            <label>
              Title:
              <StyledTitleField
                type="text"
                name="title"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.title}
              />
            </label>
            {formik.touched.title && formik.errors.title ? (
              <div>{formik.errors.title}</div>
            ) : null}
          </div>
          <div>
            <label>
              Content:
              <StyledContentField
                name="content"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.content}
              />
            </label>
            {formik.touched.content && formik.errors.content ? (
              <div>{formik.errors.content}</div>
            ) : null}
          </div>
          <div>
            <ButtonContainer>
              <StyledButton type="submit">Save note</StyledButton>
              <StyledButton type="button" onClick={onClose}>Close</StyledButton>
            </ButtonContainer>
          </div>
        </form>
      </FormContainer>
    </CenteredContainer>
  );
};

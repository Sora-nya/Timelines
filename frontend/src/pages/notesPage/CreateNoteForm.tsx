import axios from "axios";
import { AddButtonId } from "./types";
import { Form, Formik, useFormik } from "formik";
import styled from "styled-components";
import { useEffect, useRef } from "react";

const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
`;

const FormContainer = styled.div`
  width: 50%;
  padding: 2rem;
  background-color: ${(props) => props.theme.colors.accent};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledTitleField = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 4px;
  height: 20px; 
`;

const StyledContentField = styled.textarea`
  width: 100%;
  height: 75px; /* Adjust the height as needed */
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 4px;
  resize: vertical; /* Allows the textarea to be resized vertically */
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const StyledButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 1rem;
  background-color: ${(props) => props.theme.colors.callToAction};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.highlight};
  }
`;

interface CreateNoteProps {
  getNotes: () => void;
  positionId: AddButtonId;
  id: string;
  onClose: () => void;
}

export const CreateNote: React.FC<CreateNoteProps> = (props) => {
  const { getNotes, positionId, id, onClose } = props;
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleSubmit = (values: any, { setSubmitting }: any) => {
    axios
      .post(`http://localhost:8080/api/timelines/${id}/notes`, {
        title: values.title,
        content: values.content,
        priorId: positionId.priorId,
        posteriorId: positionId.posteriorId,
      })
      .then(() => {
        getNotes();
        onClose();
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      content: '',
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

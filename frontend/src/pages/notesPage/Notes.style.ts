import styled from "styled-components";

export const TimelineTitle = styled.h1`
  color: ${props => props.theme.colors.highlight};
  font-size: 2rem;
  font-weight: bold;
  padding: 1rem;
`;

export const NotesContainer = styled.div`
display: flex;
flex-direction: column; //main-axis
justify-content: flex-start;
align-items: center;
height: 100vh;
`;


interface NoteItemProps {
    isRight: boolean;
}

export const HeaderContainer = styled.div`
    position: relative;
  `;

export const BackToTimelinesButtonContainer = styled.div`
    display: flex;
    justify-content: center;
    margin: 1rem;
  `;

export const BackToTimelinesButton = styled.button`
    position: absolute;
    top: 10px;
    left: 10px;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.accent};
    color: ${(props) => props.theme.colors.text};
    cursor: pointer;
  `;

export const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  display: flex;
  gap: 10px;
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

interface StyledNoteItemProps {
    isRight: boolean;
}
///margin right/left:auto 2. Align-self:flex-start:end
export const StyledNoteItem = styled.div<StyledNoteItemProps>`
  display: flex;
  flex-direction: column;
  width: 45%;
  align-self: ${(props) => (props.isRight ? 'flex-end' : 'flex-start')};

  margin: 1rem;
  padding: 1rem;

  background-color: ${(props) => props.theme.colors.accent};

  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
  ${IconContainer} ${Icon} {
    opacity: 0;
  }
  &:hover ${IconContainer} ${Icon} {
    opacity: 0.3
  }
  &:hover ${IconContainer} ${Icon}:hover {
    opacity: 1
  }
`;

export const Title = styled.h2`
  color: ${(props) => props.theme.colors.text};
  font-size: 1.2rem;
  font-weight: bold;
`;

export const Content = styled.p`
  color: ${(props) => props.theme.colors.text};
`;

interface ButtonIdProps {
    isSelected?: boolean;
}

export const StyledAddNoteButton = styled.button<ButtonIdProps>`
    padding: 0.5rem 1rem;
    margin: 0 0.5rem;
    border: none;
    border-radius: 5px;
    background-color: ${(props) => props.theme.colors.accent};
    color: ${(props) => props.theme.colors.text};
    opacity: ${(props) => (props.isSelected ? '1' : '0.2')};
    cursor: pointer;
    &:hover {
      opacity: 0.81; 
    }
  `;

export const CenteredContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40vh;
`;

export const FormContainer = styled.div`
  width: 50%;
  padding: 2rem;
  background-color: ${(props) => props.theme.colors.accent};
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const StyledTitleField = styled.input`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 4px;
  height: 20px; 
`;

export const StyledContentField = styled.textarea`
  width: 100%;
  height: 75px; /* Adjust the height as needed */
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border: 1px solid ${(props) => props.theme.colors.primary};
  border-radius: 4px;
  resize: vertical;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

export const StyledButton = styled.button`
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

export const HeaderIconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  display: flex;
  gap: 10px;
  opacity: 0; /* Set the initial opacity to make icons invisible */
  transition: opacity 0.3s ease-in-out;
`;

export const HeaderIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 1rem;
  cursor: pointer;
`;
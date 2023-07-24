import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Note, Timeline } from '../../types/types';
import axios from 'axios';
import styled from 'styled-components';

// formik
// dodanie nowego note'a (też gdzie, trzy przypadki)`+/-
// formularz (form) formiku) do stworzenia note'a || reuse from timeline.tsx
// wyświetlanie formularze kiedy kliknie się add - przekazać formie w jakim miejscu add został kliknięty
// zmienienie buttonów na Komponenty, które mają props typu AddId
// po kliknięciu w button zapisanie w stanie NotesPage AddId tego buttona
// podświetlenie buttona - stan kiedy przycis add jest kliknięty

const TimelineTitle = styled.h1`
  color: ${props => props.theme.colors.chocolateCosmos};
  font-size: 2rem;
  font-weight: bold;
`;

const NotesContainer = styled.div`
display: flex;
flex-direction: column; //main-axis
justify-content: flex-start;
align-items: center;

height: 100vh;

`;

interface NoteItemProps {
  isRight: boolean;
}

///margin right/left:auto 2. Align-self:flex-start:end
const NoteItem = styled.div<NoteItemProps>`
display: flex;
flex-direction: column;
width:45%;
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
`;

const Title = styled.h2`
  color: ${(props) => props.theme.colors.text};
  font-size: 1.2rem;
  font-weight: bold;
`;

const Content = styled.p`
  color: ${(props) => props.theme.colors.text};
`;

const HeaderContainer = styled.div`
  position: relative;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`;

const BackToTimelinesButton = styled.button`
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

const AddNoteButton = styled.button`
  padding: 0.5rem 1rem;
  margin: 0 0.5rem;
  border: none;
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.accent};
  color: ${(props) => props.theme.colors.text};
  opacity: 0.3;
  cursor: pointer;
  &:hover {
    opacity: 0.81; 
  }
`;

export const NotesPage = () => {
  const { timelineId } = useParams();
  const [timeline, setTimeline] = useState<Timeline>();
  const navigate = useNavigate();

  const fetchData = () => {
    axios
      .get(`http://localhost:8080/api/timelines/${timelineId}`)
      .then((response) => {
        setTimeline(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  };

  useEffect(() => {
    fetchData();
  }, [timelineId]);

  const handleGoBack = () => {
    navigate('/');
  };

  const renderNotesWithButtons = (note: Note, index: number) => {
    return (
      <>
        {index > 0 && (
          <AddNoteButton>
            prior: {timeline!.notes[index - 1].id}
            posterior: {note.id}
          </AddNoteButton>
        )}
        <NoteItem isRight={index % 2 === 1}>
          <Title>{note.title}</Title>
          <Content>{note.content}</Content>
        </NoteItem>
      </>
    );
  };

  return (
    <div>
      <ButtonContainer>
        <BackToTimelinesButton onClick={handleGoBack}>Go back to timelines!</BackToTimelinesButton>
      </ButtonContainer>
      <HeaderContainer>
        <TimelineTitle>{timeline?.title}</TimelineTitle>
      </HeaderContainer>
      {timeline && (
        <NotesContainer>
          <AddNoteButton>
            prior: {null}
            posterior: {timeline.notes.length > 0 ? timeline.notes[0].id : null}
          </AddNoteButton>

          {timeline.notes.map((note, index) => renderNotesWithButtons(note, index))}
 
          {timeline.notes.length > 0 && (
            <AddNoteButton>
              prior: {timeline.notes[timeline.notes.length - 1].id}
              posterior: {null}
            </AddNoteButton>)
          }
        </NotesContainer>
      )

      }

    </div>
  );
};

interface AddId {
  priorId: number;
  posteriorId: number;
}



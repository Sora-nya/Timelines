import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Note, Timeline } from '../../types/types';
import axios from 'axios';
import styled from 'styled-components';

// zrobić widok, w którym wyświetlę stubowe dane +
// wyciagnąć id timeline'a z path +
// uzyć go jako param urla do zapytania do backendu +
// zrobić faktyczne zapytanie i podłączyć do stanu aby rzeczywiste dane były fetchowane i pokazywane +
// ostylowanie notów pod alternating
// formik
// dodanie nowego note'a (też gdzie, trzy przypadki)`
// przyciski add między elementami timeline'u i na początku i końcu
// formularz (form) formiku) do stworzenia note'a || reuse from timeline.tsx
// wyświetlanie formularze kiedy kliknie się add - przekazać formie w jakim miejscu add został kliknięty
//podświetlenie buttona - stan kiedy przycis add jest kliknięty


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

export const NotesPage = () => {
  const { timelineId } = useParams();
  const [notes, setNotes] = useState<Timeline>();
  const [insertAt, setInsertAt] = useState<AddId>();

  useEffect(() => {
    const getNotes = () => {
      axios.get(`http://localhost:8080/api/timelines/${timelineId}`).then((response) => {
        console.log(response.data)
        setNotes(response.data);
      }, (reason) => { console.log(reason) })
        .catch(e => {
          console.log(e)
        })
    };

    getNotes();
  }, [timelineId]);

  return (
    <div>
      <h1>Notes Page</h1>
      <p>Timeline ID: {timelineId}</p>
      <NotesContainer>
        
        {notes?.notes.map((note, index) => (
          // ciężko tu będzie użyć .map -> potencjalnie zwykłe imperatywne for loop
          <NoteItem key={note.id} isRight={index % 2 === 1}>
            <Title>{note.title}</Title>
            <Content>{note.content}</Content>
          </NoteItem>
        ))}
      </NotesContainer>
    </div>
  );
};

interface AddId {
  priorId: number;
  posteriorId: number;
}


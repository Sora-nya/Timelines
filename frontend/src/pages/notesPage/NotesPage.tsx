import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Note, Timeline } from '../../types/types';
import axios from 'axios';
import styled from 'styled-components';
import { NoteForm } from './NoteForm';
import { AddButtonId } from './types';
import NoteItem from './NoteItem';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


//todo Wykminić, jak zrobić reorderowanie notatek na frontendzie
// - koncepcyjnie, jak to by miało wyglądać. Zrabialność tego ogarniemy później.
//todo edycja note'ów
//todo jak wygląda aktualny komponent renderujący note'a 
//todo dodać dwa przyciski
//todo te przyciski mają wołać funkcje po naciśnięciu
//todo przycisk edit powinien zmieniać zawartość  
//wrzucić note item do własnego komponentu
//todo usuwanie note'ów

const TimelineTitle = styled.h1`
  color: ${props => props.theme.colors.highlight};
  font-size: 2rem;
  font-weight: bold;
  padding: 1rem;
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

interface ButtonIdProps {
  isSelected?: boolean;
}

const StyledAddNoteButton = styled.button<ButtonIdProps>`
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

export const NotesPage = () => {
  const { timelineId } = useParams();
  const [timeline, setTimeline] = useState<Timeline>();
  const [selectedButton, setSelectedButton] = useState<AddButtonId>()
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

  const updateSelectedButton = (addId: AddButtonId): void => {
    setSelectedButton(addId);
  };

  const handleDragEnd = (result: any) => {
    console.log(result);
  }

  const renderNotesWithButtons = (note: Note, index: number) => {
    const priorId = index > 0 ? timeline!.notes[index - 1].id : null;
    const isSelected = (): boolean => {
      return selectedButton?.priorId === priorId && selectedButton?.posteriorId === posteriorId;
    };
    const posteriorId = note.id;

    const handleDeleteNote = async (noteId: number) => {
      const confirmed = window.confirm('Are you sure you want to delete this note?');

      if (confirmed) {
        try {
          await axios.delete(`http://localhost:8080/api/notes/${noteId}`);

          fetchData();
        } catch (error) {
          console.error('Error deleting note:', error);
        }
      }
    };


    return (
      <>
        {index > 0 && (
          <AddNoteButton
            priorId={priorId}
            posteriorId={posteriorId}
            onClick={updateSelectedButton}
            selected={isSelected()}
          />
        )}
        <Draggable key={""+note.id}  index={index} draggableId={""+note.id}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <NoteItem
                key={note.id}
                isRight={index % 2 === 1}
                title={note.title}
                content={note.content}
                onDelete={() => handleDeleteNote(note.id)}
                onEdit={() => { }}
              />
            </div>
          )}

        </Draggable>

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
      {selectedButton !== undefined && timelineId !== undefined && (
        <NoteForm
          getNotes={fetchData}
          positionId={selectedButton}
          timelineId={timelineId}
          onClose={() => setSelectedButton(undefined)}
        ></NoteForm>
      )
      }
      {timeline && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <NotesContainer>
            <AddNoteButton
              priorId={null}
              posteriorId={timeline.notes.length > 0 ? timeline.notes[0].id : null}
              onClick={updateSelectedButton}
              selected={selectedButton?.priorId === null && selectedButton?.posteriorId === (timeline.notes.length > 0 ? timeline.notes[0].id : null)}
            />
            <Droppable droppableId='droppable'>
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {timeline.notes.map((note, index) => renderNotesWithButtons(note, index))}
                </div>
              )}
            </Droppable>
            {timeline.notes.length > 0 && (
              <AddNoteButton
                priorId={timeline.notes[timeline.notes.length - 1].id}
                posteriorId={null}
                onClick={updateSelectedButton}
                selected={selectedButton?.priorId === timeline.notes[timeline.notes.length - 1].id && selectedButton?.posteriorId === null}
              />
            )
            }
          </NotesContainer>
        </DragDropContext>
      )}
    </div>
  );
};

interface AddIdButtonProps {
  priorId: number | null;
  posteriorId: number | null;
  selected?: boolean;
  onClick: (addId: AddButtonId) => void;
}

const AddNoteButton: React.FC<AddIdButtonProps> = (data) => {
  const { onClick, selected, posteriorId, priorId } = data;
  return (
    <StyledAddNoteButton isSelected={selected} onClick={() =>
      onClick({ priorId: priorId, posteriorId: posteriorId })
    }>
      Add note!
    </StyledAddNoteButton>
  );
};

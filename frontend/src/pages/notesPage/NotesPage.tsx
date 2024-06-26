import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Note, Timeline } from 'types/types';
import axios from 'axios'
import { AddNoteForm } from './NoteForm';
import { AddButtonId } from './types';
import { NoteItem } from './NoteItem';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { BackToTimelinesButton, HeaderContainer, TimelineTitle, NotesContainer, StyledAddNoteButton, BackToTimelinesButtonContainer } from './Notes.style';

//todo walidacja na froncie zawartości inputów

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
    const { destination } = result;
    console.info(result);
    if (destination === null) {
      return;
    }
    const priorId = destination.index == 0
      ? null
      : timeline?.notes[destination.index - 1].id;
    const posteriorId = destination.index == timeline!.notes.length - 1
      ? null
      : timeline?.notes[destination.index + 1].id;
    axios
      .put(`http://localhost:8080/api/timelines/${timelineId}/notes/${result.draggableId}/reorder`,
        {
          id: +result.draggableId,
          priorId, posteriorId: posteriorId
        }
      ).then(() => {
        fetchData();
      })

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
        <NoteItem
          id={"" + note.id}
          index={index}
          key={note.id}
          isRight={index % 2 === 1}
          title={note.title}
          content={note.content}
          onDelete={() => handleDeleteNote(note.id)}
          refreshData={fetchData}
          timelineId={timelineId!}
        />
      </>
    );
  };

  return (
    <div>
      <BackToTimelinesButtonContainer>
        <BackToTimelinesButton onClick={handleGoBack}>Go back to timelines!</BackToTimelinesButton>
      </BackToTimelinesButtonContainer>
      <HeaderContainer>
        <TimelineTitle>{timeline?.title}</TimelineTitle>
      </HeaderContainer>
      {selectedButton !== undefined && timelineId !== undefined && (
        <AddNoteForm
          refreshNotes={fetchData}
          positionId={selectedButton}
          timelineId={timelineId}
          onClose={() => setSelectedButton(undefined)}
        ></AddNoteForm>
      )
      }
      {timeline && (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId='droppable'>
            {(provided, snapshot) => (
              <NotesContainer {...provided.droppableProps}
                ref={provided.innerRef}>
                <AddNoteButton
                  priorId={null}
                  posteriorId={timeline.notes.length > 0 ? timeline.notes[0].id : null}
                  onClick={updateSelectedButton}
                  selected={selectedButton?.priorId === null && selectedButton?.posteriorId === (timeline.notes.length > 0 ? timeline.notes[0].id : null)}
                />

                {timeline.notes.map((note, index) => renderNotesWithButtons(note, index))}

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
            )}
          </Droppable>
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

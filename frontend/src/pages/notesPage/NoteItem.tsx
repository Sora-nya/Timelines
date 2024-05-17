import React, { useState } from 'react';
import styled from 'styled-components';
import editIcon from '../../icons/edit.svg';
import deleteIcon from '../../icons/delete.png'
import { Draggable } from 'react-beautiful-dnd';
import { EditNoteForm } from './NoteForm';

interface NoteItemProps {
  id: string;
  index: number;
  // we need to pass the id and index ONLY to satisfy props for Draggable
  isRight: boolean;
  title: string;
  content: string;
  onDelete: () => void;
  refreshData: () => void;
  timelineId: string;
}



export const NoteItem: React.FC<NoteItemProps> = (props) => {
  const { isRight, title, content, onDelete, id, index, refreshData, timelineId } = props;
  const [isEditMode, setIsEditMode] = useState(false);

  return (isEditMode ? (<EditNoteForm
    refreshNotes={refreshData}
    noteId={id}
    initialValues={{ title, content }}
    onClose={()=>setIsEditMode(false)}
    timelineId={timelineId} />)
    :
    (<Draggable key={id} index={index} draggableId={id}>
      {(provided, snapshot) => (
        <StyledNoteItem isRight={isRight} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
          {/* TODO: if in edit mode, render EditNoteForm */}
          <NoteHeaderIcons
            onEdit={() => setIsEditMode(true)}
            onDelete={onDelete}
            editIcon={editIcon}
            deleteIcon={deleteIcon}
          />
          <Title>{title}</Title>
          <Content>{content}</Content>
        </StyledNoteItem>
      )}
    </Draggable>)
  );
};

interface NoteHeaderIconsProps {
  onEdit: () => void;
  onDelete: () => void;
  editIcon: string; // Path to edit.png icon
  deleteIcon: string; // Path to delete.png icon
}


const NoteHeaderIcons: React.FC<NoteHeaderIconsProps> = ({ onEdit, onDelete, editIcon, deleteIcon }) => {
  return (
    <IconContainer>
      <Icon src={editIcon} alt="Edit Note Button" onClick={onEdit} />
      <Icon src={deleteIcon} alt="Delete Note Button" onClick={onDelete} />
    </IconContainer>
  );
};
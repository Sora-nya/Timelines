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

interface StyledNoteItemProps {
  isRight: boolean;
}

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  display: flex;
  gap: 10px;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
///margin right/left:auto 2. Align-self:flex-start:end
const StyledNoteItem = styled.div<StyledNoteItemProps>`
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

const Title = styled.h2`
  color: ${(props) => props.theme.colors.text};
  font-size: 1.2rem;
  font-weight: bold;
`;

const Content = styled.p`
  color: ${(props) => props.theme.colors.text};
`;

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
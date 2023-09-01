import React from 'react';
import styled from 'styled-components';

interface NoteHeaderIconsProps {
    onEdit: () => void;
    onDelete: () => void;
    editIcon: string; // Path to edit.png icon
    deleteIcon: string; // Path to delete.png icon
}

const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  display: flex;
  gap: 10px;
  opacity: 0; /* Set the initial opacity to make icons invisible */
  transition: opacity 0.3s ease-in-out;
`;

const Icon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 1rem;
  cursor: pointer;
`;

const NoteHeaderIcons: React.FC<NoteHeaderIconsProps> = ({ onEdit, onDelete, editIcon, deleteIcon }) => {
    return (
        <IconContainer>
            <Icon src={editIcon} alt="Edit Note Button" onClick={onEdit} />
            <Icon src={deleteIcon} alt="Delete Note Button" onClick={onDelete} />
        </IconContainer>
    );
};

export default NoteHeaderIcons;
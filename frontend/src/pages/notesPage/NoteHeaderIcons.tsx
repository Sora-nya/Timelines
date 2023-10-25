import React from 'react';
import { HeaderIconContainer, HeaderIcon } from './Notes.style';

interface NoteHeaderIconsProps {
    onEdit: () => void;
    onDelete: () => void;
    editIcon: string; // Path to edit.png icon
    deleteIcon: string; // Path to delete.png icon
}

const NoteHeaderIcons: React.FC<NoteHeaderIconsProps> = ({ onEdit, onDelete, editIcon, deleteIcon }) => {
    return (
        <HeaderIconContainer>
            <HeaderIcon src={editIcon} alt="Edit Note Button" onClick={onEdit} />
            <HeaderIcon src={deleteIcon} alt="Delete Note Button" onClick={onDelete} />
        </HeaderIconContainer>
    );
};

export default NoteHeaderIcons;
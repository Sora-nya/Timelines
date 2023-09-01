import React from 'react';
import styled from 'styled-components';
import editIcon from '../../icons/edit.svg';
import deleteIcon from '../../icons/delete.png'

interface NoteItemProps {
    isRight: boolean;
    title: string;
    content: string;
    onEdit: () => void;
    onDelete: () => void;
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

const NoteItem: React.FC<NoteItemProps> = (props) => {
    const { isRight, title, content, onEdit, onDelete } = props;
    return (
        <StyledNoteItem isRight={isRight}>
            <NoteHeaderIcons
                onEdit={onEdit}
                onDelete={onDelete}
                editIcon={editIcon}
                deleteIcon={deleteIcon}
            />
            <Title>{title}</Title>
            <Content>{content}</Content>
        </StyledNoteItem>
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

export default NoteItem;
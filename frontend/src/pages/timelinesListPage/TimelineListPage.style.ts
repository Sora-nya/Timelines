import styled from "styled-components";

export const ListContainer = styled.div`
background-color: ${p => p.theme.colors.background};
padding: 1rem;
display: flex;
flex-direction: column;
`;

export const TimelineItem = styled.div`
display: flex;
align-items: center;
padding: 0.5rem;
background-color: ${(p) => p.theme.colors.accent};
border-radius: 5px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
margin: 0.5rem 0; 
transition: background-color 0.3s;

&:hover {
    background-color: ${(p) => p.theme.colors.lighterAccent};
  }
`;

export const TimelineTitle = styled.h2`
  color: ${(p) => p.theme.colors.text};
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 1rem;
  text-decoration: none;
`;

export const AddTimelineButton = styled.button`
  background-color: ${(p) => p.theme.colors.callToAction};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${(p) => p.theme.colors.highlight};
  }
`;

export const AddTimelineInput = styled.input`
  background-color: ${(p) => p.theme.colors.background};
  color: ${(p) => p.theme.colors.text};
  padding: 1rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  margin-bottom: 0.5rem;
`;

export const AddTimelineSubmitButton = styled.button`
  background-color: ${(p) => p.theme.colors.callToAction};
  color: white;
  border: none;
  border-radius: 5px;
  padding: 1rem 1.5rem;
  font-size: 1rem; 
  cursor: pointer;
  transition: background-color 0.3s;
  margin: 0.5rem;

  &:hover {
    background-color: ${(p) => p.theme.colors.highlight};
  }
`;
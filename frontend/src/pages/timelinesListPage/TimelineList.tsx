import React, { useEffect, useState } from 'react'
import { Timeline } from '../../types/types'
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListContainer = styled.div`
background-color: ${p => p.theme.colors.background};
padding: 1rem;
display: flex;
flex-direction: column;
`;

const TimelineItem = styled.div`
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

const TimelineTitle = styled.h2`
  color: ${(p) => p.theme.colors.text};
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 1rem;
  text-decoration: none;
`;

const AddTimelineButton = styled.button`
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

const AddTimelineInput = styled.input`
  background-color: ${(p) => p.theme.colors.background};
  color: ${(p) => p.theme.colors.text};
  padding: 1rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  margin-bottom: 0.5rem;
`;

const AddTimelineSubmitButton = styled.button`
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

export const TimelineList = () => {
    const [timeline, setTimeline] = useState<Timeline[]>([])
    const navigate = useNavigate();
    const [showAddTimelineInput, setShowAddTimelineInput] = useState(false);
    const [newTimelineName, setNewTimelineName] = useState('');

    useEffect(() => {
        fetchTimelines();
    }, []);

    const fetchTimelines = async () => {
        try {
            const response = await axios.get('http://localhost:8080/api/timelines');
            setTimeline(response.data);
        } catch (error) {
            console.error('Error fetching timelines:', error);
        }
    };

    const handleTimelineClick = (timelineId: number) => {
        navigate(`/timeline/${timelineId}/notes`);
    };

    const handleAddTimelineClick = () => {
        setShowAddTimelineInput(true);
    };

    const handleNewTimelineNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTimelineName(event.target.value);
    };

    const handleCreateTimeline = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/timelines', {
                title: newTimelineName,
            });
            const newTimeline = response.data;
            setTimeline([...timeline, newTimeline]);
            setShowAddTimelineInput(false);
            setNewTimelineName('');
        } catch (error) {
            console.error('Error creating timeline:', error);
        }
    };

    return (
        <div>
            <h1>TimelineList</h1>
            <ListContainer>
                {timeline.map((timeline) => (
                    <TimelineItem
                        key={timeline.id}
                        onClick={() => handleTimelineClick(timeline.id)}
                    >
                        <TimelineTitle>{timeline.title}</TimelineTitle>
                    </TimelineItem>
                ))}
                {!showAddTimelineInput && (
                    <AddTimelineButton onClick={handleAddTimelineClick}>Add Timeline</AddTimelineButton>
                )}                {showAddTimelineInput && (
                    <div>
                        <AddTimelineInput
                            type="text"
                            placeholder="Enter Timeline Name"
                            value={newTimelineName}
                            onChange={handleNewTimelineNameChange}
                        />
                        <AddTimelineSubmitButton onClick={handleCreateTimeline}>Create</AddTimelineSubmitButton>
                    </div>
                )}
            </ListContainer>
        </div>
    )
}

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

export const TimelineList = () => {
    const [timeline, setTimeline] = useState<Timeline[]>()
    const navigate = useNavigate();

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
    return (
        <div>
            <h1>TimelineList</h1>
            <ListContainer>
                {
                    timeline?.map(timeline => (
                            <TimelineItem key={timeline.id}  onClick={() => handleTimelineClick(timeline.id)}>
                                <TimelineTitle>{timeline.title}</TimelineTitle>
                            </TimelineItem>
                    ))
                }
            </ListContainer>
        </div>
    )
}


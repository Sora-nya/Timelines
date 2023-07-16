import React, { useEffect, useState } from 'react'
import { Timeline } from '../../types/types'
import styled from 'styled-components';
import axios from 'axios';

const ListContainer = styled.div`
background-color: ${(p) => p.theme.colors['background']};
padding: 1rem;
display: flex;
flex-direction: column;
`;

const TimelineItem = styled.div`
display: flex;
align-items: center;
padding: 0.5rem;
background-color: ${(props) => props.theme.colors.accent};
border-radius: 5px;
box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
margin: 0.5rem 0; 
`;

const TimelineTitle = styled.h2`
  color: ${(p) => p.theme.colors['text']};
  font-size: 1.2rem;
  font-weight: bold;
  margin-right: 1rem;
`;

const stubTimelines: Timeline[] = [
    {
        id: 1,
        notes: [],
        title: 'stub'
    },
    {
        id: 2,
        notes: [],
        title: 'aaaa'
    },
    {
        id: 3,
        notes: [],
        title: 'aaaaaaaaaa'
    },
    {
        id: 4,
        notes: [],
        title: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    }
]

export const TimelineList = () => {
    const [timeline, setTimeline] = useState<Timeline[]>(stubTimelines)


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
    // todo: 
    // ostylowanie listy + wydzielenie elementu listy do komponentu własnego - obiekt w liście
    // fetchowanie z backendu rzeczywistych danych,
    // (czy nie daj się ustawić danych w h2 przy starcie aplikacji?) 
    // routing
    // widok pojedyńczego timelinu 
    return (
        <div>
            <h1>TimelineList</h1>
            <ListContainer>
                {
                    timeline.map(timeline => (
                        <TimelineItem>
                            <TimelineTitle>{timeline.title}</TimelineTitle>
                        </TimelineItem>
                    ))
                }
            </ListContainer>
        </div>
    )
}


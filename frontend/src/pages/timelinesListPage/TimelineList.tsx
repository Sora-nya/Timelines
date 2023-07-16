import React, { useState } from 'react'
import { Timeline } from '../../types/types'
import styled from 'styled-components';

const ListContainer = styled.div`
background-color: ${(p) => p.theme.colors.background};
  display: flex;
  flex-direction: column;
`;

const TimelineItem = styled.div`
  background-color: ${p => p.theme.colors['accent']};
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TimelineTitle = styled.h2`
  color: ${(p) => p.theme.colors['text']};
  font-size: 20px;
  margin-bottom: 10px;
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


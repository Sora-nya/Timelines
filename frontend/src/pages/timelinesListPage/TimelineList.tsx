import React, { useEffect, useState } from 'react'
import { Timeline } from '../../types/types'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AddTimelineButton, AddTimelineInput, AddTimelineSubmitButton, ListContainer, TimelineItem, TimelineTitle } from './TimelineListPage.style';

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

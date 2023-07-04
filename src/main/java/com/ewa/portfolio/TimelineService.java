package com.ewa.portfolio;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TimelineService {

    private final TimelineRepository timelineRepository;

    public TimelineService(TimelineRepository timelineRepository) {
        this.timelineRepository = timelineRepository;
    }

    public List<TimelineDTO> getAllTimelines() {
        List<Timeline> timelines =  timelineRepository.findAll();
//        (timeline)->createTimelineDto(timeline) === TimelineService::createTimelineDto
        return timelines.stream()
                .map(TimelineService::createTimelineDto).toList();
    }

    public Optional<TimelineDTO> findTimelineById(Long id) {
        return timelineRepository.findById(id)
                .map(TimelineService::createTimelineDto);
    }

    public TimelineDTO createTimeline(CreateTimelineDTO timelineDTO) {
        Timeline timeline = timelineRepository.save(new Timeline(timelineDTO.title()));
        return createTimelineDto(timeline);
    }

    private static TimelineDTO createTimelineDto(Timeline timeline) {
        return new TimelineDTO(timeline.getId(),
                timeline.getNoteList().stream()
                        .map(NoteService::createNoteDto).toList(),
                timeline.getTitle());
    }
}

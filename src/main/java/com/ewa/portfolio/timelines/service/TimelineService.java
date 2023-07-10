package com.ewa.portfolio.timelines.service;

import com.ewa.portfolio.timelines.dto.CreateTimelineDto;
import com.ewa.portfolio.timelines.entity.Timeline;
import com.ewa.portfolio.timelines.dto.TimelineDto;
import com.ewa.portfolio.timelines.repository.TimelineRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TimelineService {

    private final TimelineRepository timelineRepository;

    public TimelineService(TimelineRepository timelineRepository) {
        this.timelineRepository = timelineRepository;
    }

    public List<TimelineDto> getAllTimelines() {
        List<Timeline> timelines =  timelineRepository.findAll();
//        (timeline)->createTimelineDto(timeline) === TimelineService::createTimelineDto
        return timelines.stream()
                .map(TimelineService::createTimelineDto).toList();
    }

    public Optional<TimelineDto> findTimelineById(Long id) {
        return timelineRepository.findById(id)
                .map(TimelineService::createTimelineDto);
    }

    public TimelineDto createTimeline(CreateTimelineDto timelineDTO) {
        Timeline timeline = timelineRepository.save(new Timeline(timelineDTO.title()));
        return createTimelineDto(timeline);
    }

    private static TimelineDto createTimelineDto(Timeline timeline) {
        return new TimelineDto(timeline.getId(),
                timeline.getNoteList().stream()
                        .map(NoteService::createNoteDto).toList(),
                timeline.getTitle());
    }
}

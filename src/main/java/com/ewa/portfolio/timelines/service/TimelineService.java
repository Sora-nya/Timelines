package com.ewa.portfolio.timelines.service;

import com.ewa.portfolio.timelines.dto.CreateNoteDto;
import com.ewa.portfolio.timelines.dto.CreateTimelineDto;
import com.ewa.portfolio.timelines.dto.TimelineDto;
import com.ewa.portfolio.timelines.entity.Note;
import com.ewa.portfolio.timelines.entity.Timeline;
import com.ewa.portfolio.timelines.repository.TimelineRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TimelineService {

    private final TimelineRepository timelineRepository;

    private static final BigDecimal MAX_POSITION = BigDecimal.valueOf(100.0);
    private static final BigDecimal MIN_POSITION = BigDecimal.valueOf(0.0);

    public TimelineService(TimelineRepository timelineRepository) {
        this.timelineRepository = timelineRepository;
    }

    @Transactional(readOnly = true)
    public List<TimelineDto> getAllTimelines() {
        List<Timeline> timelines = timelineRepository.findAll();
//        (timeline)->createTimelineDto(timeline) === TimelineService::createTimelineDto
        return timelines.stream()
                .map(TimelineService::createTimelineDto).toList();
    }

    @Transactional(readOnly = true)
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

    @Transactional
    public TimelineDto createNote(Long id, CreateNoteDto noteDto) {
        Timeline timeline = timelineRepository.findById(id).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Timeline Not Found"));
        BigDecimal position = MIN_POSITION.add(MAX_POSITION).divide(new BigDecimal("2"));
        // ogarnięcie jaki case - poczatek, koniec, pomiędzy
        if (noteDto.priorId() == null && noteDto.posteriorId() == null) {
            position = MIN_POSITION.add(MAX_POSITION).divide(new BigDecimal("2"));
        }
        if (noteDto.priorId() == null && noteDto.posteriorId() != null) {
            position = MIN_POSITION.add(timeline.getNoteList().get(0).getPosition()).divide(new BigDecimal("2"));
        }
        if (noteDto.priorId() != null && noteDto.posteriorId() == null) {
            position = timeline.getNoteList().get(timeline.getNoteList().size() - 1).getPosition().add(MAX_POSITION).divide(new BigDecimal("2"));
        }
        if (noteDto.priorId() != null && noteDto.posteriorId() != null) {
            //todo sanitize inputs - sprawdzić czy są valid wartości idików posterior i prior
            List<Note> notes = timeline.getNoteList().stream().filter(note -> note.getId().equals(noteDto.priorId()) || note.getId().equals(noteDto.posteriorId())).toList();
            position = notes.get(0).getPosition().add(notes.get(1).getPosition()).divide(new BigDecimal("2"));
        }
        Note newNote = new Note(noteDto.content(), noteDto.title(), timeline, position);

        timeline.add(newNote);
        timelineRepository.save(timeline);
        return createTimelineDto(timeline);
    }

    public void deleteTimeline(Long id) {
        timelineRepository.deleteById(id);
    }
}

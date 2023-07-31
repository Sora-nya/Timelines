package com.ewa.portfolio.timelines.service;

import com.ewa.portfolio.timelines.dto.*;
import com.ewa.portfolio.timelines.entity.Note;
import com.ewa.portfolio.timelines.entity.Timeline;
import com.ewa.portfolio.timelines.repository.NoteRepository;
import com.ewa.portfolio.timelines.repository.TimelineRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;
import java.util.Optional;

@Service
public class TimelineService {

    private final TimelineRepository timelineRepository;

    private final NoteRepository noteRepository;

    private static final BigDecimal MAX_POSITION = BigDecimal.valueOf(100.0);
    private static final BigDecimal MIN_POSITION = BigDecimal.valueOf(0.0);
    private static final BigDecimal TWO = new BigDecimal("2");


    public TimelineService(TimelineRepository timelineRepository, NoteRepository noteRepository) {
        this.timelineRepository = timelineRepository;
        this.noteRepository = noteRepository;
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
        Timeline timeline = getTimelineThrowIsNotFound(id);
        //validate CreateNoteDto ids

        BigDecimal position = calculatePosition(noteDto.priorId(), noteDto.posteriorId(), timeline);
        Note newNote = new Note(noteDto.content(), noteDto.title(), timeline, position);
        timeline.add(newNote);
        timelineRepository.save(timeline);
        return createTimelineDto(timeline);
    }


    // TODO w wolnym czasie -> przenieść to do TimelineRepository
    //      default interface method
    private Timeline getTimelineThrowIsNotFound(Long id) {
        return timelineRepository.findById(id).orElseThrow(() -> new ResponseStatusException(
                HttpStatus.NOT_FOUND, "Timeline Not Found"));
    }

    private BigDecimal calculatePosition(Long priorId, Long posteriorId, Timeline timeline) {
        BigDecimal priorPosition = getNotePositionOr(priorId, timeline, MIN_POSITION);
        BigDecimal posteriorPosition = getNotePositionOr(posteriorId, timeline, MAX_POSITION);
        if (priorPosition.compareTo(posteriorPosition)>=0)
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Prior note should be before posterior");

        return priorPosition.add(posteriorPosition).divide(TWO, RoundingMode.UNNECESSARY);
    }

    private BigDecimal getNotePositionOr(Long noteId, Timeline timeline, BigDecimal defaultPosition) {
        return noteId == null ? defaultPosition : timeline.findNoteById(noteId).getPosition();
    }

    public void deleteTimeline(Long id) {
        timelineRepository.deleteById(id);
    }

    @Transactional
    public void updateNote(UpdateNoteDto updateNoteDto, long timelineId) {
        Note note = noteRepository.findById(updateNoteDto.id()).orElseThrow();
        note.setTitle(updateNoteDto.title());
        note.setContent(updateNoteDto.content());
        // bez @Transactional - trzeba zapisać, bo zmienna note nie ma aktywnej sesji
        // z @transactional - zmienna note ma aktywną sesje i wszystkie zmiany do niej spropagują się do bazy
        // noteRepository.save(note);
    }

    @Transactional
    public void reorderNote(ReorderNoteDto reorderNoteDto, Long timelineId) {
        Timeline timeline = getTimelineThrowIsNotFound(timelineId);
        BigDecimal newPosition = calculatePosition(reorderNoteDto.priorId(), reorderNoteDto.posteriorId(), timeline);
        Note note = noteRepository.findById(reorderNoteDto.id()).orElseThrow();
        note.setPosition(newPosition);
    }
}

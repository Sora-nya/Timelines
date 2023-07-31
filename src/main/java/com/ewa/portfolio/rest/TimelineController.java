package com.ewa.portfolio.rest;

import com.ewa.portfolio.timelines.dto.*;
import com.ewa.portfolio.timelines.service.TimelineService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/timelines")
public class TimelineController {
    private final TimelineService timelineService;


    public TimelineController(TimelineService timelineService) {
        this.timelineService = timelineService;
    }

    @GetMapping
    public ResponseEntity<List<TimelineDto>> getAllTimelines() {
        List<TimelineDto> timelines = timelineService.getAllTimelines();
        return ResponseEntity.ok(timelines);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TimelineDto> getTimelineById(@PathVariable Long id) {
        Optional<TimelineDto> note = timelineService.findTimelineById(id);
        return ResponseEntity.of(note);
    }

    @PostMapping
    public ResponseEntity<TimelineDto> createTimeline(@RequestBody CreateTimelineDto TimelineDTO) {
        TimelineDto timelineDTO = timelineService.createTimeline(TimelineDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(timelineDTO);
    }

    @PostMapping("/{id}/notes")
    public ResponseEntity<TimelineDto> createNote(@PathVariable Long id, @RequestBody CreateNoteDto noteDto) {
        TimelineDto timelineDto = timelineService.createNote(id, noteDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(timelineDto);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable Long id) {
        timelineService.deleteTimeline(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    //todo updateNote
    @PutMapping("/{timelineId}/notes/{noteId}")
    public ResponseEntity<NoteDto> updateNote(@PathVariable Long timelineId, @PathVariable Long noteId) {
        timelineService.updateNote();

        //todo change na wartość NoteDto
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{timelineId}/notes/{noteId}/reorder")
    public ResponseEntity<NoteDto> reorderNote(@PathVariable Long timelineId,
                                               @PathVariable Long noteId,
                                               @RequestBody ReorderNoteDto reorderNoteDto) {

        timelineService.reorderNote(reorderNoteDto, timelineId);
        //todo change na wartość NoteDto
        return ResponseEntity.noContent().build();
    }

}

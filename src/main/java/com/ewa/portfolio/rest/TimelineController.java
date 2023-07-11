package com.ewa.portfolio.rest;

import com.ewa.portfolio.timelines.dto.CreateNoteDto;
import com.ewa.portfolio.timelines.dto.CreateTimelineDto;
import com.ewa.portfolio.timelines.dto.NoteDto;
import com.ewa.portfolio.timelines.dto.TimelineDto;
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
    public ResponseEntity<TimelineDto> getAllTimelinesById(@PathVariable Long id) {
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

}

package com.ewa.portfolio;

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
    public ResponseEntity<List<TimelineDTO>> getAllTimelines() {
        List<TimelineDTO> timelines = timelineService.getAllTimelines();
        return ResponseEntity.ok(timelines);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TimelineDTO> getAllTimelinesById(@PathVariable Long id) {
        Optional<TimelineDTO> note = timelineService.findTimelineById(id);
        return ResponseEntity.of(note);
    }

    @PostMapping
    public ResponseEntity<TimelineDTO> createTimeline(@RequestBody CreateTimelineDTO TimelineDTO) {
        TimelineDTO timelineDTO = timelineService.createTimeline(TimelineDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(timelineDTO);
    }

    //todo @PostMapping("/{id}/notes")

}

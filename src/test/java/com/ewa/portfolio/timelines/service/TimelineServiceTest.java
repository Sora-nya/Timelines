package com.ewa.portfolio.timelines.service;

import com.ewa.portfolio.timelines.dto.CreateNoteDto;
import com.ewa.portfolio.timelines.dto.CreateTimelineDto;
import com.ewa.portfolio.timelines.dto.TimelineDto;
import com.ewa.portfolio.timelines.repository.NoteRepository;
import com.ewa.portfolio.timelines.repository.TimelineRepository;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
class TimelineServiceTest {

    @Autowired
    TimelineService timelineService;
    @Autowired
    TimelineRepository timelineRepository;
    @Autowired
    NoteRepository noteRepository;

    @BeforeEach
    void setUp() {
    }

    @AfterEach
    void tearDown() {
        timelineRepository.deleteAll();
        noteRepository.deleteAll();
    }

    @Test
    void can_insert_note_to_empty_timeline() {
        // given
        TimelineDto timelineDto = timelineService.createTimeline(new CreateTimelineDto("First"));

        // when
        timelineService.createNote(timelineDto.id(), new CreateNoteDto("a", "aaa", null, null));

        //then
        var timelines = timelineService.findTimelineById(timelineDto.id());
        assertThat(timelines.get().notes()).hasSize(1);
    }

    @Test
    void can_insert_before_first() {
        // given
        TimelineDto timelineDto = timelineService.createTimeline(new CreateTimelineDto("First"));
        TimelineDto updatedTimelineDto = timelineService.createNote(timelineDto.id(), new CreateNoteDto("a", "aaa", null, null));

        // when
        timelineService.createNote(timelineDto.id(), new CreateNoteDto("b", "bbb", null, updatedTimelineDto.notes().get(0).id()));

        //then
        var timelines = timelineService.findTimelineById(updatedTimelineDto.id());
        assertThat(timelines.get().notes()).satisfies(noteList -> {
            assertThat(noteList.get(0)).satisfies(note ->
                    assertThat(note.title()).isEqualTo("bbb")
            );
            assertThat(noteList.get(1)).satisfies(note ->
                    assertThat(note.title()).isEqualTo("aaa")
            );
        });
    }

    @Test
    void can_insert_after_last() {
        // given
        TimelineDto timelineDto = timelineService.createTimeline(new CreateTimelineDto("First"));
        TimelineDto updatedTimelineDto = timelineService.createNote(timelineDto.id(), new CreateNoteDto("a", "aaa", null, null));

        // when
        timelineService.createNote(timelineDto.id(), new CreateNoteDto("b", "bbb",  updatedTimelineDto.notes().get(0).id(),null));

        //then
        var timelines = timelineService.findTimelineById(updatedTimelineDto.id());
        assertThat(timelines.get().notes()).satisfies(noteList -> {
            assertThat(noteList.get(0)).satisfies(note ->
                    assertThat(note.title()).isEqualTo("aaa")
            );
            assertThat(noteList.get(1)).satisfies(note ->
                    assertThat(note.title()).isEqualTo("bbb")
            );
        });
    }

}
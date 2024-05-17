package com.ewa.portfolio.timelines.service;

import com.ewa.portfolio.timelines.dto.CreateNoteDto;
import com.ewa.portfolio.timelines.dto.TimelineDto;
import com.ewa.portfolio.timelines.entity.Note;
import com.ewa.portfolio.timelines.entity.Timeline;
import com.ewa.portfolio.timelines.repository.NoteRepository;
import com.ewa.portfolio.timelines.repository.TimelineRepository;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.when;

public class MockTimelineServiceTest {
//unit testy z punktu widzenia testowania na be
    TimelineService timelineService;
    TimelineRepository timelineRepositoryMock = mock(TimelineRepository.class);
    NoteRepository noteRepositoryMock = mock(NoteRepository.class);

    public MockTimelineServiceTest() {
        timelineService = new TimelineService(timelineRepositoryMock, noteRepositoryMock);
    }

    @Test
    void can_calculate_position() {
        // Given
        long timelineId = 1L;
        long posteriorId = 1L;

        Timeline timeline = new Timeline("Timeline");
        timeline.setId(timelineId);

        Note firstNote = new Note("ABC", "ABC", timeline, new BigDecimal("6.25"));
        firstNote.setId(posteriorId);
        timeline.add(firstNote);
        when(timelineRepositoryMock.findById(timelineId)).thenReturn(Optional.of(timeline));

        when(timelineRepositoryMock.save(timeline)).thenAnswer(invocation -> {
            timeline.getNoteList()
                    .forEach(node -> {
                        if (node.getId() == null) {
                            node.setId(2L);
                        }
                    });
            return timeline;
        });
        // When
        TimelineDto newNote = timelineService.createNote(timelineId, new CreateNoteDto("b", "bbb", null, posteriorId));

        // Then
        assertThat(timeline.getNoteList().get(1)).satisfies(n -> {
            assertThat(n.getPosition()).isEqualTo(new BigDecimal("3.125"));
            assertThat(n.getTitle()).isEqualTo("bbb");
            assertThat(n.getContent()).isEqualTo("b");
        });

    }

}


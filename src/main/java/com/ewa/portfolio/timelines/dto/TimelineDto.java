package com.ewa.portfolio.timelines.dto;

import java.util.List;

public record TimelineDto(long id, List<NoteDto> notes, String title, boolean archived) {
}

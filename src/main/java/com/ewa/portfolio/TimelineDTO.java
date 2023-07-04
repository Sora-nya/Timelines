package com.ewa.portfolio;

import java.util.List;

public record TimelineDTO(long id, List<NoteDTO> notes, String title) {
}

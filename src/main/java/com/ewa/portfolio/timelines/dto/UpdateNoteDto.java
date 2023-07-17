package com.ewa.portfolio.timelines.dto;

import jakarta.annotation.Nullable;

public record UpdateNoteDto(long id, String content, String title, @Nullable Long priorId, @Nullable Long posteriorId) {
}

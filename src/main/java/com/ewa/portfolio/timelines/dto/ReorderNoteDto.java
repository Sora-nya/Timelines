package com.ewa.portfolio.timelines.dto;

import jakarta.annotation.Nullable;

public record ReorderNoteDto(long id, @Nullable Long priorId, @Nullable Long posteriorId) {
}

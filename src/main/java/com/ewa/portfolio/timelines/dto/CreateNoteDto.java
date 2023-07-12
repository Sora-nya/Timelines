package com.ewa.portfolio.timelines.dto;

public record CreateNoteDto(String content, String title, Long priorId, Long posteriorId) {
}

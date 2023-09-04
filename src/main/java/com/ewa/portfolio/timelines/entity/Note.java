package com.ewa.portfolio.timelines.entity;

import com.ewa.portfolio.timelines.dto.NoteDto;
import jakarta.persistence.*;

import java.math.BigDecimal;

@Entity
@Table(name="notes")
public class Note {
    @Id
    @GeneratedValue
    private Long id;

    @Lob
    private String content;
    private String title;
    @ManyToOne
    private Timeline timeline;

    private BigDecimal position;

    public Note(String content, String title, Timeline timeline, BigDecimal position) {
        this.content = content;
        this.title = title;
        this.timeline = timeline;
        this.position = position;
    }

    public Note() {
    }

    public Long getId() {
        return id;
    }

    //public for test access
    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setTimeline(Timeline timeline) {
        this.timeline = timeline;
    }

    public BigDecimal getPosition() {
        return position;
    }

    public void setPosition(BigDecimal position) {
        this.position = position;
    }



    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Note note = (Note) o;

        return id.equals(note.id);
    }

    @Override
    public int hashCode() {
        return id.hashCode();
    }

    public NoteDto createNoteDto() {
        return new NoteDto(getId(), getContent(), getTitle());
    }

}

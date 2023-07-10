package com.ewa.portfolio.timelines.entity;

import jakarta.persistence.*;

@Entity
@Table(name="notes")
public class Note {
    @Id
    @GeneratedValue
    private Long id;
    private String content;
    private String title;
    @ManyToOne
    private Timeline timeline;

    public Note(String content, String title, Timeline timeline) {
        this.content = content;
        this.title = title;
        this.timeline = timeline;
    }

    public Note(String content, String title) {
        this.content = content;
        this.title = title;
    }

    public Note() {
    }

    public Long getId() {
        return id;
    }

    private void setId(Long id) {
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
}

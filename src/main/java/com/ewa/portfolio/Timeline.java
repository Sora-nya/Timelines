package com.ewa.portfolio;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "timelines")
public class Timeline {

    @Id
    @GeneratedValue
    private Long id;
    @OneToMany //todo
    @OrderColumn
    private List<Note> noteList = new ArrayList<>();
    private String title;


    public Timeline(String title) {
        this.title = title;
    }

    public Timeline() {
    }

    public Long getId() {
        return id;
    }

    private void setId(Long id) {
        this.id = id;
    }

    public List<Note> getNoteList() {
        return noteList;
    }

    public void setNoteList(List<Note> noteList) {
        this.noteList = noteList;
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

        Timeline timeline = (Timeline) o;

        return Objects.equals(id, timeline.id);
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}

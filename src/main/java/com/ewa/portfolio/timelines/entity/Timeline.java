package com.ewa.portfolio.timelines.entity;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Objects;

@Entity
@Table(name = "timelines")
public class Timeline {

    @Id
    @GeneratedValue
    private Long id;
    @OneToMany(mappedBy = "timeline", cascade = CascadeType.ALL, orphanRemoval = true)
    @OrderBy("position")
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

    public void setId(Long id) {
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

    public void add(Note newNote) {
        noteList.add(newNote);
    }

    public Note findNoteById(Long noteId) {

        return noteList.stream()
                .filter(note -> note.getId().equals(noteId))
                .findFirst()
                .orElseThrow(()-> new NoSuchElementException("Note of id " + noteId + " not found"));
    }
}

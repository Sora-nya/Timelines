package com.ewa.portfolio.timelines.service;

import com.ewa.portfolio.timelines.dto.NoteDto;
import com.ewa.portfolio.timelines.entity.Note;
import com.ewa.portfolio.timelines.repository.NoteRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteService {

    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public Optional<NoteDto> findNoteById(Long id) {
        return noteRepository.findById(id)
                .map(Note::createNoteDto);
    }

    public List<NoteDto> getAllNotes() {
        List<Note> notes = noteRepository.findAll();

        return notes.stream()
                .map(Note::createNoteDto)
                .toList();
    }

    public NoteDto updateNote(Long id, NoteDto noteDTO) {
        Note note = noteRepository.findById(id).orElseThrow();
        note.setContent(noteDTO.content());
        note.setTitle(noteDTO.title());
        Note updatedNote = noteRepository.save(note);
        return updatedNote.createNoteDto();
    }

    public void deleteNote(Long id) {
        noteRepository.deleteById(id);
    }


}

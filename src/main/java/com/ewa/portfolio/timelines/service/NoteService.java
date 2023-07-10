package com.ewa.portfolio.timelines.service;

import com.ewa.portfolio.timelines.dto.CreateNoteDto;
import com.ewa.portfolio.timelines.entity.Note;
import com.ewa.portfolio.timelines.dto.NoteDto;
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
                .map(NoteService::createNoteDto);
    }

    public List<NoteDto> getAllNotes() {
        List<Note> notes =  noteRepository.findAll();

        return notes.stream()
                .map(NoteService::createNoteDto)
                .toList();
    }

    public NoteDto createNote(CreateNoteDto noteDTO) {
        Note note = noteRepository.save(new Note(noteDTO.content(), noteDTO.title()));
        return createNoteDto(note);
    }

    public NoteDto updateNote(Long id, NoteDto noteDTO) {
        //sprawdzić czy istnieje takie ID i wtedy zrobić save
        Note note = noteRepository.findById(id).orElseThrow(); //throws NoSuchElementException
        note.setContent(noteDTO.content());
        note.setTitle(noteDTO.title());
        Note updatedNote = noteRepository.save(note);
        return createNoteDto(updatedNote);
    }

    public static NoteDto createNoteDto(Note note) {
        return new NoteDto(note.getId(), note.getContent(), note.getTitle());
    }


}

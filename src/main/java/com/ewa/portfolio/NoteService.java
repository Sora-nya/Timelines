package com.ewa.portfolio;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NoteService {

    private final NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public Optional<NoteDTO> findNoteById(Long id) {
        return noteRepository.findById(id)
                .map(NoteService::createNoteDto);
    }

    public List<NoteDTO> getAllNotes() {
        List<Note> notes =  noteRepository.findAll();

        return notes.stream()
                .map(NoteService::createNoteDto)
                .toList();
    }

    public NoteDTO createNote(CreateNoteDto noteDTO) {
        Note note = noteRepository.save(new Note(noteDTO.content(), noteDTO.title()));
        return createNoteDto(note);
    }

    public NoteDTO updateNote(Long id, NoteDTO noteDTO) {
        //sprawdzić czy istnieje takie ID i wtedy zrobić save
        Note note = noteRepository.findById(id).orElseThrow(); //throws NoSuchElementException
        note.setContent(noteDTO.content());
        note.setTitle(noteDTO.title());
        Note updatedNote = noteRepository.save(note);
        return createNoteDto(updatedNote);
    }

    public static NoteDTO createNoteDto(Note note) {
        return new NoteDTO(note.getId(), note.getContent(), note.getTitle());
    }


}

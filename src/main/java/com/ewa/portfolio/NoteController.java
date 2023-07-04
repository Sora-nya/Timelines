package com.ewa.portfolio;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/notes")
public class NoteController {
    private final NoteService noteService;

    public NoteController(NoteService noteService) {
        this.noteService = noteService;
    }

    @GetMapping
    public ResponseEntity<List<NoteDTO>> getAllNotes() {
        List<NoteDTO> notes = noteService.getAllNotes();
        return ResponseEntity.ok(notes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<NoteDTO> getNoteById(@PathVariable Long id) {
        Optional<NoteDTO> note = noteService.findNoteById(id);
        return ResponseEntity.of(note);
    }

    @Deprecated
    @PostMapping
    public ResponseEntity<NoteDTO> createNote(@RequestBody CreateNoteDto noteDTO) {
        NoteDTO createdNote = noteService.createNote(noteDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdNote);
    }

    @PutMapping("/{id}")
    public ResponseEntity<NoteDTO> updateNote(@PathVariable Long id, @RequestBody NoteDTO noteDTO) {
        NoteDTO updatedNote = noteService.updateNote(id, noteDTO);
        return ResponseEntity.ok(updatedNote);
    }
}

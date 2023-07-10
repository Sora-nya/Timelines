package com.ewa.portfolio.timelines.repository;

import com.ewa.portfolio.timelines.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NoteRepository extends JpaRepository<Note,Long> {
}

package com.ewa.portfolio.timelines.repository;

import com.ewa.portfolio.timelines.entity.Timeline;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TimelineRepository extends JpaRepository<Timeline,Long> {
}

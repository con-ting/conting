package com.c209.batchservice.domain.catalog.repository;

import com.c209.batchservice.domain.catalog.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
}

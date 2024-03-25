package com.c209.catalog.domain.schedule.repository;

import com.c209.catalog.domain.schedule.dto.info.ScheduleInfo;
import com.c209.catalog.domain.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    @Query("SELECT new com.c209.catalog.domain.schedule.dto.info.ScheduleInfo (" +
            "p.id, s.id, s.startTime ) " +
            "FROM Schedule s " +
            "JOIN s.performance p " +
            "WHERE p.id =:showId")
    Optional<List<ScheduleInfo>> getSchedulesByShowId(@Param("showId")Long showId);
}

package com.c209.catalog.domain.schedule.repository;

import com.c209.catalog.domain.performance.entity.Performance;
import com.c209.catalog.domain.schedule.dto.info.ScheduleInfo;
import com.c209.catalog.domain.schedule.entity.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScheduleRepository extends JpaRepository<Schedule, Long> {
    @Query("SELECT new com.c209.catalog.domain.schedule.dto.info.ScheduleInfo (" +
            "p.id, s.id, s.startTime ) " +
            "FROM Schedule s " +
            "JOIN s.performance p " +
            "WHERE p.id =:showId")
    Optional<List<ScheduleInfo>> getSchedulesByShowId(@Param("showId")Long showId);

    void deleteByPerformance(Performance performance);
}

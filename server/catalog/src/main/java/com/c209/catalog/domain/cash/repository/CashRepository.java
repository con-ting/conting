package com.c209.catalog.domain.cash.repository;

import com.c209.catalog.domain.cash.dto.info.HallInfo;
import com.c209.catalog.domain.cash.dto.info.PerformanceInfo;
import com.c209.catalog.domain.cash.dto.info.ScheduleInfo;
import com.c209.catalog.domain.hall.entity.Hall;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CashRepository extends JpaRepository<Hall, Long> {
    @Query("select new com.c209.catalog.domain.cash.dto.info.HallInfo( " +
            "h.id, h.name, h.address " +
            ") FROM Hall h")
    Optional<List<HallInfo>> getHallInfo();

    @Query("select new com.c209.catalog.domain.cash.dto.info.PerformanceInfo( " +
            "p.id, p.title, p.posterImage, p.descriptionImage, p.hall.id, p.reservationStartDatetime, p.reservationEndDatetime, p.startDate, p.endDate " +
            ") FROM Performance p")
    Optional<List<PerformanceInfo>> getPerformanceInfo();

    @Query("select new com.c209.catalog.domain.cash.dto.info.ScheduleInfo( " +
            "s.id, s.performance.id, s.startTime, s.endTime " +
            ") FROM Schedule s")
    Optional<List<ScheduleInfo>> getScheduleInfo();
}

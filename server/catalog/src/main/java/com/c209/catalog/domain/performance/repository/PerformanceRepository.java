package com.c209.catalog.domain.performance.repository;

import com.c209.catalog.domain.performance.dto.info.PerformanceDetailInfo;
import com.c209.catalog.domain.performance.entity.Performance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PerformanceRepository extends JpaRepository<Performance, Long> {
//    @Query("SELECT new com.c209.catalog.domain.performance.dto.info.PerformanceDetailInfo(" +
//            "p.showId, p.showTitle, p.showDescription, p.showPoster, p.showDescriptionImage, " +
//            "p.showReservationType, p.showTicketOpenDate, p.showTicketCloseDate, " +
//            "p.showStartDate, p.showEndDate, " +
//            "g.gradeId, g.gradeGrade, g.gradePrice, " +
//            "s.scheduleId, s.scheduleStartDateTime, s.scheduleEndDateTime, " +
//            "h.hallId, h.hallName, h.hallAddress, h.hallSeatTotal, h.hallX, h.hallY, " +
//            "si.singerId, si.singerName, si.singerProfile, " +
//            "c.companyId, c.companyName, c.companyCall) " +
//            "FROM Performance p " +
//            "JOIN p.grade g " +
//            "JOIN p.schedule s " +
//            "JOIN p.hall h " +
//            "JOIN p.singer si " +
//            "JOIN p.company c " +
//            "WHERE p.showId = :showId")
//    Optional<List<PerformanceDetailInfo>> getPerformanceByShowId(@Param("showId") Long showId);
}

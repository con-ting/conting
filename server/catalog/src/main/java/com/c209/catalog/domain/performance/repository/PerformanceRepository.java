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
    @Query("SELECT new com.c209.catalog.domain.performance.dto.info.PerformanceDetailInfo( " +
            "p.id, p.title, p.description, p.posterImage, p.descriptionImage, " +
            "p.reservationType, p.reservationStartDatetime, p.reservationEndDatetime, " +
            "p.startDate, p.endDate, " +
            "g.id, g.grade, g.price, " +
            "s.id, s.startTime, s.endTime, " +
            "h.id, h.name, h.address, h.total_seat_count, h.latitude, h.longitude, " +
            "si.id, si.name, si.image, " +
            "c.id, c.companyName, c.companyCall) " +
            "FROM Performance p " +
            "JOIN p.hall h " +
            "JOIN p.singer si " +
            "JOIN p.company c " +
            "RIGHT JOIN Schedule s ON s.performance.id = p.id " +
            "RIGHT JOIN Grade g ON g.performance.id = p.id " +
            "WHERE p.id = :showId")
    Optional<List<PerformanceDetailInfo>> getPerformanceByShowId(@Param("showId") Long showId);

    Optional<Performance> findByTitle(String title);
}

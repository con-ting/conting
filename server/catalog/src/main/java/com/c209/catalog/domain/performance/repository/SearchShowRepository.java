package com.c209.catalog.domain.performance.repository;

import com.c209.catalog.domain.performance.dto.PerformanceSearchDto;
import com.c209.catalog.domain.performance.entity.Performance;
import com.c209.catalog.domain.performance.enums.ReservationType;
import com.c209.catalog.domain.performance.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SearchShowRepository extends JpaRepository<Performance, Long> {
    @Query("SELECT new com.c209.catalog.domain.performance.dto.PerformanceSearchDto( " +
            "p.id, " +
            "p.posterImage, " +
            "p.title, " +
            "h.id, " +
            "h.name, " +
            "h.address, "+
            "p.reservationType, " +
            "p.status, " +
            "p.reservationStartDatetime, " +
            "p.reservationEndDatetime, " +
            "p.startDate, " +
            "p.endDate," +
            "s.name ) " +
            "FROM Performance p " +
            "JOIN p.hall h " +
            "JOIN p.singer s "
    )
    Optional<List<PerformanceSearchDto>> searchShowsByDetails(
            @Param("status") Status status,
            @Param("region") String region,
            @Param("sort") String sort,
            @Param("keyword") String keyword,
            @Param("searchType") String searchType,
            @Param("reservationType") ReservationType reservationType
    );
}

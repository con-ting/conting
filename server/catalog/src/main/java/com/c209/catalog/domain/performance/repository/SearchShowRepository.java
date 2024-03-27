package com.c209.catalog.domain.performance.repository;

import com.c209.catalog.domain.performance.dto.PerformanceSearchDto;
import com.c209.catalog.domain.performance.entity.Performance;
import com.c209.catalog.domain.performance.enums.ReservationType;
import com.c209.catalog.domain.performance.enums.Status;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

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
//            "WHERE (:status IS NULL OR p.status = :status) " +
//            "AND (:region IS NULL OR h.name = :region) " +
//            "AND (:sort IS NULL OR :sort = '예매일순' OR :sort = '이름순' OR :sort = '공연일순') " +
//            "AND (:keyword IS NULL OR p.title LIKE %:keyword%) " +
//            "AND (:searchType IS NULL OR " +
//            "(:searchType = '가수' AND s.name LIKE %:keyword%) OR " +
//            "(:searchType = '공연장' AND h.name LIKE %:keyword%) OR " +
//            "(:searchType = '공연명' AND p.title LIKE %:keyword%)) " +
//            "AND (:reservationType IS NULL OR " +
//            "(:reservationType = 'R' AND p.reservationType = 'RANDOM') OR " +
//            "(:reservationType = 'F' AND p.reservationType = 'FIRST_COME_FIRST_SERVED')) " +
//            "ORDER BY " +
//            "CASE " +
//            "WHEN :sort = '예매일순' THEN p.reservationStartDatetime " +
//            "WHEN :sort = '이름순' THEN p.title " +
//            "WHEN :sort = '공연일순' THEN p.startDate " +
//            "END"
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

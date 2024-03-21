package com.c209.catalog.domain.performance.repository;

import com.c209.catalog.domain.performance.dto.info.MainPageInfo;
import com.c209.catalog.domain.performance.dto.info.PerformanceDetailInfo;
import com.c209.catalog.domain.performance.entity.Performance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MainPageRepository extends JpaRepository<Performance, Long> {
    @Query("SELECT new com.c209.catalog.domain.performance.dto.info.MainPageInfo( " +
            "p.id, p.posterImage, p.title, p.hall, p.reservationType, p.reservationStartDatetime, p.reservationEndDatetime, p.startDate, p.endDate " +
            "s.id, s.name, s.image) " +
            "FROM Performance p " +
            ", Singer s ")
    Optional<List<MainPageInfo>> getMainPage();
}

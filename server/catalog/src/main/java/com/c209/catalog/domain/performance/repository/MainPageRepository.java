package com.c209.catalog.domain.performance.repository;

import com.c209.catalog.domain.performance.dto.info.MainPageInfo;
import com.c209.catalog.domain.performance.entity.Performance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MainPageRepository extends JpaRepository<Performance, Long> {
//    @Query("SELECT new com.c209.catalog.domain.performance.dto.info.MainPageInfo( " +
//            "p.id, p.posterImage, p.title, p.hall, p.reservationType, p.reservationStartDatetime, p.reservationEndDatetime, p.startDate, p.endDate, p.viewCount, " +
//            "p.id, p.posterImage, p.title, p.hall, p.reservationType, p.reservationStartDatetime, p.reservationEndDatetime, p.startDate, p.endDate, " +
//            "p.id, p.posterImage, p.title, p.hall, p.reservationType, p.reservationStartDatetime, p.reservationEndDatetime, p.startDate, p.endDate, " +
//            "s.id, s.name, s.image, s.view) FROM Performance p, Singer s")
//    Optional<List<MainPageInfo>> getMainPageList();

//    @Query("SELECT new com.c209.catalog.domain.performance.dto.PShowsDto( " +
//            "p.id, p.posterImage, p.title, p.hall, p.reservationType, p.reservationStartDatetime, p.reservationEndDatetime, p.startDate, p.endDate, p.viewCount, " +
//            ") FROM Performance p")
//    Optional<List<> getPShowsList()>;
}

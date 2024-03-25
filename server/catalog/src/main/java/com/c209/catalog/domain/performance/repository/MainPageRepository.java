package com.c209.catalog.domain.performance.repository;

import com.c209.catalog.domain.performance.dto.info.FShowInfo;
import com.c209.catalog.domain.performance.dto.info.PShowInfo;
import com.c209.catalog.domain.performance.dto.info.PSingerInfo;
import com.c209.catalog.domain.performance.dto.info.RShowInfo;
import com.c209.catalog.domain.performance.entity.Performance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MainPageRepository extends JpaRepository<Performance, Long> {
    @Query("SELECT new com.c209.catalog.domain.performance.dto.info.PShowInfo( " +
            "p.id, p.posterImage, p.title, p.hall.id, p.hall.name, p.reservationType, p.reservationStartDatetime, p.reservationEndDatetime, p.startDate, p.endDate, p.view) " +
            "FROM Performance p WHERE p.endDate > NOW() ORDER BY p.view DESC LIMIT 10")
    Optional<List<PShowInfo>> getPShowsList();

    @Query("SELECT new com.c209.catalog.domain.performance.dto.info.FShowInfo( " +
            "p.id, p.posterImage, p.title, p.hall.id, p.hall.name, p.reservationType, p.reservationStartDatetime, p.reservationEndDatetime, p.startDate, p.endDate " +
            ") FROM Performance p WHERE p.reservationEndDatetime > NOW() AND p.reservationType = 'F' ORDER BY p.reservationStartDatetime ASC LIMIT 10")
    Optional<List<FShowInfo>> getFShowsList();


    @Query("SELECT new com.c209.catalog.domain.performance.dto.info.RShowInfo( " +
            "p.id, p.posterImage, p.title, p.hall.id, p.hall.name, p.reservationType, p.reservationStartDatetime, p.reservationEndDatetime, p.startDate, p.endDate " +
            ") FROM Performance p WHERE p.reservationEndDatetime > NOW() AND p.reservationType = 'R' ORDER BY p.reservationEndDatetime ASC LIMIT 10")
    Optional<List<RShowInfo>> getRShowsList();


    @Query("SELECT new com.c209.catalog.domain.performance.dto.info.PSingerInfo( " +
            "s.id, s.name, s.image, s.view " +
            ") FROM Singer s ORDER BY s.view DESC LIMIT 10")
    Optional<List<PSingerInfo>> getPSingerList();
}

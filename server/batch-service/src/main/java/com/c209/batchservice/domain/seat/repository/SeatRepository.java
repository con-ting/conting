package com.c209.batchservice.domain.seat.repository;

import com.c209.batchservice.domain.seat.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findAllByScheduleId(Long scheduleId);
}

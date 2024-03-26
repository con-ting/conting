package com.c209.seat.domain.seat.repository;

import com.c209.seat.domain.seat.dto.response.SeatStatusResponse;
import com.c209.seat.domain.seat.entity.Seat;
import com.c209.seat.domain.seat.entity.enums.Grade;
import com.c209.seat.domain.seat.entity.enums.Sector;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Flux;
import org.springframework.data.r2dbc.repository.Query;
import reactor.core.publisher.Mono;


public interface SeatR2dbcRepository extends ReactiveCrudRepository<Seat, Long> {

    @Query("SELECT seat_id, schedule_id, is_available, row, col, grade, grade_price, nft_url, sector FROM seat WHERE schedule_id = :scheduleId AND sector = :sector")
    Flux<Seat> findAllByScheduleIdAndSector(Long scheduleId, Sector sector);

    @Query("SELECT seat_id, is_available FROM seat WHERE seat_id = :seatID")
    Mono<SeatStatusResponse> findBySeatId(Long seatId);


}


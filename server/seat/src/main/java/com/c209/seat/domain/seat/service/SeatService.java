package com.c209.seat.domain.seat.service;

import com.c209.seat.domain.seat.dto.response.SeatListResponse;
import com.c209.seat.domain.seat.dto.response.SeatStatusResponse;
import com.c209.seat.domain.seat.entity.enums.Grade;
import com.c209.seat.domain.seat.entity.enums.Sector;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Optional;

public interface SeatService {
    Mono<SeatListResponse> getSeatList(Long scheduleId, Sector sector);

    Mono<SeatStatusResponse> getSeatStatus(Long seatId);

    Mono<SeatStatusResponse> getSeatListStatus(List<Long> seatIds);
}

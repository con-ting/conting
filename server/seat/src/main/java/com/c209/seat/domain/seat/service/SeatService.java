package com.c209.seat.domain.seat.service;

import com.c209.seat.domain.seat.dto.response.SeatListResponse;
import com.c209.seat.domain.seat.entity.enums.Grade;
import com.c209.seat.domain.seat.entity.enums.Sector;
import reactor.core.publisher.Mono;

import java.util.Optional;

public interface SeatService {
    Mono<SeatListResponse> getSeatList(Long scheduleId, Sector sector);
}

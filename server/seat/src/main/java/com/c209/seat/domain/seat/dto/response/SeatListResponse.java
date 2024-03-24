package com.c209.seat.domain.seat.dto.response;

import com.c209.seat.domain.seat.dto.SeatDto;
import reactor.core.publisher.Flux;

import java.util.List;


public record SeatListResponse(
    List<SeatDto> seats
) {



}

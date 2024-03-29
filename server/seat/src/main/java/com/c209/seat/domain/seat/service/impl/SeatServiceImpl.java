package com.c209.seat.domain.seat.service.impl;

import com.c209.seat.domain.seat.dto.SeatDto;
import com.c209.seat.domain.seat.dto.response.SeatListResponse;
import com.c209.seat.domain.seat.dto.response.SeatStatusResponse;
import com.c209.seat.domain.seat.entity.enums.Sector;
import com.c209.seat.domain.seat.repository.async.SeatR2dbcRepository;
import com.c209.seat.domain.seat.service.SeatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;
import com.c209.seat.domain.seat.entity.Seat;

import java.util.List;


@Service
public class SeatServiceImpl implements SeatService {

    private final SeatR2dbcRepository seatR2dbcRepository;

    @Autowired
    public SeatServiceImpl(SeatR2dbcRepository seatR2dbcRepository) {
        this.seatR2dbcRepository = seatR2dbcRepository;
    }

    @Override
    public Mono<SeatListResponse> getSeatList(Long scheduleId, Sector sector) {
        Flux<SeatDto> seatDtoFlux = seatR2dbcRepository.findAllByScheduleIdAndSector(scheduleId, sector)
                .map(seat -> seat.toDto());

        return seatDtoFlux.collectList().map(SeatListResponse::new);
    }

    @Override
    public Mono<SeatStatusResponse> getSeatStatus(Long seatId) {
        return seatR2dbcRepository.findBySeatId(seatId);
    }

    @Override
    public Mono<SeatStatusResponse> getSeatListStatus(List<Long> seatIds) {
        return seatR2dbcRepository.findBySeatIdIn(seatIds)
                .collectList()
                .map(seats -> {
                    boolean allAvailable = seats.stream()
                            .allMatch(Seat::getIsAvailable);
                    return SeatStatusResponse.builder()
                            .isAvailable(allAvailable)
                            .build();
                });
    }
}
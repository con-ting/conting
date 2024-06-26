package com.c209.seat.domain.seat.controller;

import com.c209.seat.domain.seat.dto.request.GetSeatStatusListRequest;
import com.c209.seat.domain.seat.dto.response.SeatListResponse;
import com.c209.seat.domain.seat.dto.response.SeatStatusResponse;
import com.c209.seat.domain.seat.entity.enums.Sector;
import com.c209.seat.domain.seat.service.SeatService;
import com.c209.seat.domain.seat.service.impl.SeatConsumerServiceImplKafka;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;

@RestController
@RequestMapping("seat")
@RequiredArgsConstructor
@Slf4j
public class SeatController {


    private final SeatService seatService;




    @GetMapping()
    public Mono<ResponseEntity<SeatListResponse>> getSeatList(
            @RequestParam("schedule_id") Long scheduleId,
            @RequestParam("sector") Sector sector,
            @RequestHeader("X-Authorization-Id") Long userId

    ){
        return seatService.getSeatList(scheduleId, sector)
                .map(ResponseEntity::ok);
    }

    @GetMapping("/{seat_id}/status")
    public Mono<ResponseEntity<SeatStatusResponse>> getSeatStatus(
            @PathVariable("seat_id") Long seatId,
            @RequestHeader("X-Authorization-Id") Long userId
    ){
        return seatService.getSeatStatus(seatId)
                .map(ResponseEntity::ok);
    }

    @GetMapping("/list/status")
    public Mono<ResponseEntity<SeatStatusResponse>> getSeatStatusList(
            @RequestParam List<Long> seatIds,
            @RequestHeader("X-Authorization-Id") Long userId
    ){
        return seatService.getSeatListStatus(seatIds)
                .map(ResponseEntity::ok);
    }

}

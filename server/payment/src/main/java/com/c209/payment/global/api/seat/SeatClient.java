package com.c209.payment.global.api.seat;

import com.c209.payment.domain.order.dto.response.SeatStatusResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;
import reactor.core.publisher.Mono;

import java.util.List;

@FeignClient(name = "seat-service", url = "http://localhost:8889/seat")
public interface SeatClient {

    @GetMapping("/list/status")
    SeatStatusResponse getSeatStatusList(
            @RequestParam List<Long> seatIds,
            @RequestHeader("X-Authorization-Id") Long authorizationId
    );
}
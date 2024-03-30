package com.c209.payment.domain.seat.dto.request;


import lombok.Builder;

@Builder
public record SeatUpdateRequest(
        Long seatId
) {
}

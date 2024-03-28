package com.c209.seat.domain.seat.dto.request;

import lombok.Getter;

import java.util.List;


public record GetSeatStatusListRequest(
        List<Long> seat_ids
) {
}

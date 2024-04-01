package com.c209.seat.domain.seat.dto.request;


import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;

import java.util.List;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record SeatUpdateRequest(
        Boolean isAvailable,
        List<Long> seatIds
) {
}

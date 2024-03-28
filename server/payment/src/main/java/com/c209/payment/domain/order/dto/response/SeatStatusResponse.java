package com.c209.payment.domain.order.dto.response;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import lombok.ToString;


@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record SeatStatusResponse(
        Boolean isAvailable

) {
}

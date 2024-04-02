package com.c209.payment.domain.order.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public record TicketIssueDto(
        Long seatId,
        Integer price,
        Long scheduleId,
        Long ownerId,
        String fingerPrint,
        String nftUrl,
        String row,
        String col
) {
}

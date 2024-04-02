package com.c209.ticket.domain.ticket.dto;

import com.c209.ticket.domain.ticket.entity.Status;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;

import java.time.LocalDateTime;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public record TicketPaymentsDto(
        Long ticketId,
        Integer price,
        String impUid,
        Long scheduleId,
        Status status,
        LocalDateTime payDueDate

) {
}

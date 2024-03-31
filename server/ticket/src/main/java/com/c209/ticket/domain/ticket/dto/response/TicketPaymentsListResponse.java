package com.c209.ticket.domain.ticket.dto.response;

import com.c209.ticket.domain.ticket.dto.TicketPaymentsDto;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.AllArgsConstructor;
import lombok.Builder;

import java.util.List;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record TicketPaymentsListResponse(
        List<TicketPaymentsDto> ticketPayments
        )
{
}

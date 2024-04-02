package com.c209.ticket.domain.ticket.dto.request;



import com.c209.ticket.domain.ticket.dto.TicketIssueDto;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import java.util.List;


@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record OrderFailRequest(
        List<TicketIssueDto> ticketList
) {
}

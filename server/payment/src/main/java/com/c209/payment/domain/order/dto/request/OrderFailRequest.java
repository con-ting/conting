package com.c209.payment.domain.order.dto.request;

import com.c209.payment.domain.order.dto.TicketIssueDto;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.ToString;

import java.util.List;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@ToString
public record OrderFailRequest(
        List<TicketIssueDto> ticketList
) {
}

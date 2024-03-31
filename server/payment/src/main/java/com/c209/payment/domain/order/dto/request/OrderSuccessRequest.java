package com.c209.payment.domain.order.dto.request;


import com.c209.payment.domain.order.dto.TicketIssueDto;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

import java.util.List;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record OrderSuccessRequest(
        Integer amount,
        Long buyerId ,
        String impUid,
        String merchantUid,
        List<Long>seatIds,
        List<TicketIssueDto> ticketList
) {
}

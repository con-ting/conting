package com.c209.ticket.domain.ticket.dto;

import com.c209.ticket.domain.ticket.entity.Status;
import com.c209.ticket.domain.ticket.entity.Ticket;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;

@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record TicketIssueDto(

        Long seatId,
        Long scheduleId,
        Integer price,
        Long ownerId,
        String fingerPrint,
        String nftUrl,
        String row,
        String col
) {

    public Ticket toEntityForSuccess(){
        return Ticket.builder()
                .seatId(this.seatId)
                .scheduleId(this.scheduleId)
                .ownerId(this.ownerId)
                .price(price)
                .fingerprintKey(this.fingerPrint)
                .nftUrl(this.nftUrl)
                .row(this.row)
                .col(this.col)
                .build();
    }

    public Ticket toEntityForFail(){
        return Ticket.builder()
                .seatId(this.seatId)
                .ownerId(this.ownerId)
                .price(price)
                .scheduleId(this.scheduleId)
                .fingerprintKey(this.fingerPrint)
                .status(Status.환불대기)
                .build();
    }
}

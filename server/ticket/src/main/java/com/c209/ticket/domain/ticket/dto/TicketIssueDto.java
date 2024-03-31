package com.c209.ticket.domain.ticket.dto;

import com.c209.ticket.domain.ticket.entity.Ticket;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record TicketIssueDto(

        Long seatId,
        Long scheduleId,
        Long ownerId,
        String fingerPrint,
        String nftUrl,
        String row,
        String col
) {

    public Ticket toEntity(){
        return Ticket.builder()
                .seatId(this.seatId)
                .scheduleId(this.scheduleId)
                .ownerId(this.ownerId)
                .fingerprintKey(this.fingerPrint)
                .nftUrl(this.nftUrl)
                .row(this.row)
                .col(this.col)
                .build();
    }
}

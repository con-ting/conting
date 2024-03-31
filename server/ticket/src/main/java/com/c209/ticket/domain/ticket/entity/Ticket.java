package com.c209.ticket.domain.ticket.entity;


import com.c209.ticket.domain.ticket.dto.TicketDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

import java.time.LocalDateTime;

@Table("ticket")
@AllArgsConstructor
@Getter
@Setter
public class Ticket {

    @Id
    private Long ticketId;

    private Boolean isUsed;
    private Long ownerId;
    private Long buyerId;
    private Long scheduleId;
    private String fingerprintKey;
    private Long orderId;
    private String row;
    private String col;
    private String nftUrl;
    private Status status;

    private LocalDateTime payDueDate;


    public TicketDto toDto(String uuid){
        return TicketDto
                .builder()
                .uuid(uuid)
                .col(this.col)
                .row(this.row)
                .ticketId(this.ticketId)
                .scheduleId(this.scheduleId)
                .build();
    }

    public void markAsUsed(){
        if(this.isUsed){
            throw new IllegalArgumentException("이미 사용된 티켓입니다.");
        }else{
            this.isUsed = true;
        }

    }

    @Override
    public String toString() {
        return "Ticket{" +
                "ticketId=" + ticketId +
                ", isUsed=" + isUsed +
                ", ownerId=" + ownerId +
                ", buyerId=" + buyerId +
                ", scheduleId=" + scheduleId +
                ", fingerprintKey='" + fingerprintKey + '\'' +
                ", orderId=" + orderId +
                ", row='" + row + '\'' +
                ", col='" + col + '\'' +
                ", nftUrl='" + nftUrl + '\'' +
                '}';
    }
}

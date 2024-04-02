package com.c209.ticket.domain.ticket.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "ticket")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TicketSync {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="ticket_id")
    private Long ticketId;

    @Column
    private Integer price;

    @Column(name="is_used")

    private Boolean isUsed;
    @Column(name="owner_id")

    private Long ownerId;
    @Column(name="buyer_id")

    private Long buyerId;
    @Column(name="schedule_id")

    private Long scheduleId;
    @Column(name="seat_id")

    private Long seatId;
    @Column(name="fingerprint_key")

    private String fingerprintKey;
    @Column(name="imp_uid")

    private String impUid;
    @Column(name="row")
    private String row;
    @Column(name="col")
    private String col;
    @Column(name="nft_url")
    private String nftUrl;

    @Column(name="status")
    @Enumerated(EnumType.STRING)
    private Status status;

    private LocalDateTime payDueDate;


    // Getter 및 Setter는 생략

    public void markAsUsed() {
        if (this.isUsed) {
            throw new IllegalArgumentException("이미 사용된 티켓입니다.");
        } else {
            this.isUsed = true;
        }
    }

    @Override
    public String toString() {
        return "Ticket{" +
                "id=" + ticketId +
                ", price=" + price +
                ", isUsed=" + isUsed +
                ", ownerId=" + ownerId +
                ", buyerId=" + buyerId +
                ", scheduleId=" + scheduleId +
                ", seatId=" + seatId +
                ", fingerprintKey='" + fingerprintKey + '\'' +
                ", impUid='" + impUid + '\'' +
                ", row='" + row + '\'' +
                ", col='" + col + '\'' +
                ", nftUrl='" + nftUrl + '\'' +
                ", status=" + status +
                ", payDueDate=" + payDueDate +
                '}';
    }
}
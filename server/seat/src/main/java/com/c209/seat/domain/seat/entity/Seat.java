package com.c209.seat.domain.seat.entity;


import com.c209.seat.domain.seat.dto.SeatDto;
import com.c209.seat.domain.seat.entity.enums.Grade;
import com.c209.seat.domain.seat.entity.enums.Sector;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import lombok.NoArgsConstructor;

@Table("seat")
@AllArgsConstructor
@Getter
public class Seat {

    @Id
    private Long seatId;
    private Long scheduleId;
    private String row;
    private String col;
    private Grade grade;
    private Integer gradePrice;
    private String ntfUrl;
    private Sector sector;
    private Boolean isAvailable;

    public SeatDto toDto() {

        return SeatDto.builder()
                .seatId(this.seatId)
                .schedulelId(this.scheduleId)
                .row(this.row)
                .col(this.col)
                .grade(this.grade)
                .ntfUrl(this.ntfUrl)
                .gradePrice(this.gradePrice)
                .sector(this.sector)
                .isAvailable(this.isAvailable)
                .build();
    }

    // Getters and setters
}

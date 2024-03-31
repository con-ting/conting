package com.c209.batchservice.domain.seat.dto;

import com.c209.batchservice.domain.seat.entity.Seat;
import lombok.Builder;

@Builder
public record SeatDto(
        Long id,
        Long scheduleId,
        String row,
        String col,
        String grade,
        Integer gradePrice,
        String ntfUrl,
        String sector
) {
    public static SeatDto of(Seat seat) {
        return SeatDto.builder()
                .id(seat.getId())
                .scheduleId(seat.getScheduleId())
                .row(seat.getRow())
                .col(seat.getCol())
                .grade(seat.getGrade())
                .ntfUrl(seat.getNftUrl())
                .gradePrice(seat.getGradePrice())
                .sector(seat.getSector())
                .build();
    }
}

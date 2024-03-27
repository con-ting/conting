/**
 * This code was COPIED from "com.c209.seat" package.
 */
package com.c209.batchservice.domain.seat.dto;

import com.c209.batchservice.domain.seat.entity.Seat;
import com.c209.batchservice.domain.seat.enums.Grade;
import com.c209.batchservice.domain.seat.enums.Sector;
import lombok.Builder;

@Builder
public record SeatDto(
        Long id,
        Long scheduleId,
        String row,
        String col,
        Grade grade,
        Integer gradePrice,
        String ntfUrl,
        Sector sector
) {
    public static SeatDto of(Seat seat) {
        return SeatDto.builder()
                .id(seat.getId())
                .scheduleId(seat.getScheduleId())
                .row(seat.getRow())
                .col(seat.getCol())
                .grade(seat.getGrade())
                .ntfUrl(seat.getNtfUrl())
                .gradePrice(seat.getGradePrice())
                .sector(seat.getSector())
                .build();
    }
}

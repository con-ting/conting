package com.c209.seat.domain.seat.dto;


import com.c209.seat.domain.seat.entity.enums.Grade;
import com.c209.seat.domain.seat.entity.enums.Sector;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record SeatDto (
        Long seatId,
        Long schedulelId,
        Boolean isAvailable,
        String row,
        String col,
        String grade,
        Integer gradePrice,
        String ntfUrl,
        Sector sector
)
{
}

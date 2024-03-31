package com.c209.batchservice.batch.nft.dto;

import com.c209.batchservice.domain.catalog.dto.ScheduleDto;
import com.c209.batchservice.domain.seat.dto.SeatDto;
import lombok.Builder;

@Builder
public record SeatAndScheduleAndMediaDto(
        SeatDto seat,
        ScheduleDto schedule,
        String mediaUrl,
        String thumbUrl
) {
}

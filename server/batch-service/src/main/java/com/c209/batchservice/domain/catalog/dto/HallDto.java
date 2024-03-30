package com.c209.batchservice.domain.catalog.dto;

import com.c209.batchservice.domain.catalog.entity.Hall;
import lombok.Builder;

@Builder
public record HallDto(
        Long id,
        String name,
        String address
) {
    public static HallDto of(Hall hall) {
        return HallDto.builder()
                .id(hall.getId())
                .name(hall.getName())
                .address(hall.getAddress())
                .build();
    }
}

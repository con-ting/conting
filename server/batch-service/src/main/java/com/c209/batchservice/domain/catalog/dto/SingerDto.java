package com.c209.batchservice.domain.catalog.dto;

import com.c209.batchservice.domain.catalog.entity.Singer;
import lombok.Builder;

@Builder
public record SingerDto(
        Long singerId,
        String name,
        String wallet
) {
    public static SingerDto of(Singer singer) {
        return SingerDto.builder()
                .singerId(singer.getSingerId())
                .name(singer.getName())
                .wallet(singer.getWallet())
                .build();
    }
}

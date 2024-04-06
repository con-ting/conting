package com.c209.catalog.domain.singer.dto.info;

import lombok.Builder;

import java.time.LocalDate;

@Builder
public record SingerListInfo(
        Long singerId,
        String singerName,
        String singerImage,
        String singerInstagram,
        String singerWallet,
        LocalDate dateOfDebut,
        LocalDate dateOfBirth,
        Integer singerView
) {
}

package com.c209.catalog.domain.singer.dto.info;


import lombok.Builder;

import java.time.LocalDate;

@Builder
public record SingerAndAlbumInfo(
        Long singerId,
        String singerName,
        String singerImage,
        String singerInstagram,
        String singerWallet,
        Long albumId,
        String albumImage,
        String albumName,
        String albumTitle,
        String albumVideo,
        LocalDate releaseAt
) {
}

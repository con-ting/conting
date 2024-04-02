package com.c209.catalog.domain.singer.dto.info;


import lombok.*;

import java.time.LocalDate;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class SingerAndAlbumInfo {
    private Long singerId;
    private String singerName;
    private String singerImage;
    private String instagram;
    private Long albumId;
    private String albumImage;
    private String albumName;
    private String albumTitle;
    private String albumVideo;
    private LocalDate releaseAt;
}

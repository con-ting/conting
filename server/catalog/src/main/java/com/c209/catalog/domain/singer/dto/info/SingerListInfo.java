package com.c209.catalog.domain.singer.dto.info;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class SingerListInfo {
    private Long singer_id;
    private String singer_name;
    private String singer_profile_image;
    private String singer_instagram;
    private String singer_wallet;
    private LocalDate dateOfDebut;
    private LocalDate dateOfBirth;
    private Integer singer_view;
}

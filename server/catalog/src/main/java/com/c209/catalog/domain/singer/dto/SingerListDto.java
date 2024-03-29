package com.c209.catalog.domain.singer.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.persistence.Column;
import lombok.*;

import java.time.LocalDate;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
public class SingerListDto {
    private Long singer_id;
    private String singer_name;
    private String singer_profile_image;
    private String singer_instagram;
    private String singer_wallet;
    private LocalDate dateOfDebut;
    private LocalDate dateOfBirth;
    private Integer singer_view;
}

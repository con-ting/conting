package com.c209.catalog.domain.singer.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Builder;

import java.time.LocalDate;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record SingerListDto(
        @NotNull Long singerId,
        @NotNull String singerName,
        String singerProfileImage,
        String singerInstagram,
        String singerWallet,
        LocalDate dateOfDebut,
        LocalDate dateOfBirth,
        @PositiveOrZero Integer singerView
) {
}

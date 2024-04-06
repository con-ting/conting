package com.c209.catalog.domain.singer.dto;


import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PastOrPresent;
import lombok.Builder;

import java.time.LocalDate;


@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record AlbumDto(
        @NotNull String name,
        String image,
        @NotNull String title,
        String titleUrl,
        @PastOrPresent LocalDate publishedAt
) {
}

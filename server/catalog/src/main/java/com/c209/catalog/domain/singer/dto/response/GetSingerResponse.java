package com.c209.catalog.domain.singer.dto.response;

import com.c209.catalog.domain.singer.dto.AlbumDto;
import com.c209.catalog.domain.singer.dto.SingerDto;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;

import java.util.List;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record GetSingerResponse(
        SingerDto singer,
        List<AlbumDto> albums
) {
}

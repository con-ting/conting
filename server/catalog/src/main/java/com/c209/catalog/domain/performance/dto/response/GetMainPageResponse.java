package com.c209.catalog.domain.performance.dto.response;

import com.c209.catalog.domain.performance.dto.FShowsDto;
import com.c209.catalog.domain.performance.dto.PShowsDto;
import com.c209.catalog.domain.performance.dto.RShowsDto;
import com.c209.catalog.domain.performance.dto.SingerDto;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
public class GetMainResponse {
    private PShowsDto popular_shows;
    private FShowsDto f_shows;
    private RShowsDto r_shows;
    private SingerDto popular_singers
}

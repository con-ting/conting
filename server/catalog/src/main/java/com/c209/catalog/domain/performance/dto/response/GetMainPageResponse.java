package com.c209.catalog.domain.performance.dto.response;

import com.c209.catalog.domain.performance.dto.FShowsDto;
import com.c209.catalog.domain.performance.dto.PShowsDto;
import com.c209.catalog.domain.performance.dto.PSingerDto;
import com.c209.catalog.domain.performance.dto.RShowsDto;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

import java.util.List;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
public class GetMainPageResponse {
    private List<PShowsDto> popular_shows;
    private List<FShowsDto> f_shows;
    private List<RShowsDto> r_shows;
    private List<PSingerDto> popular_singers;
}

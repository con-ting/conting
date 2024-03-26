package com.c209.catalog.domain.performance.dto.response;

import com.c209.catalog.domain.performance.dto.PerformanceSearchDto;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

import java.util.List;
import java.util.Optional;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Setter
public class SearchShowResponse {
    private Optional<List<PerformanceSearchDto>> shows;

    public void setPerformances(Optional<List<PerformanceSearchDto>> performanceSearchDtos) {
        this.shows = performanceSearchDtos;
    }
}

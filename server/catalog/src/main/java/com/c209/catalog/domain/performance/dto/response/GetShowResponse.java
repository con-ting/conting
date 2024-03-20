package com.c209.catalog.domain.performance.dto.response;

import com.c209.catalog.domain.performance.dto.*;
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
public class GetShowResponse {
    private PerformanceDto show;
    private List<GradeDto> grade;
    private List<ScheduleDto> schedule;
    private HallDto hall;
    private List<SingerDto> singers;
    private CompanyDto company;
}

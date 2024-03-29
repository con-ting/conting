package com.c209.catalog.domain.cash.dto.response;

import com.c209.catalog.domain.cash.dto.PerformanceDto;
import com.c209.catalog.domain.cash.dto.ScheduleDto;
import com.c209.catalog.domain.hall.dto.HallDto;
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
public class CashResponse {
    private List<PerformanceDto> performances;
    private List<HallDto> halls;
    private List<ScheduleDto> schedules;
}

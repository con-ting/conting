package com.c209.catalog.domain.schedule.dto.response;

import com.c209.catalog.domain.schedule.dto.ScheduleDto;
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
public class GetScheduleResponse {
    private List<ScheduleDto> schedule;
}

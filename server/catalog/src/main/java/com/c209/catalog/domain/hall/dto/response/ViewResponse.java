package com.c209.catalog.domain.hall.dto.response;

import com.c209.catalog.domain.hall.dto.HallViewDto;
import com.c209.catalog.domain.hall.dto.ViewDto;
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
public class ViewResponse {
    private List<ViewDto> data;
    private HallViewDto hall;
}

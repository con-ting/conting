package com.c209.catalog.domain.hall.dto.response;

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
public class HallsResponse {

//    list형태로 dto 사용
    private List<HallDto> halls;

}

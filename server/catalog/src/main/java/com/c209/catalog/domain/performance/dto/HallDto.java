package com.c209.catalog.domain.performance.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
public class HallDto {
    private Long id;
    private String name;
    private String address;
    private Integer seat_total;
    private Float x;
    private Float y;
}

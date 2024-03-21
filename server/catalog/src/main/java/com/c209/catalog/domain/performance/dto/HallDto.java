package com.c209.catalog.domain.performance.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
public class HallDto {
    private Long id;
    @NotNull
    private String name;
    private String address;
    @PositiveOrZero
    private Integer seat_total;
    private Float x;
    private Float y;
}

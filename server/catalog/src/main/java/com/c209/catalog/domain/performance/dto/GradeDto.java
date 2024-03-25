package com.c209.catalog.domain.performance.dto;

import com.c209.catalog.domain.grade.enums.Grades;
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
public class GradeDto {
    private Long id;
    @NotNull
    private Grades grade;
    @PositiveOrZero
    private Integer price;
}

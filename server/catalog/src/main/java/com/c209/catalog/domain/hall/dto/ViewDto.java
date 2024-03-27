package com.c209.catalog.domain.hall.dto;

import com.c209.catalog.domain.grade.enums.Grades;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.*;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class ViewDto {
    private Grades grade;
    private String url;
    @PositiveOrZero
    private Integer price;
}

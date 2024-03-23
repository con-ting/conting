package com.c209.catalog.domain.performance.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import lombok.*;

import java.time.LocalDateTime;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Data
public class PostScheduleDTO {
    @FutureOrPresent
    private LocalDateTime startDatetime;
    @Future
    private LocalDateTime endDatetime;

    @AssertTrue(message = "회차 종료시점은 회차 시작시점보다 후여야 합니다.")
    private boolean isValidEndDatetime() {
        return endDatetime.isAfter(startDatetime);
    }
}

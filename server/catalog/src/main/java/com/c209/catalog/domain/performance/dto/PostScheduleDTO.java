package com.c209.catalog.domain.performance.dto;

import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.FutureOrPresent;
import lombok.Data;

import java.time.LocalDateTime;

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

package com.c209.catalog.domain.performance.dto;

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
}

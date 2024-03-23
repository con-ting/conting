package com.c209.catalog.domain.performance.dto;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PostScheduleDTO {
    private LocalDateTime startDatetime;
    private LocalDateTime endDatetime;
}

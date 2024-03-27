package com.c209.batchservice.domain.catalog.dto;

import com.c209.batchservice.domain.catalog.entity.Performance;
import com.c209.batchservice.domain.catalog.enums.Status;
import lombok.Builder;

import java.util.Date;

@Builder
public record PerformanceDto(
        Long id,
        String title,
        String posterImage,
        String description,
        String videoUrl,
        Status status,
        Date startDate,
        Date endDate
) {
    public static PerformanceDto of(Performance performance) {
        return PerformanceDto.builder()
                .id(performance.getId())
                .title(performance.getTitle())
                .posterImage(performance.getPosterImage())
                .description(performance.getDescription())
                .videoUrl(performance.getVideoUrl())
                .status(performance.getStatus())
                .startDate(performance.getStartDate())
                .endDate(performance.getEndDate())
                .build();
    }
}

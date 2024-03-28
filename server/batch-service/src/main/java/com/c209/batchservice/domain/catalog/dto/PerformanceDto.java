package com.c209.batchservice.domain.catalog.dto;

import com.c209.batchservice.domain.catalog.entity.Performance;
import com.c209.batchservice.domain.catalog.enums.Status;
import lombok.Builder;

@Builder
public record PerformanceDto(
        Long id,
        String title,
        String posterImage,
        String description,
        String videoUrl,
        Status status,
        String startDate,
        String endDate
) {
    public static PerformanceDto of(Performance performance) {
        return PerformanceDto.builder()
                .id(performance.getId())
                .title(performance.getTitle())
                .posterImage(performance.getPosterImage())
                .description(performance.getDescription())
                .videoUrl(performance.getVideoUrl())
                .status(performance.getStatus())
                .startDate(performance.getStartDate().toString())
                .endDate(performance.getEndDate().toString())
                .build();
    }
}

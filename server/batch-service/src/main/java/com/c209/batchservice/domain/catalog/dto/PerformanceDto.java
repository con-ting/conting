package com.c209.batchservice.domain.catalog.dto;

import com.c209.batchservice.domain.catalog.entity.Performance;
import lombok.Builder;

@Builder
public record PerformanceDto(
        Long performanceId,
        String title,
        String posterImage,
        String description,
        String videoUrl,
        String startDate,
        String endDate,
        SellerDto seller,
        SingerDto singer
) {
    public static PerformanceDto of(Performance performance) {
        return PerformanceDto.builder()
                .performanceId(performance.getPerformanceId())
                .title(performance.getTitle())
                .posterImage(performance.getPosterImage())
                .description(performance.getDescription())
                .videoUrl(performance.getVideoUrl())
                .startDate(performance.getStartDate().toString())
                .endDate(performance.getEndDate().toString())
                .seller(SellerDto.of(performance.getSeller()))
                .singer(SingerDto.of(performance.getSinger()))
                .build();
    }
}

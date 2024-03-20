package com.c209.catalog.domain.performance.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class PerformanceDto {
    private Long id;
    private String title;
    private String description;
    private String poster;
    private String description_image;
    private String reservation_type;
    private Float reservation_rate;
    private LocalDateTime reservation_start_datetime;
    private LocalDateTime reservation_end_datetime;
    private Date start_date;
    private Date end_date;
}

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
    private Long show_id;
    private String title;
    private String description;
    private String poster;
    private String description_image;
    private String reservation_type;
//    private Float reservation_rate;
    private LocalDateTime ticket_open_date;
    private LocalDateTime ticket_close_date;
    private Date start_date;
    private Date end_date;
}

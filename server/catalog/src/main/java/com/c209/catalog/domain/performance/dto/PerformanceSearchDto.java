package com.c209.catalog.domain.performance.dto;

import com.c209.catalog.domain.hall.entity.Hall;
import com.c209.catalog.domain.performance.enums.ReservationType;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class PerformanceSearchDto {
    private Long show_id;
    private String poster;
    private String title;
    private Hall hall;
    private ReservationType reservation_type;
    private LocalDateTime reservation_start_date_time;
    private LocalDateTime reservation_end_date_time;
    private LocalDate start_date;
    private LocalDate end_date;
}

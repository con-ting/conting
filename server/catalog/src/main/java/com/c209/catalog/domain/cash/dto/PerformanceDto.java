package com.c209.catalog.domain.cash.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.Objects;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class PerformanceDto {
    private Long performance_id;
    private String title;
    private String poster_image;
    private String description_image;
    private Long hall_id;
    private LocalDateTime reservation_start_datetime;
    private LocalDateTime reservation_end_datetime;
    private Date start_date;
    private Date end_date;

    @Override
    public int hashCode() {
        int prime = 31;
        int result = 1;
        result = prime * result + ((performance_id == null) ? 0 : performance_id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        PerformanceDto other = (PerformanceDto) obj;
        return Objects.equals(performance_id, other.performance_id);
    }
}

package com.c209.catalog.domain.cash.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Objects;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class ScheduleDto {
    private Long schedule_id;
    private Long performance_id;
    private LocalDateTime start_time;
    private LocalDateTime end_time;

    @Override
    public int hashCode() {
        int prime = 31;
        int result = 1;
        result = prime * result + ((schedule_id == null) ? 0 : schedule_id.hashCode());
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
        ScheduleDto other = (ScheduleDto) obj;
        return Objects.equals(schedule_id, other.schedule_id);
    }
}

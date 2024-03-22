package com.c209.catalog.domain.performance.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
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
public class FShowsDto {
    private Long show_id;
    @NotNull
    private String poster;
    @NotNull
    private String title;
    @NotNull
    private Long hall_id;
    @NotNull
    private String hall_name;
    @NotNull
    private String reservation_type;
    @FutureOrPresent
    private LocalDateTime reservation_start_date_time;
    private LocalDateTime reservation_end_date_time;
    private Date start_date;
    private Date end_date;

    @Override
    public int hashCode() {
        int prime = 31;
        int result = 1;
        result = prime * result + ((show_id == null) ? 0 : show_id.hashCode());
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
        FShowsDto other = (FShowsDto) obj;
        return Objects.equals(show_id, other.show_id);
    }
}

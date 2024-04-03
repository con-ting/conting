package com.c209.catalog.domain.performance.dto;

import com.c209.catalog.domain.performance.enums.ReservationType;
import com.c209.catalog.domain.performance.enums.Status;
import com.c209.catalog.domain.singer.dto.SingerListDto;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.Objects;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PerformanceSearchDto {
    private Long show_id;
    private String poster;
    private String title;
    private Long hall_id;
    private String hall_name;
    private String hall_address;
    private ReservationType reservation_type;
    private Status status;
    private LocalDateTime reservation_start_date_time;
    private LocalDateTime reservation_end_date_time;
    private Date start_date;
    private Date end_date;
    private String singer_name;


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
        PerformanceSearchDto other = (PerformanceSearchDto) obj;
        return Objects.equals(show_id, other.show_id);
    }
}

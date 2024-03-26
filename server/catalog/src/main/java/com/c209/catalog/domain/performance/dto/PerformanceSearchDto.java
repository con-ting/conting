package com.c209.catalog.domain.performance.dto;

import com.c209.catalog.domain.performance.enums.ReservationType;
import com.c209.catalog.domain.performance.enums.Status;
import com.querydsl.core.annotations.QueryProjection;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

@Builder
//@AllArgsConstructor
@NoArgsConstructor
@Getter
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

    @QueryProjection
    private PerformanceSearchDto(
            Long show_id, String poster, String title, Long hall_id, String hall_name, String hall_address,
            ReservationType reservation_type, Status status,
            LocalDateTime reservation_start_date_time, LocalDateTime reservation_end_date_time,
            Date start_date, Date end_date, String singer_name ) {
        this.show_id = show_id;
        this.poster = poster;
        this.title = title;
        this.hall_id = hall_id;
        this.hall_name = hall_name;
        this.hall_address = hall_address;
        this.reservation_type = reservation_type;
        this.status = status;
        this.reservation_start_date_time = reservation_start_date_time;
        this.reservation_end_date_time = reservation_end_date_time;
        this.start_date = start_date;
        this.end_date = end_date;
        this.singer_name = singer_name;
    }
}

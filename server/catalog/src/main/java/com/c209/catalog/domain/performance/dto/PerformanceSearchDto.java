package com.c209.catalog.domain.performance.dto;

import com.c209.catalog.domain.performance.enums.ReservationType;
import com.c209.catalog.domain.performance.enums.Status;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Builder
@AllArgsConstructor
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
}

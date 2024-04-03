package com.c209.catalog.domain.seller.dto.info;

import com.c209.catalog.domain.performance.enums.ReservationType;
import com.c209.catalog.domain.performance.enums.Status;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class SellerShowInfo {
    private Long show_id;
    private String title;
    private ReservationType reservation_type;
    private Status status;
    private Date start_date;
    private Date end_date;
    private LocalDateTime reservation_start_date;
    private LocalDateTime reservation_end_date;
    private Long hall_id;
    private String hall_name;
}

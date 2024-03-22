package com.c209.catalog.domain.performance.dto.info;

import com.c209.catalog.domain.hall.entity.Hall;
import com.c209.catalog.domain.performance.enums.ReservationType;
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
public class RShowInfo {
    private Long rShowId;
    private String rShowPoster;
    private String rShowTitle;
    private Long rShowHallId;
    private String rShowHallName;
    private ReservationType rShowReservationType;
    private LocalDateTime rShowTicketOpenDate;
    private LocalDateTime rShowTicketCloseDate;
    private Date rShowStartDate;
    private Date rShowEndDate;
}

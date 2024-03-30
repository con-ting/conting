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
public class FShowInfo {
    private Long fShowId;
    private String fShowPoster;
    private String fShowTitle;
    private Long fShowHallId;
    private String fShowHallName;
    private String fShowHallAddress;
    private ReservationType fShowReservationType;
    private LocalDateTime fShowTicketOpenDate;
    private LocalDateTime fShowTicketCloseDate;
    private Date fShowStartDate;
    private Date fShowEndDate;
}

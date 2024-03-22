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
public class PShowInfo {
    private Long pShowId;
    private String pShowPoster;
    private String pShowTitle;
    private Long pShowHallId;
    private String pShowHallName;
    private ReservationType pShowReservationType;
    private LocalDateTime pShowTicketOpenDate;
    private LocalDateTime pShowTicketCloseDate;
    private Date pShowStartDate;
    private Date pShowEndDate;
    private Integer pShowView;
}

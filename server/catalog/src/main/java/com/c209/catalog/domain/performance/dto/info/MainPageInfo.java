package com.c209.catalog.domain.performance.dto.info;

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
public class MainPageInfo {
    private Long pShowId;
    private String pShowPoster;
    private String pShowTitle;
    private String pShowHall;
    private ReservationType pShowReservationType;
    private LocalDateTime pShowTicketOpenDate;
    private LocalDateTime pShowTicketCloseDate;
    private Date pShowStartDate;
    private Date pShowEndDate;
    private Integer pShowView;

    private Long fShowId;
    private String fShowPoster;
    private String fShowTitle;
    private String fShowHall;
    private ReservationType fShowReservationType;
    private LocalDateTime fShowTicketOpenDate;
    private LocalDateTime fShowTicketCloseDate;
    private Date fShowStartDate;
    private Date fShowEndDate;

    private Long rShowId;
    private String rShowPoster;
    private String rShowTitle;
    private String rShowHall;
    private ReservationType rShowReservationType;
    private LocalDateTime rShowTicketOpenDate;
    private LocalDateTime rShowTicketCloseDate;
    private Date rShowStartDate;
    private Date rShowEndDate;

    private Long pSingerId;
    private String pSingerName;
    private String pSingerProfile;
    private Integer pSingerView;
}

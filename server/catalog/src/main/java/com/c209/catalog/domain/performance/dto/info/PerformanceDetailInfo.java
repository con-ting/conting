package com.c209.catalog.domain.performance.dto.info;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.bytecode.internal.bytebuddy.PrivateAccessorException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class PerformanceDetailInfo {
    private Long showId;
    private String showTitle;
    private String showDescription;
    private String showPoster;
    private String showDescriptionImage;
    private String showReservationType;
//    private String showReservationRate;
    private LocalDateTime showTicketOpenDate;
    private LocalDateTime showTicketCloseDate;
    private Date showStartDate;
    private Date showEndDate;

    private Long gradeId;
    private String gradeGrade;
    private Integer gradePrice;

    private Long scheduleId;
    private LocalDateTime scheduleStartDateTime;
    private LocalDateTime scheduleEndDateTime;

    private Long hallId;
    private String hallName;
    private String hallAddress;
    private Integer hallSeatTotal;
    private Float hallX;
    private Float hallY;

    private Long singerId;
    private String singerName;
    private String singerProfile;

    private Long companyId;
    private String companyName;
    private String companyCall;
}

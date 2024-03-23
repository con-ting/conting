package com.c209.catalog.domain.performance.dto;

import com.c209.catalog.domain.performance.enums.Genre;
import com.c209.catalog.domain.performance.enums.ReservationType;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class PostShowDTO {
    private String title;
    private String description;
    private String posterImage;
    private String descriptionImage;
    private Genre genre;
    private String videoTitle;
    private String videoUrl;
    private LocalDateTime reservationStartDatetime;
    private LocalDateTime reservationEndDatetime;
    private ReservationType reservationType;
    private Date startDate;
    private Date endDate;
    private Integer maxTicketPerPerson;
}

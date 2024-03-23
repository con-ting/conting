package com.c209.catalog.domain.performance.dto;

import com.c209.catalog.domain.performance.enums.Genre;
import com.c209.catalog.domain.performance.enums.ReservationType;
import jakarta.validation.constraints.*;
import lombok.Builder;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;

import java.time.LocalDateTime;
import java.util.Date;

@Data
public class PostShowDTO {
    @NotBlank
    private String title;
    @NotBlank
    private String description;
    @NotBlank
    private String posterImage;
    @NotBlank
    private String descriptionImage;
    private Genre genre;
    private String videoTitle;
    @NotBlank
    private String videoUrl;
    @FutureOrPresent
    private LocalDateTime reservationStartDatetime;
    @Future
    private LocalDateTime reservationEndDatetime;
    private ReservationType reservationType;
    @FutureOrPresent
    private Date startDate;
    @Future
    private Date endDate;
    @Min(value = 1)
    @Max(value = 8)
    private Integer maxTicketPerPerson;
}

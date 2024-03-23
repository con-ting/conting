package com.c209.catalog.domain.performance.dto;

import com.c209.catalog.domain.performance.enums.Genre;
import com.c209.catalog.domain.performance.enums.ReservationType;
import jakarta.validation.constraints.*;
import lombok.Data;

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

    @AssertTrue(message = "공연 종료시점은 공연 시작시점보다 후여야 합니다.")
    private boolean isValidEndDate() {
        return endDate.after(startDate);
    }
    @AssertTrue(message = "예매 종료시점은 예매 시작시점보다 후여야 합니다.")
    private boolean isValidReservationEndDateTime() {
        return reservationEndDatetime.isAfter(reservationStartDatetime);
    }
}

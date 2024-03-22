package com.c209.catalog.domain.performance.dto;


import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Data
public class PShowsDto {
    private Long show_id;
    @NotNull
    private String poster;
    @NotNull
    private String title;
    @NotNull
    private String hall;
    @NotNull
    private String reservation_type;
    private LocalDateTime reservation_start_date_time;
    private LocalDateTime reservation_end_date_time;
    private Date start_date;
    @FutureOrPresent
    private Date end_date;
    private Integer view;
}

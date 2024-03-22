package com.c209.catalog.domain.performance.entity;

import com.c209.catalog.domain.company.entity.Company;
import com.c209.catalog.domain.hall.entity.Hall;
import com.c209.catalog.domain.performance.enums.Genre;
import com.c209.catalog.domain.performance.enums.ReservationType;
import com.c209.catalog.domain.performance.enums.Status;
import com.c209.catalog.domain.singer.entity.Singer;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

class PerformanceTest {
    @Test
    @DisplayName("Performance Entity Test")
    void createPerformance() {
        LocalDateTime TT = LocalDateTime.now();
        // given
        Performance.PerformanceBuilder builder = Performance.builder();
        builder.company(Company.builder().build());
        builder.title("title");
        builder.posterImage("posterIMG");
        builder.description("description");
        builder.descriptionImage("descriptionIMG");
        builder.genre(Genre.BA);
        builder.videoUrl("videoURL");
        builder.singer(Singer.builder().build());
        builder.hall(Hall.builder().build());
        builder.viewCount(1);
        builder.reservationStartDatetime(TT);
        builder.reservationEndDatetime(TT.plusHours(2));
        builder.status(Status.before_sale);
        builder.reservationType(ReservationType.R);
        builder.maxTicketPerPerson(1);
        builder.isAdultOnly(false);
        Performance performance = builder.build();

        // when, then
        Assertions.assertThat(performance.getTitle()).isEqualTo("title");
        Assertions.assertThat(performance.getPosterImage()).isEqualTo("posterIMG");
        Assertions.assertThat(performance.getDescription()).isEqualTo("description");
        Assertions.assertThat(performance.getReservationStartDatetime()).isEqualTo(TT);
        Assertions.assertThat(performance.getReservationEndDatetime()).isEqualTo(TT.plusHours(2));
        Assertions.assertThat(performance.getStatus()).isEqualTo(Status.before_sale);
    }

}
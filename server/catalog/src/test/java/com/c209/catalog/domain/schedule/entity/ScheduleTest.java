package com.c209.catalog.domain.schedule.entity;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.time.LocalDateTime;

class ScheduleTest {
    @Test
    @DisplayName("Schedule Entity Test")
    void createSchedule(){
        LocalDateTime TT = LocalDateTime.now();
        // given
        Schedule.ScheduleBuilder builder = Schedule.builder();
        builder.startTime(TT);
        builder.endTime(TT);
        Schedule schedule = builder.build();

        // when, then
        Assertions.assertThat(schedule.getStartTime()).isEqualTo(TT);
        Assertions.assertThat(schedule.getEndTime()).isEqualTo(TT);
    }
}
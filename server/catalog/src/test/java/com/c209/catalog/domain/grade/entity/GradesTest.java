package com.c209.catalog.domain.grade.entity;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class GradesTest {
    @Test
    @DisplayName("Grade Entity Test")

    void createGrade() {
        // given
        Grade.GradeBuilder builder = Grade.builder();
        builder.grade("S");
        builder.price(10);
        Grade grade = builder.build();

        // when, then
        Assertions.assertThat(grade.getGrade()).isEqualTo("S");
        Assertions.assertThat(grade.getPrice()).isEqualTo(10);
    }

}
package com.c209.catalog.domain.grade.entity;

import com.c209.catalog.domain.grade.enums.Grades;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class GradesTest {
    @Test
    @DisplayName("Grade Entity Test")
    void createGrade() {
        // given
        Grade.GradeBuilder builder = Grade.builder();
        builder.grade(Grades.S);
        builder.price(10);
        Grade grade = builder.build();

        // when, then
        Assertions.assertThat(grade.getGrade()).isEqualTo(Grades.S);
        Assertions.assertThat(grade.getPrice()).isEqualTo(10);
    }
}

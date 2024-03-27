package com.c209.catalog.domain.hall.dto.info;

import com.c209.catalog.domain.grade.entity.Grade;
import com.c209.catalog.domain.grade.enums.Grades;
import com.c209.catalog.domain.performance.entity.Performance;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class ViewInfo {
    private Long showId;

    private Long gradeId;
    private Grades grades;
    private Performance show;
    private Integer price;

    private Long hallGradeId;
    private String viewUrl;
    private Grade grade;
}

package com.c209.catalog.domain.performance.dto.request;

import com.c209.catalog.domain.grade.enums.Grades;
import com.c209.catalog.domain.performance.dto.PostCompanyDTO;
import com.c209.catalog.domain.performance.dto.PostScheduleDTO;
import com.c209.catalog.domain.performance.dto.PostShowDTO;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

import java.util.List;
import java.util.Map;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
@Data
public class PostShowRequest {
    private PostShowDTO show;
    private List<PostScheduleDTO> schedule;
    private Long hallId;
    private Map<Grades, Integer> gradePrice;
    private List<Long> singerIds;
    private PostCompanyDTO company;
}

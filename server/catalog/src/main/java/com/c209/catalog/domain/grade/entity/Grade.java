package com.c209.catalog.domain.grade.entity;

import com.c209.catalog.domain.performance.entity.Performance;
import com.c209.catalog.domain.grade.enums.Grades;
import com.c209.catalog.global.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import static jakarta.persistence.GenerationType.IDENTITY;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Entity
@Table(indexes = @Index(name="performance_grade", columnList = "performance_id"))
public class Grade extends BaseEntity {
    @GeneratedValue(strategy=IDENTITY)
    @Column(name="grade_id")
    @Id
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "performance_id")
    private Performance performance;

    @Column
    private Grades grade;

    @Column
    private Integer price;
}

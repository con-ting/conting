package com.c209.catalog.domain.hall.entity;

import com.c209.catalog.domain.grade.entity.Grade;
import com.c209.catalog.global.common.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

import static jakarta.persistence.GenerationType.IDENTITY;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Entity
public class HallGrade extends BaseEntity {
    @GeneratedValue(strategy=IDENTITY)
    @Column(name = "hall_grade_id")
    @Id
    private Long id;

    @Column(name = "view_url")
    private String viewUrl;

    @ManyToOne(fetch = FetchType.LAZY, optional = false, cascade = CascadeType.REMOVE)
    @JoinColumn(name = "grade_id")
    private Grade grade;
}

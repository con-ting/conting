package com.c209.catalog.domain.grade.entity;

import com.c209.catalog.domain.show.entity.Show;
import com.c209.catalog.global.common.BaseEntity;
import jakarta.persistence.*;
import lombok.*;

import static jakarta.persistence.GenerationType.IDENTITY;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Entity
public class Grade extends BaseEntity {
    @GeneratedValue(strategy=IDENTITY)
    @Column(name="grade_id")
    @Id
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "show_id")
    private Show show;

    @Column
    private String grade;

    @Column
    private Integer price;
}

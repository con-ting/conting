package com.c209.catalog.domain.singer.entity;


import com.c209.catalog.global.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;


import java.time.LocalDate;

import static jakarta.persistence.GenerationType.IDENTITY;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Entity
public class Singer extends BaseEntity {

    @GeneratedValue(strategy=IDENTITY)
    @Column(name="singer_id")
    @Id
    private Long id;

    @Column(nullable = false)
    private String name;


    @Column
    private String image;

    @Column
    private String instagram;

    @Column
    private String wallet;

    @Column(name="date_of_debut")
    LocalDate dateOfDebut;

    @Column(name="date_of_birth")
    LocalDate dateOfBirth;

}

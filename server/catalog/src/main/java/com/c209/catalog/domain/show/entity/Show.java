package com.c209.catalog.domain.show.entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import static jakarta.persistence.GenerationType.IDENTITY;

public class Show {
    @GeneratedValue(strategy=IDENTITY)
    @Column(name="company_id")
    @Id
    private Long id;
}

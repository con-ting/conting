package com.c209.catalog.domain.company.entity;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

import static jakarta.persistence.GenerationType.IDENTITY;

public class Company {
    @GeneratedValue(strategy=IDENTITY)
    @Column(name="company_id")
    @Id
    private Long id;

    @Column
    private String company_name;

    @Column
    private String call;
}

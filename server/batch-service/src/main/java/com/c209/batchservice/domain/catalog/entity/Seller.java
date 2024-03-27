package com.c209.batchservice.domain.catalog.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Entity
public class Seller {
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "seller_id")
    @Id
    private Long id;
    private Long performanceId;
    private String wallet;
}

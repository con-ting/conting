/**
 * This code was COPIED from "com.c209.catalog" package.
 */
package com.c209.batchservice.domain.catalog.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Getter;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Entity
public class Singer {
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "singer_id")
    @Id
    private Long id;
    private String name;
    private String wallet;
}

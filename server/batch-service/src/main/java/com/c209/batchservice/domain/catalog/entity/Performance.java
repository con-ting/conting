/**
 * This code was COPIED from "com.c209.catalog" package.
 */
package com.c209.batchservice.domain.catalog.entity;

import com.c209.batchservice.domain.catalog.enums.Status;
import jakarta.persistence.*;
import lombok.Getter;

import java.time.LocalDate;

import static jakarta.persistence.GenerationType.IDENTITY;

@Getter
@Entity
public class Performance {
    @GeneratedValue(strategy = IDENTITY)
    @Column(name = "performance_id")
    @Id
    private Long id;
    private String title;
    private String posterImage;
    private String description;
    private String videoUrl;
    @Enumerated(value = EnumType.STRING)
    private Status status;
    private LocalDate startDate;
    private LocalDate endDate;
}

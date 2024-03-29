/**
 * This code was COPIED from "com.c209.catalog" package.
 */
package com.c209.batchservice.domain.catalog.entity;

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
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean isMinted;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private Seller seller;
    @ManyToOne
    @JoinColumn(name = "singer_id")
    private Singer singer;
}

package com.c209.catalog.domain.performance.entity;

import com.c209.catalog.domain.company.entity.Company;
import com.c209.catalog.domain.hall.dto.HallDto;
import com.c209.catalog.domain.hall.entity.Hall;
import com.c209.catalog.domain.performance.dto.PerformanceDto;
import com.c209.catalog.domain.performance.dto.PerformanceSearchDto;
import com.c209.catalog.domain.performance.enums.Genre;
import com.c209.catalog.domain.performance.enums.ReservationType;
import com.c209.catalog.domain.performance.enums.Status;
import com.c209.catalog.domain.seller.entity.Seller;
import com.c209.catalog.domain.singer.entity.Singer;
import com.c209.catalog.global.common.BaseEntity;
import com.querydsl.core.annotations.QueryEntity;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.Date;

import static jakarta.persistence.GenerationType.IDENTITY;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Entity
@QueryEntity
public class Performance extends BaseEntity {
    @Id
    @GeneratedValue(strategy=IDENTITY)
    @Column(name="performance_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="company_id", nullable = false)
    private Company company;

    @Column
    private String title;

    @Column(name="poster_image")
    private String posterImage;

    @Column(columnDefinition="TEXT")
    private String description;

    @Column(name="description_image")
    private String descriptionImage;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Genre genre;

    @Column(name="video_url")
    private String videoUrl;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="singer_id", nullable = false)
    private Singer singer;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name="hall_id", nullable = false)
    private Hall hall;

    @Column(name="reservation_start_datetime")
    private LocalDateTime reservationStartDatetime;

    @Column(name="reservation_end_datetime")
    private LocalDateTime reservationEndDatetime;

    @Enumerated(value = EnumType.STRING)
    @Column(nullable = false)
    private Status status;

    @Enumerated(value = EnumType.STRING)
    @Column(name="reservation_type", nullable = false)
    private ReservationType reservationType;

    @Column(name="start_date")
    private Date startDate;

    @Column(name="end_date")
    private Date endDate;

    @Column(name="max_ticket_per_person")
    private Integer maxTicketPerPerson;

    @Column(name="is_adult_only", columnDefinition = "boolean default false")
    private Boolean isAdultOnly;

    @Setter
    @Column(columnDefinition = "integer default 0")
    private Integer view;

    @Column(name = "is_minted", columnDefinition = "boolean default false")
    private Boolean isMinted;

    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "seller_id")
    private Seller seller;

    @PrePersist
    @PreUpdate
    private void calculateStatus() {
        LocalDateTime now = LocalDateTime.now();

        if (now.isBefore(reservationStartDatetime)) {
            status = Status.before_sale;
        } else if (now.isAfter(reservationStartDatetime) && now.isBefore(reservationEndDatetime)) {
            status = Status.on_sale;
        } else {
            status = Status.after_sale;
        }
    }
}

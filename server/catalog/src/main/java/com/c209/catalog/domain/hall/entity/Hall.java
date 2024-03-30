package com.c209.catalog.domain.hall.entity;

import com.c209.catalog.domain.hall.dto.HallDto;
import com.c209.catalog.global.common.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import static jakarta.persistence.GenerationType.IDENTITY;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Entity
public class Hall extends BaseEntity {

    @GeneratedValue(strategy=IDENTITY)
    @Column(name="hall_id")
    @Id
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column
    private String telephone;

    @Column
    private String relate_url;

    @Column
    private Float latitude;

    @Column
    private Float longitude;

    @Column
    private String address;

    @Column
    private Boolean restaurant;

    @Column
    private Boolean cafe;

    @Column
    private Boolean convenience_store;

    @Column
    private Boolean play_room;

    @Column
    private Boolean suyu_room;

    @Column
    private Boolean barrier_park;

    @Column
    private Boolean barrier_rest;

    @Column
    private Boolean barrier_runw;

    @Column
    private Boolean barrier_elevator;

    @Column
    private Boolean parking_lot;

    @Column
    private Integer total_seat_count;

    @Column
    private String hall_webview_url;

    public HallDto toCache(){
        return HallDto.builder()
                .id(this.id)
                .address(this.address)
                .name(this.name)
                .build();
    }
}

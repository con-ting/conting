package com.c209.catalog.domain.hall.entity;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class HallTest {
    @Test
    @DisplayName("Hall Entity Test")
    void createHall(){
//        given
        Hall.HallBuilder builder = Hall.builder();
        builder.name("올림픽공원 뮤즈라이브");
        builder.telephone("02-410-1114");
        builder.relate_url("http://www.olympicpark.co.kr/");
        builder.latitude(37.52112F);
        builder.longitude(127.1283636F);
        builder.address("서울특별시 송파구 올림픽로 424 올림픽공원 (방이동)");
        builder.restaurant(true);
        builder.cafe(true);
        builder.convenience_store(true);
        builder.play_room(false);
        builder.suyu_room(false);
        builder.barrier_park(false);
        builder.barrier_rest(false);
        builder.barrier_runw(false);
        builder.barrier_elevator(false);
        builder.parking_lot(true);
        builder.total_seat_count(244);
        Hall hall = builder
                .build();

//        when, then
        Assertions.assertThat(hall.getName()).isEqualTo("올림픽공원 뮤즈라이브");
        Assertions.assertThat(hall.getTelephone()).isEqualTo("02-410-1114");
        Assertions.assertThat(hall.getRelate_url()).isEqualTo("http://www.olympicpark.co.kr/");
        Assertions.assertThat(hall.getLatitude()).isEqualTo(37.52112F);
        Assertions.assertThat(hall.getLongitude()).isEqualTo(127.1283636F);
        Assertions.assertThat(hall.getAddress()).isEqualTo("서울특별시 송파구 올림픽로 424 올림픽공원 (방이동)");
        Assertions.assertThat(hall.getRestaurant()).isEqualTo(true);
        Assertions.assertThat(hall.getCafe()).isEqualTo(true);
        Assertions.assertThat(hall.getConvenience_store()).isEqualTo(true);
        Assertions.assertThat(hall.getPlay_room()).isEqualTo(false);
        Assertions.assertThat(hall.getSuyu_room()).isEqualTo(false);
        Assertions.assertThat(hall.getBarrier_park()).isEqualTo(false);
        Assertions.assertThat(hall.getBarrier_rest()).isEqualTo(false);
        Assertions.assertThat(hall.getBarrier_runw()).isEqualTo(false);
        Assertions.assertThat(hall.getBarrier_elevator()).isEqualTo(false);
        Assertions.assertThat(hall.getParking_lot()).isEqualTo(true);
        Assertions.assertThat(hall.getTotal_seat_count()).isEqualTo(244);
    }
}
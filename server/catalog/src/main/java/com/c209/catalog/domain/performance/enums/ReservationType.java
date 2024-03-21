package com.c209.catalog.domain.performance.enums;

import lombok.Getter;

@Getter
public enum ReservationType {
    R("랜덤"),
    F("선착순");

    private final String selectReservationType;

    private ReservationType(String selectReservationType) {
        this.selectReservationType = selectReservationType;
    }

}

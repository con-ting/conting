package com.c209.catalog.domain.performance.enums;

import lombok.Getter;

@Getter
public enum Genre {
    BA("발라드"),
    RO("락/메탈"),
    RA("랩/힙합"),
    JA("재즈/소울"),
    FO("포크"),
    TR("트로트"),
    CO("내한"),
    IN("인디"),
    FE("페스티벌"),
    FA("팬클럽"),
    KP("케이팝");

    private final String selectGenre;

    private Genre(String selectGenre) {
        this.selectGenre = selectGenre;
    }
}

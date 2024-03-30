package com.c209.catalog.domain.performance.enums;

import lombok.Getter;

@Getter
public enum Genre {
    CO("내한"),
    FE("페스티벌"),
    FA("팬클럽"),
    KP("케이팝")
    MU("뮤지컬"),
    KO("국악"),
    CL("클래식"),
    DA("무용"),
    DR("연극"),
    CI("서커스/마술"),
    MI("복합");

    private final String selectGenre;

    private Genre(String selectGenre) {
        this.selectGenre = selectGenre;
    }
}

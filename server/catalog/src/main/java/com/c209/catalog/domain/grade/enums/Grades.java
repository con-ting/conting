package com.c209.catalog.domain.grade.enums;

import lombok.Getter;

@Getter
public enum Grades {
    P("President"),
    VIP("VIP"), // Very Important Person
    R("R"), // Royal
    S("S"), // Special
    A("A"),
    B("B"),
    C("C")
    STAND("STAND");


    private final String selectGrade;

    private Grades(String selectGrade) {
        this.selectGrade = selectGrade;
    }
}

package com.c209.catalog.domain.performance.enums;

import lombok.Getter;
import org.hibernate.sql.ast.tree.select.SelectStatement;

@Getter
public enum Status {
    OnSale("판매중"),
    BeforeSale("판매전"),
    AfterSale("판매마감");

    private final String selectStatus;

    private Status(String selectStatus) {
        this.selectStatus = selectStatus;
    }
}

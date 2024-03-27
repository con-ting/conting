/**
 * This code was COPIED from "com.c209.catalog" package.
 */
package com.c209.batchservice.domain.catalog.enums;

import lombok.Getter;

@Getter
public enum Status {
    on_sale("판매중"),
    before_sale("판매전"),
    after_sale("판매마감");

    private final String selectStatus;

    Status(String selectStatus) {
        this.selectStatus = selectStatus;
    }
}

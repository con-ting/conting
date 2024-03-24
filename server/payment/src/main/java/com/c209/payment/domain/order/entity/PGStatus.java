package com.c209.payment.domain.order.entity;

public enum PGStatus {

    CREATE,
    AUTH_SUCCESS,
    AUTH_FAIL,
    AUTH_INVALID,
    CAPTURE_REQUEST,
    CAPTURE_ENTRY,
    CAPTURE_SUCCESS,
    CAPTURE_FAIL
}

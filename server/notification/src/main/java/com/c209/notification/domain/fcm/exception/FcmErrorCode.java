package com.c209.notification.domain.fcm.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;


@Getter
public enum FcmErrorCode {

    CAN_NOT_SEND_NOTIFICATION(HttpStatus.INTERNAL_SERVER_ERROR, "fcm 서버 통신 장애 상태입니다.");
    private HttpStatus httpStatus;
    private String message;

    FcmErrorCode(HttpStatus httpStatus, String message) {
        this.httpStatus = httpStatus;
        this.message = message;
    }
}

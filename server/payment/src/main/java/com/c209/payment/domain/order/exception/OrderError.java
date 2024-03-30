package com.c209.payment.domain.order.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;


@Getter
public enum OrderError {

    NOT_AVAILABLE_SEAT("좌석이 이미 예매되었습니다.", HttpStatus.BAD_REQUEST),
    NOT_EXIST_SEAT("해당 좌석은 존재하지 않습니다.", HttpStatus.BAD_REQUEST),
    NOT_EXIST_PG_ORDER_ID("일치하는 주문 내역이 존재하지 않습니다.", HttpStatus.BAD_REQUEST),
    NOT_EXIST_MERCHANT_UID("일치하는 merchant_uid가 존재하지 않습니다.", HttpStatus.BAD_REQUEST),
    CONFLICT_PG_ORDER_ID("pg order id가 중복됩니다.", HttpStatus.CONFLICT);

    String message;
    HttpStatus httpStatus;

    OrderError(String message, HttpStatus httpStatus){
        this.message = message;
        this.httpStatus = httpStatus;
    }

}

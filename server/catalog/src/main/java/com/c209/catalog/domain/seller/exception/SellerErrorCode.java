package com.c209.catalog.domain.seller.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Getter
@AllArgsConstructor
public enum SellerErrorCode {
    NOT_SELLER("판매자 권한이 없습니다.", BAD_REQUEST);

    private final String message;
    private final HttpStatus httpStatus;
}

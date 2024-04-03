package com.c209.catalog.domain.seller.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Getter
@AllArgsConstructor
public enum SellerErrorCode {
    NOT_SELLER("seller_id를 잘못 보냈습니다.", BAD_REQUEST);

    private final String message;
    private final HttpStatus httpStatus;
}


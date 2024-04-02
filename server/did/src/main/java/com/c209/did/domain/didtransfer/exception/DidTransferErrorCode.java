package com.c209.did.domain.didtransfer.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum DidTransferErrorCode {
    NOT_MATCH_USER_OWNER_ID("유저 정보와 소유자 ID가 일치하지 않습니다.", HttpStatus.BAD_REQUEST),
    NOT_MATCH_DID_OWNER_ID("DID 인증 정보와 소유자 ID가 일치하지 않습니다.", HttpStatus.BAD_REQUEST),
    NOT_MATCH_DID_BUYER_ID("DID 인증 정보와 구매자 ID가 일치하지 않습니다.", HttpStatus.BAD_REQUEST),
    NOT_FOUND_DID_ACCOUNT("해당하는 DID 인증 정보를 찾을 수 없습니다", HttpStatus.NOT_FOUND),
    NOT_FOUND_DID_TRANSFER("해당하는 예매 양도 정보를 찾을 수 없습니다", HttpStatus.NOT_FOUND);

    private final String message;
    private final HttpStatus httpStatus;
}

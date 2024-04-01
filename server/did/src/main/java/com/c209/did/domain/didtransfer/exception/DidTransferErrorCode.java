package com.c209.did.domain.didtransfer.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum DidTransferErrorCode {
    BAD_REQUEST_DID_OWNER_ID("DID 소유자 ID가 잘못되었습니다", HttpStatus.BAD_REQUEST),
    NOT_FOUND_DID_ACCOUNT("해당하는 DID 인증 정보를 찾을 수 없습니다", HttpStatus.NOT_FOUND);

    private final String message;
    private final HttpStatus httpStatus;
}

package com.c209.ticket.domain.ticket.exception;


import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum QRErrorCode {

    QR_INVALID_ERROR("QR 코드가 유효하지 않습니다.",HttpStatus.FORBIDDEN),
    QR_EXPIRED_ERROR("QR의 네트워크 차단이 감지되었습니다.", HttpStatus.FORBIDDEN);


    private final String message;
    private final HttpStatus httpStatus;




}

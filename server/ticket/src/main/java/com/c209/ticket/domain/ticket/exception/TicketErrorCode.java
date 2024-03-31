package com.c209.ticket.domain.ticket.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum TicketErrorCode {

    TICKET_NOT_FOUND("존재하지 않는 티켓입니다.", HttpStatus.NOT_FOUND),
    TICKET_UNOWNED("해당 티켓의 소유권이 유효하지 않습니다.", HttpStatus.FORBIDDEN),
    TICKET_ALREADY_USED("티켓이 이미 사용되었습니다.", HttpStatus.FORBIDDEN),
    TICKET_NOT_MATCHED_FINGER_PRINT("등록된 지문이 올바르지 않습니다.", HttpStatus.FORBIDDEN);


    private final String message;
    private final HttpStatus httpStatus;
}

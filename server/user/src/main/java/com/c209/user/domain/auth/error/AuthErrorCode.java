package com.c209.user.domain.auth.error;


import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum AuthErrorCode {

    DUPLICATE_EMAIL_ERROR("이미 가입한 이메일이 존재합니다.",HttpStatus.CONFLICT),
    DUPLICATE_FCM_ERROR("이미 가입한 기기가 존재합니다.",HttpStatus.CONFLICT),
    NOT_FOUND_RANDOM_NUMBER("인증 번호를 다시 요청해주세요", HttpStatus.BAD_REQUEST),
    NOT_MATCHED_RANDOM_NUMBER("인증 번호가 일치하지 않습니다.", HttpStatus.BAD_REQUEST);



    private final String message;
    private final HttpStatus httpStatus;



}

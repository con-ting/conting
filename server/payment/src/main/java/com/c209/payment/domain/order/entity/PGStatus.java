package com.c209.payment.domain.order.entity;

public enum PGStatus {


    // 포트원 서버와 연계하여 db상 결제 내역과 포트원 서버 결제 내역과 일치함
    AUTH_SUCCESS,
    //auth과정에서 DB 내역과 아이엠포트 서버의 실제 결제 내역이 일치하지 않음
    AUTH_INVALID,

    //단순히 DB에 생성된 상태
    CAPTURE_REQUEST,
    CAPTURE_ENTRY,
    CAPTURE_SUCCESS,

    //포트원 서버와의 통신이 실패한 경우 2회 미만이라 아직 재 통신이 가능한 경우

    CAPTURE_RETRY,
    //포트원 서버와의 통신이 실패한 경우 3회 이상이라 재요청을 보내지 않는 경우
    CAPTURE_FAIL
}

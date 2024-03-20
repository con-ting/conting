package com.c209.catalog.global.exception;

import com.c209.catalog.domain.hall.exception.HallErrorCode;

public class HallException extends CommonException {

    public HallException(HallErrorCode hallErrorCode) {
        super(hallErrorCode.getMessage(), hallErrorCode.getHttpStatus());
    }
}

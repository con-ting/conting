package com.c209.user.domain.auth.data.dto.request;

import lombok.Getter;


public record LoginRequest(
        String email,
        String password

) {

}

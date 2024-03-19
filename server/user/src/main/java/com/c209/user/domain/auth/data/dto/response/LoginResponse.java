package com.c209.user.domain.auth.data.dto.response;


import com.c209.user.domain.auth.data.dto.TokenDto;
import com.c209.user.domain.user.data.dto.UserDto;
import lombok.Builder;

@Builder
public record LoginResponse(
        TokenDto token,
        UserDto user

) {


}

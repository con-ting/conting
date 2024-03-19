package com.c209.user.domain.auth.service;

import com.c209.user.domain.auth.data.dto.TokenDto;
import com.c209.user.domain.auth.data.dto.request.JoinUserRequest;
import com.c209.user.domain.auth.data.dto.request.LoginRequest;
import com.c209.user.domain.auth.data.dto.request.TokenRefreshRequest;
import com.c209.user.domain.auth.data.dto.request.VerificationSendRequest;
import com.c209.user.domain.auth.data.dto.response.LoginResponse;

public interface AuthService {

    public Long registryUser(JoinUserRequest request);

    public boolean sendMessage(VerificationSendRequest request);


    public boolean verify(String randomNumber, String fcm);

    LoginResponse login(LoginRequest request);

    TokenDto refresh(TokenRefreshRequest request);
}

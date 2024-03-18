package com.c209.user.domain.auth.service;

import com.c209.user.domain.auth.data.dto.request.JoinUserRequest;
import com.c209.user.domain.auth.data.dto.request.VerificationSendRequest;

public interface AuthService {

    public Long registryUser(JoinUserRequest request);

    public boolean sendMessage(VerificationSendRequest request);


    public boolean verify(String randomNumber, String fcm);
}

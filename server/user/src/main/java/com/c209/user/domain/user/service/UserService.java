package com.c209.user.domain.user.service;

import com.c209.user.domain.auth.data.dto.request.JoinUserRequest;

public interface UserService {

    public Long registerUser(JoinUserRequest request);



}

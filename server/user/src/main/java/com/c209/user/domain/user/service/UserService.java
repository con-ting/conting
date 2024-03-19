package com.c209.user.domain.user.service;

import com.c209.user.domain.auth.data.dto.request.JoinUserRequest;
import com.c209.user.domain.user.data.dto.UserDto;

public interface UserService  {


    public UserDto getUserDetailsByEmail(String userName);

    public UserDto getUserDetailsById(Long userId);

}

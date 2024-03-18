package com.c209.user.domain.user.service.impl;

import com.c209.user.domain.auth.data.dto.request.JoinUserRequest;
import com.c209.user.domain.user.repository.UserRepository;
import com.c209.user.domain.user.service.UserService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;



@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Override
    public Long registerUser(JoinUserRequest request) {


        return null;
    }
}

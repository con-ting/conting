package com.c209.user.domain.user.service.impl;

import com.c209.user.domain.auth.data.dto.request.JoinUserRequest;
import com.c209.user.domain.user.data.dto.UserDto;
import com.c209.user.domain.user.data.entity.UserEntity;
import com.c209.user.domain.user.exception.UserErrorCode;
import com.c209.user.domain.user.repository.UserRepository;
import com.c209.user.domain.user.service.UserService;
import com.c209.user.global.error.CommonException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;


@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;


    @Override
    public UserDto getUserDetailsByEmail(String email) {
        return userRepository.findByEmail(email).orElseThrow(()-> new CommonException(UserErrorCode.NOT_FOUND_USER)).toDto();
    }

    @Override
    public UserDto getUserDetailsById(Long userId) {
        UserEntity user = userRepository.findById(userId).orElseThrow(()-> new CommonException(UserErrorCode.NOT_FOUND_USER));

        return UserDto
                .builder()
                .id(user.getId())
                .email(user.getEmail())
                .wallet(user.getWallet())
                .build();
    }

    @Override
    @Transactional
    public UserDto changeMyInfo(UserDto request, Long userId) {
        UserEntity user = userRepository.findById(userId).orElseThrow(()-> new CommonException(UserErrorCode.NOT_FOUND_USER));

        if(request.getWallet()!=null){
            user.setWallet(request.getWallet());
        }

        if(request.getFcmToken()!=null){
            user.setFcmToken(request.getFcmToken());
        }
        
        userRepository.save(user);

        return UserDto
                .builder()
                .id(user.getId())
                .email(user.getEmail())
                .fcmToken(user.getFcmToken())
                .wallet(user.getWallet())
                .build();
    }


}

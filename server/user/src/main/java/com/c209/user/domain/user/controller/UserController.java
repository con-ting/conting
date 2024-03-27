package com.c209.user.domain.user.controller;

import com.c209.user.domain.user.data.dto.UserDto;
import com.c209.user.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
@Slf4j
public class UserController {


    private final UserService userService;

    @GetMapping("/health_check")
    public ResponseEntity<String> checkStatus(){
        return ResponseEntity.ok("ok");
    }


    @GetMapping("/my")
    public ResponseEntity<UserDto> my(
            @RequestHeader("X-Authorization-Id")Long userId
    ){
        log.debug("내 프로필 조회 : id");
        return ResponseEntity.ok(userService.getUserDetailsById(userId));
    }



    @PutMapping()
    public ResponseEntity<UserDto> changeMyInfo(
            @RequestBody UserDto request,
            @RequestHeader("X-Authorization-Id")Long userId
    ){
        return ResponseEntity.ok(userService.changeMyInfo(request, userId));
    }





}

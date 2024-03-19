package com.c209.user.domain.user.controller;

import com.c209.user.domain.user.data.dto.UserDto;
import com.c209.user.domain.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {


    private final UserService userService;

    @GetMapping("/health_check")
    public ResponseEntity<String> checkStatus(){
        return ResponseEntity.ok("ok");
    }


    @GetMapping("/my")
    public ResponseEntity<UserDto> my(
            @RequestHeader("X_Authorization")Long userId
    ){
        return ResponseEntity.ok(userService.getUserDetailsById(userId));
    }






}

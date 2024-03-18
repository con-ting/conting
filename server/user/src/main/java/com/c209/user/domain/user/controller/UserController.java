package com.c209.user.domain.user.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {


    @GetMapping("/health_check")
    public ResponseEntity<String> checkStatus(){
        return ResponseEntity.ok("ok");
    }







}

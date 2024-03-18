package com.c209.user.domain.auth.controller;


import com.c209.user.domain.auth.data.dto.request.VerificationSendRequest;
import com.c209.user.domain.auth.data.dto.request.JoinUserRequest;
import com.c209.user.domain.auth.data.dto.response.JoinResponse;
import com.c209.user.domain.auth.data.dto.response.VerificationResponse;
import com.c209.user.domain.auth.data.dto.response.VerificationSendResponse;
import com.c209.user.domain.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {


    private final AuthService authService;


    @PostMapping("/join")
    public ResponseEntity<JoinResponse> joinUser(@RequestBody JoinUserRequest request){
        Long createdId = authService.registryUser(request);
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        JoinResponse
                                .builder()
                                .userID(createdId)
                                .build()
                );
    }


    //UUID 등록 테이블
    @PostMapping("/message")
    public ResponseEntity<VerificationSendResponse> sendVerificationMessage(@RequestBody VerificationSendRequest request){
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(
                        VerificationSendResponse
                                .builder()
                                .sendResult(authService.sendMessage(request))
                                .build()
                );
    }
        //레디스에 접속
        //레디스에


    @GetMapping("/verification")
    public ResponseEntity<VerificationResponse> verification(
            @RequestParam String randomNumber,
            @RequestParam String fcm
    ){

        return ResponseEntity
                .ok(
                    VerificationResponse
                            .builder()
                            .verificationResult(authService.verify(randomNumber, fcm))
                            .build()
        );
    }
}

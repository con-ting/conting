package com.c209.user.domain.auth.controller;


import com.c209.user.domain.auth.data.dto.TokenDto;
import com.c209.user.domain.auth.data.dto.request.LoginRequest;
import com.c209.user.domain.auth.data.dto.request.TokenRefreshRequest;
import com.c209.user.domain.auth.data.dto.request.VerificationSendRequest;
import com.c209.user.domain.auth.data.dto.request.JoinUserRequest;
import com.c209.user.domain.auth.data.dto.response.JoinResponse;
import com.c209.user.domain.auth.data.dto.response.LoginResponse;
import com.c209.user.domain.auth.data.dto.response.VerificationResponse;
import com.c209.user.domain.auth.data.dto.response.VerificationSendResponse;
import com.c209.user.domain.auth.service.AuthService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {


    private final AuthService authService;


    @PostMapping("/join")
    public ResponseEntity<JoinResponse> joinUser(@RequestBody JoinUserRequest request){
        Long createdId = authService.registryUser(request);
        log.debug("회원 가입 요청");
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

        log.debug("메시지 발송 요청");
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
        log.debug("인증번호 검증 요청 :: {}, {}", randomNumber, fcm);

        return ResponseEntity
                .ok(
                    VerificationResponse
                            .builder()
                            .verificationResult(authService.verify(randomNumber, fcm))
                            .build()
        );
    }


    @GetMapping("/login")
    public ResponseEntity<LoginResponse> login(
            @RequestBody LoginRequest request
    ){

        log.debug("로그인 요청");
        return ResponseEntity.ok().body(authService.login(request));
    }


    @PostMapping("/refresh")
    public ResponseEntity<TokenDto> refresh(@RequestBody TokenRefreshRequest request){
        return ResponseEntity.ok().body(authService.refresh(request));
    }

}

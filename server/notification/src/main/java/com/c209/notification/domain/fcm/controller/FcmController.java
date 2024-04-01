package com.c209.notification.domain.fcm.controller;

import com.c209.notification.domain.fcm.dto.request.SendFcmMessageRequest;
import com.c209.notification.domain.fcm.dto.response.FcmSendResponse;
import com.c209.notification.domain.fcm.service.FcmService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/fcm")
@RequiredArgsConstructor
public class FcmController {

    private final FcmService fcmService;

    @PostMapping("/send")
    public Mono<ResponseEntity<FcmSendResponse>> send(@RequestBody SendFcmMessageRequest request){
        return fcmService.sendMessage(request.title(), request.body(), request.receiverId())
                .map(FcmSendResponse::new)
                .map(ResponseEntity::ok);
    }

}

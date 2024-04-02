package com.c209.ticket.global.api;


import com.c209.ticket.global.api.dto.FcmRequest;
import com.c209.ticket.global.api.dto.FcmResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name="Notification-Service", url="http://3.36.52.191:8886")
public interface NotificationClient {

    @PostMapping("/fcm/send")
    FcmResponse sendFcm(@RequestBody FcmRequest request);
}

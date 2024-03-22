package com.c209.notification.domain.fcm.dto.request;

public record SendFcmMessageRequest(
        String title,
        String body,
        String token

) {
}

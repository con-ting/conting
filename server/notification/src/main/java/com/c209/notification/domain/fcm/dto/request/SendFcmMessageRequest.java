package com.c209.notification.domain.fcm.dto.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record SendFcmMessageRequest(
        Long receiverId,
        String title,
        String body

) {
}

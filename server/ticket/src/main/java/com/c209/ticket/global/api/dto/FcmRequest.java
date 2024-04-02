package com.c209.ticket.global.api.dto;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;

@Builder
public record FcmRequest (
    Long receiver_id,
    String title,
    String body
){

}

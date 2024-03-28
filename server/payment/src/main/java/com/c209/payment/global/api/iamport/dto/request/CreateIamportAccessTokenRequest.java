package com.c209.payment.global.api.iamport.dto.request;

import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.Builder;
import org.springframework.beans.factory.annotation.Value;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
public record CreateIamportAccessTokenRequest(
        String impKey,
        String impSecret

)
{


}

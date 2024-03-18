package com.c209.user.domain.auth.data.dto.request;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public record VerificationSendRequest(
        @NotBlank
        String fcm,
        @NotBlank

        String phone_number
) {
}

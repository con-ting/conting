package com.c209.user.domain.auth.data.dto.request;





import com.c209.user.domain.user.data.entity.UserEntity;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Past;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;

public record JoinUserRequest(

        @NotBlank
        @Pattern(regexp = "^[a-zA-Z0-9가-힣]{2,20}$", message="한글/영문/숫자로만 구성된 2~20자 이내의 닉네임을 사용해주세요")
        String name,

        @NotBlank
        @Email(message="유효한 이메일을 사용해주세요")
        String email,

        @NotBlank
        String password,

        @NotBlank
        @Past
        LocalDate birthday,

        @NotBlank
        String fcm,

        @NotBlank
        String wallet

){
        public UserEntity toEntity(String encodedPassword){
                return UserEntity.builder()
                        .name(name)
                        .email(email)
                        .password(encodedPassword)
                        .birthDate(birthday)
                        .fcmToken(fcm)
                        .wallet(wallet)
                        .build();
        }
}

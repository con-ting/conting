package com.c209.user.global.infra.coolsms;

import lombok.extern.slf4j.Slf4j;
import net.nurigo.sdk.NurigoApp;
import net.nurigo.sdk.message.service.DefaultMessageService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class CoolSmsConfig {

    @Value("${cool.sms.apikey}")
    private String API_KEY;

    @Value("${cool.sms.secret}")
    private String SECRET_KEY;


    @Bean
    public DefaultMessageService defaultMessageService(){
        return NurigoApp.INSTANCE.initialize(API_KEY, SECRET_KEY, "https://api.coolsms.co.kr");
    }

}

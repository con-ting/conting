package com.c209.ticket.global.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.context.annotation.Import;

import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.r2dbc.config.EnableR2dbcAuditing;
import org.springframework.data.r2dbc.repository.config.EnableR2dbcRepositories;
import org.springframework.r2dbc.core.DatabaseClient;
import org.springframework.stereotype.Component;

@Component
@EnableJpaRepositories("com.c209.ticket.domain.ticket.repository.sync")
@EnableR2dbcRepositories("com.c209.ticket.domain.ticket.repository.async")
@EnableR2dbcAuditing
@Import(DataSourceAutoConfiguration.class)
@RequiredArgsConstructor
@Slf4j
public class R2dbcConfig implements ApplicationListener<ApplicationReadyEvent> {

    private final DatabaseClient databaseClient;

    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        databaseClient.sql("SELECT 1").fetch().one()
                .subscribe(
                        success->{
                            log.info("R2DBC DB 설정 완료");
                        },
                        error->{

                            log.error("R2DBC DB 설정 실패");
                            log.error(error.getMessage());
                            //R2DBC DB 설정 실패시 스프링 종료
                            SpringApplication.exit(event.getApplicationContext(), ()->110);
                        }
                );
    }
}

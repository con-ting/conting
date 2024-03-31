package com.c209.batchservice.global.config;

import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class SeatDataSourceConfig {
    @Bean
    @ConfigurationProperties("spring.datasource.seat")
    public DataSourceProperties seatDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean
    @ConfigurationProperties("spring.datasource.seat.hikari")
    public DataSource seatDataSource() {
        return seatDataSourceProperties()
                .initializeDataSourceBuilder()
                .build();
    }
}

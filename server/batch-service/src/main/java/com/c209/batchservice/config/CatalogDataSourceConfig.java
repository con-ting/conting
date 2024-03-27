package com.c209.batchservice.config;

import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;

@Configuration
public class CatalogDataSourceConfig {
    @Bean
    @ConfigurationProperties("spring.datasource.catalog")
    public DataSourceProperties catalogDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean
    @ConfigurationProperties("spring.datasource.catalog.hikari")
    public DataSource catalogDataSource() {
        return catalogDataSourceProperties()
                .initializeDataSourceBuilder()
                .build();
    }
}

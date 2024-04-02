package com.c209.batchservice.global.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.jdbc.DataSourceProperties;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateProperties;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateSettings;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.Objects;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
        basePackages = "com.c209.batchservice.domain.payment.repository",
        entityManagerFactoryRef = "paymentEntityManagerFactory",
        transactionManagerRef = "paymentTransactionManager")
public class PaymentDataSourceConfig {
    @Bean
    @ConfigurationProperties("spring.datasource.payment")
    public DataSourceProperties paymentDataSourceProperties() {
        return new DataSourceProperties();
    }

    @Bean
    @ConfigurationProperties("spring.datasource.payment.hikari")
    public DataSource paymentDataSource() {
        return paymentDataSourceProperties()
                .initializeDataSourceBuilder()
                .build();
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean paymentEntityManagerFactory(
            final @Qualifier("paymentDataSource") DataSource paymentDataSource,
            final EntityManagerFactoryBuilder builder,
            final JpaProperties jpaProperties,
            final HibernateProperties hibernateProperties
    ) {
        return builder
                .dataSource(paymentDataSource)
                .packages("com.c209.batchservice.domain.payment.entity")
                .persistenceUnit("paymentEntityManager")
                .properties(hibernateProperties.determineHibernateProperties(jpaProperties.getProperties(), new HibernateSettings()))
                .build();
    }

    @Bean
    public PlatformTransactionManager paymentTransactionManager(
            final @Qualifier("paymentEntityManagerFactory") LocalContainerEntityManagerFactoryBean paymentEntityManagerFactory
    ) {
        return new JpaTransactionManager(Objects.requireNonNull(paymentEntityManagerFactory.getObject()));
    }
}

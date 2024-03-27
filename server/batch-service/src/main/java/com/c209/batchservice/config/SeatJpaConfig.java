package com.c209.batchservice.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateProperties;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateSettings;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
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
        basePackages = "com.c209.batchservice.domain.seat.repository",
        entityManagerFactoryRef = "seatEntityManagerFactory",
        transactionManagerRef = "seatTransactionManager"
)
public class SeatJpaConfig {
    @Bean
    public LocalContainerEntityManagerFactoryBean seatEntityManagerFactory(
            final @Qualifier("seatDataSource") DataSource seatDataSource,
            final EntityManagerFactoryBuilder builder,
            final JpaProperties jpaProperties,
            final HibernateProperties hibernateProperties
    ) {
        return builder
                .dataSource(seatDataSource)
                .packages("com.c209.batchservice.domain.seat.entity")
                .persistenceUnit("seatEntityManager")
                .properties(hibernateProperties.determineHibernateProperties(jpaProperties.getProperties(), new HibernateSettings()))
                .build();
    }

    @Bean
    public PlatformTransactionManager seatTransactionManager(
            final @Qualifier("seatEntityManagerFactory") LocalContainerEntityManagerFactoryBean seatEntityManagerFactory
    ) {
        return new JpaTransactionManager(Objects.requireNonNull(seatEntityManagerFactory.getObject()));
    }
}

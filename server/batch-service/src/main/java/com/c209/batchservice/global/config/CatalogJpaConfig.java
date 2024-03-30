package com.c209.batchservice.global.config;

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
        basePackages = "com.c209.batchservice.domain.catalog.repository",
        entityManagerFactoryRef = "catalogEntityManagerFactory",
        transactionManagerRef = "catalogTransactionManager"
)
public class CatalogJpaConfig {
    @Bean
    public LocalContainerEntityManagerFactoryBean catalogEntityManagerFactory(
            final @Qualifier("catalogDataSource") DataSource catalogDataSource,
            final EntityManagerFactoryBuilder builder,
            final JpaProperties jpaProperties,
            final HibernateProperties hibernateProperties

    ) {
        return builder
                .dataSource(catalogDataSource)
                .packages("com.c209.batchservice.domain.catalog.entity")
                .persistenceUnit("catalogEntityManager")
                .properties(hibernateProperties.determineHibernateProperties(jpaProperties.getProperties(), new HibernateSettings()))
                .build();
    }

    @Bean
    public PlatformTransactionManager catalogTransactionManager(
            final @Qualifier("catalogEntityManagerFactory") LocalContainerEntityManagerFactoryBean catalogEntityManagerFactory
    ) {
        return new JpaTransactionManager(Objects.requireNonNull(catalogEntityManagerFactory.getObject()));
    }
}

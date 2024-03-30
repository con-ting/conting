package com.c209.batchservice.global.config;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.autoconfigure.batch.BatchDataSource;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateProperties;
import org.springframework.boot.autoconfigure.orm.jpa.HibernateSettings;
import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseBuilder;
import org.springframework.jdbc.datasource.embedded.EmbeddedDatabaseType;
import org.springframework.jdbc.support.JdbcTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;

@Configuration
@EnableTransactionManagement
public class BatchDataSourceConfig {
    @Bean
    @Primary
    @BatchDataSource
    public DataSource batchDataSource() {
        return new EmbeddedDatabaseBuilder()
                .addScript("/org/springframework/batch/core/schema-drop-h2.sql")
                .addScript("/org/springframework/batch/core/schema-h2.sql")
                .setType(EmbeddedDatabaseType.H2)
                .build();
    }

    @Bean
    @Primary
    public PlatformTransactionManager batchTransactionManager(
            final @Qualifier("batchDataSource") DataSource batchDataSource
    ) {
        return new JdbcTransactionManager(batchDataSource);
    }

    @Bean
    @Primary
    public LocalContainerEntityManagerFactoryBean batchEntityManagerFactory(
            final @Qualifier("batchDataSource") DataSource batchDataSource,
            final EntityManagerFactoryBuilder builder,
            final JpaProperties jpaProperties,
            final HibernateProperties hibernateProperties
    ) {
        return builder
                .dataSource(batchDataSource)
                .packages("com.c209.batchservice.batch.entity")
                .persistenceUnit("batchEntityManager")
                .properties(hibernateProperties.determineHibernateProperties(jpaProperties.getProperties(), new HibernateSettings()))
                .build();
    }
}

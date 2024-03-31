package com.c209.batchservice.batch.payment;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PaymentJobConfig {
    @Bean
    public Job paymentJob(
            final JobRepository jobRepository
    ) {
        return null;
    }
}

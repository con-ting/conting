package com.c209.batchservice.batch.payment;

import com.c209.batchservice.batch.common.JsonConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class PaymentJobConfig {
    public static final String PAYMENT_DIR = "data/payment";
    private final JobRepository jobRepository;
    private final @Qualifier("paymentStep") Step paymentStep;

    @Bean
    public JsonConfig paymentJsonConfig() {
        return new JsonConfig(PAYMENT_DIR);
    }

    @Bean
    public Job paymentJob() {
        return new JobBuilder("paymentJob", jobRepository)
                .start(paymentStep)
                .build();
    }
}

package com.c209.batchservice.batch.payment.step;

import com.c209.batchservice.batch.common.JsonConfig;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class PaymentStepConfig {
    private final JobRepository jobRepository;
    private final PlatformTransactionManager batchTransactionManager;
    private final @Qualifier("paymentJsonConfig") JsonConfig jsonConfig;

    @Bean
    public Step paymentStep() {
        return new StepBuilder("paymentStep", jobRepository)
                .chunk(100, batchTransactionManager)
                .build();
    }
}

package com.c209.batchservice.batch.nft;

import com.c209.batchservice.batch.nft.processor.NftCreateMediaProcessor;
import com.c209.batchservice.domain.catalog.entity.Performance;
import jakarta.persistence.EntityManagerFactory;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.database.JpaPagingItemReader;
import org.springframework.batch.item.database.builder.JpaPagingItemReaderBuilder;
import org.springframework.batch.item.support.ListItemWriter;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
//@EnableBatchProcessing(dataSourceRef = "batchDataSource", transactionManagerRef = "batchTransactionManager")
@RequiredArgsConstructor
@Slf4j
public class NftBatchConfig {
    @Qualifier("catalogEntityManagerFactory")
    private final EntityManagerFactory catalogEntityManagerFactory;

    @Bean
    public Job nftJob(
            JobRepository jobRepository,
            Step step
    ) {
        return new JobBuilder("nftJob", jobRepository)
                .start(step)
                .build();
    }

    @Bean
    public Step Step1(
            JobRepository jobRepository,
            PlatformTransactionManager batchTransactionManager,
            NftCreateMediaProcessor nftCreateMediaProcessor
    ) {
        return new StepBuilder("nftMintStep", jobRepository)
                .<Performance, Performance>chunk(100, batchTransactionManager)
                .reader(nftCreateMediaReader())
                .processor(nftCreateMediaProcessor)
                .writer(nftCreateMediaWriter())
                .build();
    }

    @Bean
    public JpaPagingItemReader<Performance> nftCreateMediaReader() {
        return new JpaPagingItemReaderBuilder<Performance>()
                .name("nftCreateMediaReader")
                .entityManagerFactory(catalogEntityManagerFactory)
                .queryString("select p from Performance p")
//                .pageSize(100)
                .build();
    }

    @Bean
    public ListItemWriter<Performance> nftCreateMediaWriter() {
        return new ListItemWriter<>();
    }

}

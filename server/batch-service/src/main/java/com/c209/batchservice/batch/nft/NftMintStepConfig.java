package com.c209.batchservice.batch.nft;

import com.c209.batchservice.batch.nft.dto.PerformanceAndMetadataDto;
import com.c209.batchservice.batch.nft.dto.SeatAndScheduleAndMetadataDto;
import com.c209.batchservice.batch.nft.dto.request.AssetRequest;
import com.c209.batchservice.batch.nft.dto.request.CollectionRequest;
import com.c209.batchservice.global.web3.Web3Service;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.StepExecution;
import org.springframework.batch.core.annotation.BeforeStep;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.core.step.builder.StepBuilder;
import org.springframework.batch.item.ExecutionContext;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.PlatformTransactionManager;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class NftMintStepConfig {
    private final JobRepository jobRepository;
    private final PlatformTransactionManager batchTransactionManager;
    private final Web3Service web3Service;

    @Bean
    public Step mintCollectionStep() {
        return new StepBuilder("mintCollectionStep", jobRepository)
                .<PerformanceAndMetadataDto, String>chunk(100, batchTransactionManager)
                .reader(NftBatchConfig.createJsonItemReader(PerformanceAndMetadataDto.class))
                .processor(mintCollectionProcessor())
                .writer(NftBatchConfig.createJsonFileItemWriter(String.class))
                .build();
    }

    @Bean
    @StepScope
    public ItemProcessor<PerformanceAndMetadataDto, String> mintCollectionProcessor() {
        return new ItemProcessor<PerformanceAndMetadataDto, String>() {
            private ExecutionContext executionContext;

            @BeforeStep
            public void beforeStep(StepExecution stepExecution) {
                this.executionContext = stepExecution.getJobExecution().getExecutionContext();
            }

            @Override
            public String process(PerformanceAndMetadataDto dto) {
                String collectionMint = web3Service.createCollection(CollectionRequest.builder()
                                .name(dto.jsonMetadata().name())
                                .symbol(dto.jsonMetadata().symbol())
                                .uri(dto.jsonMetadata().externalUrl())
                                .sellerFeeBasisPoints(dto.jsonMetadata().sellerFeeBasisPoints())
                                .agency(dto.performance().seller().wallet())
                                .singer(dto.performance().singer().wallet())
                                .build())
                        .collectionMint();
                executionContext.putString("collectionMint_" + dto.performance().id(), collectionMint);
                return collectionMint;
            }
        };
    }

    @Bean
    public Step mintAssetStep() {
        return new StepBuilder("mintAssetStep", jobRepository)
                .<SeatAndScheduleAndMetadataDto, String>chunk(100, batchTransactionManager)
                .reader(NftBatchConfig.createJsonItemReader(SeatAndScheduleAndMetadataDto.class))
                .processor(mintAssetMintProcessor())
                .writer(NftBatchConfig.createJsonFileItemWriter(String.class))
                .build();
    }

    @Bean
    @StepScope
    public ItemProcessor<SeatAndScheduleAndMetadataDto, String> mintAssetMintProcessor() {
        return new ItemProcessor<SeatAndScheduleAndMetadataDto, String>() {
            private ExecutionContext executionContext;

            @BeforeStep
            public void beforeStep(StepExecution stepExecution) {
                this.executionContext = stepExecution.getJobExecution().getExecutionContext();
            }

            @Override
            public String process(SeatAndScheduleAndMetadataDto dto) {
                String collectionMint = executionContext.getString("collectionMint_" + dto.schedule().performance().id());
                return web3Service.createAsset(AssetRequest.builder()
                                .name(dto.jsonMetadata().name())
                                .symbol(dto.jsonMetadata().symbol())
                                .uri(dto.jsonMetadata().externalUrl())
                                .sellerFeeBasisPoints(dto.jsonMetadata().sellerFeeBasisPoints())
                                .agency(dto.schedule().performance().seller().wallet())
                                .singer(dto.schedule().performance().singer().wallet())
                                .collectionMint(collectionMint)
                                .build())
                        .mint();
            }
        };
    }
}

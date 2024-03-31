package com.c209.batchservice.batch.nft;

import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.configuration.annotation.StepScope;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.batch.item.json.JacksonJsonObjectMarshaller;
import org.springframework.batch.item.json.JacksonJsonObjectReader;
import org.springframework.batch.item.json.JsonFileItemWriter;
import org.springframework.batch.item.json.JsonItemReader;
import org.springframework.batch.item.json.builder.JsonFileItemWriterBuilder;
import org.springframework.batch.item.json.builder.JsonItemReaderBuilder;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.FileSystemResource;

@Configuration
@EnableBatchProcessing(dataSourceRef = "batchDataSource", transactionManagerRef = "batchTransactionManager")
public class NftJobConfig {
    public static final String NFT_DIR = "data/nft";

    public static String getJsonPath(final Class<?> itemType) {
        return NFT_DIR + "/" + itemType.getSimpleName() + ".json";
    }

    @Bean
    @StepScope
    public static <T> JsonItemReader<T> createJsonItemReader(Class<? extends T> itemType) {
        return new JsonItemReaderBuilder<T>()
                .name(itemType.getSimpleName() + "Reader")
                .jsonObjectReader(new JacksonJsonObjectReader<>(itemType))
                .resource(new FileSystemResource(getJsonPath(itemType)))
                .build();
    }

    @Bean
    @StepScope
    public static <T> JsonFileItemWriter<T> createJsonFileItemWriter(Class<? extends T> itemType) {
        return new JsonFileItemWriterBuilder<T>()
                .name(itemType.getSimpleName() + "Writer")
                .jsonObjectMarshaller(new JacksonJsonObjectMarshaller<>())
                .resource(new FileSystemResource(getJsonPath(itemType)))
                .build();
    }

    @Bean
    public Job nftJob(
            final JobRepository jobRepository,
            // data
            final @Qualifier("performanceStep") Step performanceStep,
            final @Qualifier("scheduleStep") Step scheduleStep,
            final @Qualifier("seatStep") Step seatStep,
            final @Qualifier("seatAndScheduleStep") Step seatAndScheduleStep,
            final @Qualifier("PerformanceAndSeatsStep") Step PerformanceAndSeatsStep,
            // media
            final @Qualifier("downloadMediaStep") Step downloadMediaStep,
            final @Qualifier("performanceAndMediaStep") Step performanceAndMediaStep,
            final @Qualifier("createMediaStep") Step createMediaStep,
            final @Qualifier("uploadMediaStep") Step uploadMediaStep,
            // metadata
            final @Qualifier("collectionMetadataStep") Step collectionMetadataStep,
            final @Qualifier("assetMetadataStep") Step assetMetadataStep,
            // mint
            final @Qualifier("mintCollectionStep") Step mintCollectionStep,
            final @Qualifier("mintAssetStep") Step mintAssetStep,
            final @Qualifier("verifyAssetAndUpdateSeatStep") Step verifyAssetStep,
            final @Qualifier("updatePerformanceStep") Step updatePerformanceStep
    ) {
        return new JobBuilder("nftJob", jobRepository)
                // data
                .start(performanceStep)
                .next(scheduleStep)
                .next(seatStep)
                .next(seatAndScheduleStep)
                .next(PerformanceAndSeatsStep)
                // media
                .next(downloadMediaStep)
                .next(performanceAndMediaStep)
                .next(createMediaStep)
                .next(uploadMediaStep)
                // metadata
                .next(collectionMetadataStep)
                .next(assetMetadataStep)
                // mint
                .next(mintCollectionStep)
                .next(mintAssetStep)
                .next(verifyAssetStep)
                .next(updatePerformanceStep)
                .build();
    }
}

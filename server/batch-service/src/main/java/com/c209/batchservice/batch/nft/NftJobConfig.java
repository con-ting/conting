package com.c209.batchservice.batch.nft;

import com.c209.batchservice.batch.common.JsonConfig;
import lombok.RequiredArgsConstructor;
import org.springframework.batch.core.Job;
import org.springframework.batch.core.Step;
import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.batch.core.job.builder.JobBuilder;
import org.springframework.batch.core.repository.JobRepository;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableBatchProcessing(
        dataSourceRef = "batchDataSource",
        transactionManagerRef = "batchTransactionManager")
@RequiredArgsConstructor
public class NftJobConfig {
    public static final String NFT_DIR = "data/nft";
    private final JobRepository jobRepository;
    private final @Qualifier("loadPerformanceStep") Step loadPerformanceStep;
    private final @Qualifier("loadScheduleStep") Step loadScheduleStep;
    private final @Qualifier("loadSeatStep") Step loadSeatStep;
    private final @Qualifier("mergeSeatAndScheduleStep") Step mergeSeatAndScheduleStep;
    private final @Qualifier("mergePerformanceAndSeatsStep") Step mergePerformanceAndSeatsStep;
    private final @Qualifier("downloadMediaStep") Step downloadMediaStep;
    private final @Qualifier("mergePerformanceAndMediaStep") Step mergePerformanceAndMediaStep;
    private final @Qualifier("createMediaStep") Step createMediaStep;
    private final @Qualifier("uploadMediaStep") Step uploadMediaStep;
    private final @Qualifier("createCollectionMetadataStep") Step createCollectionMetadataStep;
    private final @Qualifier("createAssetMetadataStep") Step createAssetMetadataStep;
    private final @Qualifier("mintCollectionStep") Step mintCollectionStep;
    private final @Qualifier("mintAssetStep") Step mintAssetStep;
    private final @Qualifier("verifyAssetAndUpdateSeatStep") Step verifyAssetStep;
    private final @Qualifier("updatePerformanceStep") Step updatePerformanceStep;

    @Bean
    public JsonConfig nftJsonConfig() {
        return new JsonConfig(NFT_DIR);
    }

    @Bean
    public Job nftJob() {
        return new JobBuilder("nftJob", jobRepository)
                // data
                .start(loadPerformanceStep)
                .next(loadScheduleStep)
                .next(loadSeatStep)
                .next(mergeSeatAndScheduleStep)
                .next(mergePerformanceAndSeatsStep)
                // media
                .next(downloadMediaStep)
                .next(mergePerformanceAndMediaStep)
                .next(createMediaStep)
                .next(uploadMediaStep)
                // metadata
                .next(createCollectionMetadataStep)
                .next(createAssetMetadataStep)
                // mint
                .next(mintCollectionStep)
                .next(mintAssetStep)
                .next(verifyAssetStep)
                .next(updatePerformanceStep)
                .build();
    }
}

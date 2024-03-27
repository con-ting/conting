package com.c209.batchservice.batch.nft.processor;

import com.c209.batchservice.domain.catalog.entity.Performance;
import lombok.extern.slf4j.Slf4j;
import org.springframework.batch.item.ItemProcessor;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class NftCreateMediaProcessor implements ItemProcessor<Performance, Performance> {

    @Override
    public Performance process(final Performance performance) {
        log.info("[!]: {}", performance.getTitle());
        return null;
    }
}

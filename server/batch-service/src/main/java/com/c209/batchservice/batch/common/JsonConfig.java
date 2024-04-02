package com.c209.batchservice.batch.common;

import lombok.RequiredArgsConstructor;
import org.springframework.batch.item.json.JacksonJsonObjectMarshaller;
import org.springframework.batch.item.json.JacksonJsonObjectReader;
import org.springframework.batch.item.json.JsonFileItemWriter;
import org.springframework.batch.item.json.JsonItemReader;
import org.springframework.batch.item.json.builder.JsonFileItemWriterBuilder;
import org.springframework.batch.item.json.builder.JsonItemReaderBuilder;
import org.springframework.core.io.FileSystemResource;

@RequiredArgsConstructor
public class JsonConfig {
    private final String dataDir;

    public <T> String getJsonPath(final Class<? extends T> itemType) {
        return dataDir + "/" + itemType.getSimpleName() + ".json";
    }

    public <T> JsonItemReader<T> createJsonItemReader(Class<? extends T> itemType) {
        return new JsonItemReaderBuilder<T>()
                .name(itemType.getSimpleName() + "Reader")
                .jsonObjectReader(new JacksonJsonObjectReader<>(itemType))
                .resource(new FileSystemResource(getJsonPath(itemType)))
                .build();
    }

    public <T> JsonFileItemWriter<T> createJsonFileItemWriter(Class<? extends T> itemType) {
        return new JsonFileItemWriterBuilder<T>()
                .name(itemType.getSimpleName() + "Writer")
                .jsonObjectMarshaller(new JacksonJsonObjectMarshaller<>())
                .resource(new FileSystemResource(getJsonPath(itemType)))
                .build();
    }
}

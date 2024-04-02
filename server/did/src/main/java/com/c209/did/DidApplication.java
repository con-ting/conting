package com.c209.did;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.ConfigurationPropertiesScan;

@SpringBootApplication
@ConfigurationPropertiesScan
public class DidApplication {

    public static void main(String[] args) {
        SpringApplication.run(DidApplication.class, args);
    }

}

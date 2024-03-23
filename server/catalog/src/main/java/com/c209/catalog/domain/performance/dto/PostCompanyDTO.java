package com.c209.catalog.domain.performance.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class PostCompanyDTO {
    @NotNull
    private String companyName;
    @NotNull
    private String call;
}

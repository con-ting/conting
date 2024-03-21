package com.c209.catalog.domain.company.entity;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class CompanyTest {
    @Test
    @DisplayName("Company Entity Test")
    void createCompany(){
        // given
        Company.CompanyBuilder builder = Company.builder();
        builder.companyName("CN");
        builder.companyCall("01");
        Company company = builder.build();

        // when, then
        Assertions.assertThat(company.getCompanyName()).isEqualTo("CN");
        Assertions.assertThat(company.getCompanyCall()).isEqualTo("01");
    }

}
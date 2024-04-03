package com.c209.catalog.domain.seller.dto.response;

import com.c209.catalog.domain.performance.dto.PerformanceSearchDto;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import com.fasterxml.jackson.databind.annotation.JsonNaming;
import lombok.*;

import java.util.List;

@Builder
@JsonNaming(PropertyNamingStrategies.SnakeCaseStrategy.class)
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Getter
public class SellerShowResponse {
    private List<PerformanceSearchDto> show;
}

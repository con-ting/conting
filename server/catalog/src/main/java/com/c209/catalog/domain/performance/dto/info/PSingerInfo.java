package com.c209.catalog.domain.performance.dto.info;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class PSingerInfo {
    private Long pSingerId;
    private String pSingerName;
    private String pSingerProfile;
    private Integer pSingerView;
}

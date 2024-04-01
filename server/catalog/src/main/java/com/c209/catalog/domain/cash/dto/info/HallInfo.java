package com.c209.catalog.domain.cash.dto.info;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class HallInfo {
    private Long hall_id;
    private String hall_name;
    private String hall_address;
}

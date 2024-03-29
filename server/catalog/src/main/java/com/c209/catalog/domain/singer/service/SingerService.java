package com.c209.catalog.domain.singer.service;

import com.c209.catalog.domain.singer.dto.response.GetSingerResponse;
import com.c209.catalog.domain.singer.dto.response.SingerListResponse;
import org.springframework.stereotype.Service;

@Service
public interface SingerService {
    GetSingerResponse getSingerDetails(Long singerId);

    SingerListResponse getSingerList();
}

package com.c209.catalog.domain.singer.service;

import com.c209.catalog.domain.singer.dto.response.GetSingerResponse;

public interface SingerService {


    public GetSingerResponse getSingerDetails(Long singerId);

}

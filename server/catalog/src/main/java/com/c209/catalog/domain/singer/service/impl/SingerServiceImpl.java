package com.c209.catalog.domain.singer.service.impl;


import com.c209.catalog.domain.singer.dto.AlbumDto;
import com.c209.catalog.domain.singer.dto.SingerDto;
import com.c209.catalog.domain.singer.dto.SingerListDto;
import com.c209.catalog.domain.singer.dto.info.SingerAndAlbumInfo;
import com.c209.catalog.domain.singer.dto.info.SingerListInfo;
import com.c209.catalog.domain.singer.dto.response.GetSingerResponse;
import com.c209.catalog.domain.singer.dto.response.SingerListResponse;
import com.c209.catalog.domain.singer.entity.Singer;
import com.c209.catalog.domain.singer.exception.SingerErrorCode;
import com.c209.catalog.domain.singer.repository.SingerRepository;
import com.c209.catalog.domain.singer.service.SingerService;
import com.c209.catalog.global.exception.CommonException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SingerServiceImpl implements SingerService {
    private final SingerRepository singerRepository;

    private SingerDto getSingerDtoFromSingerAndAlbumInfoList(List<SingerAndAlbumInfo> singerAndAlbumInfoList){
        return  singerAndAlbumInfoList.stream()
                .map(info -> SingerDto.builder()
                        .name(info.getSingerName())
                        .profile(info.getSingerImage())
                        .instagram(info.getInstagram())
                        .build())
                .findFirst()
                .orElseThrow(() -> new CommonException(SingerErrorCode.NOT_EXIST_SINGER));

    }

    private List<AlbumDto> getAlbumDtoFromSingerAndAlbumInfoList(List<SingerAndAlbumInfo> singerAndAlbumInfoList){
        return singerAndAlbumInfoList.stream()
                .map(info -> AlbumDto.builder()
                        .name(info.getAlbumName())
                        .title(info.getAlbumTitle())
                        .title_url(info.getAlbumVideo())
                        .published_at(info.getReleaseAt())
                        .image(info.getAlbumImage())
                        .build())
                .collect(Collectors.toList());
    }

    @Override
    public GetSingerResponse getSingerDetails(Long singerId) {

        List<SingerAndAlbumInfo> singerAndAlbumInfoList = singerRepository
                                                            .getSingerAndAlbumBySingerId((singerId))
                                                            .orElseThrow(()->
                                                                    new CommonException(SingerErrorCode.NOT_EXIST_SINGER)
                                                            );

        SingerDto singerDto = getSingerDtoFromSingerAndAlbumInfoList(singerAndAlbumInfoList);
        List<AlbumDto> albumList = getAlbumDtoFromSingerAndAlbumInfoList(singerAndAlbumInfoList);

        Singer singer = singerRepository.findById(singerId)
                .orElseThrow(() -> new CommonException(SingerErrorCode.NOT_EXIST_SINGER));
        singer.setView(singer.getView() + 1);
        singerRepository.save(singer);

        return GetSingerResponse.builder().singer(singerDto).albums(albumList).build();
    }

    private List<SingerListDto> getSingerListFromSingerInfoList(List<SingerListInfo> singerListInfoList){
        return singerListInfoList.stream()
                .map(info -> SingerListDto.builder()
                        .singer_id(info.getSinger_id())
                        .singer_name(info.getSinger_name())
                        .singer_profile_image(info.getSinger_profile_image())
                        .singer_instagram(info.getSinger_instagram())
                        .singer_wallet(info.getSinger_wallet())
                        .dateOfDebut(info.getDateOfDebut())
                        .dateOfBirth(info.getDateOfBirth())
                        .singer_view(info.getSinger_view())
                        .build())
                .distinct()
                .collect(Collectors.toList());
    }

    @Override
    public SingerListResponse getSingerList() {
        List<SingerListInfo> singerListInfoList = singerRepository.getSinger()
                .orElseThrow(() -> new CommonException(SingerErrorCode.NOT_EXIST_SINGER));

        List<SingerListDto> singerList = getSingerListFromSingerInfoList(singerListInfoList);
        return SingerListResponse.builder()
                .singers(singerList)
                .build();
    }
}

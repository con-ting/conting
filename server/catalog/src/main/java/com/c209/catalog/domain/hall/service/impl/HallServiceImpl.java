package com.c209.catalog.domain.hall.service.impl;

import com.c209.catalog.domain.hall.dto.HallDto;
import com.c209.catalog.domain.hall.entity.Hall;
import com.c209.catalog.domain.hall.exception.HallErrorCode;
import com.c209.catalog.domain.hall.repository.HallRepository;
import com.c209.catalog.domain.hall.service.HallService;
import com.c209.catalog.global.exception.HallException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class HallServiceImpl implements HallService {
    private final HallRepository hallRepository;

    @Override
    public List<HallDto> findHallsByKeywordAndRegion(String keyword, String region) {
        List<Hall> halls = hallRepository.findByNameContainingAndAddressContaining(keyword, region);

        if (halls.isEmpty()) throw new HallException(HallErrorCode.NOT_EXIST_HALL);

        return getHallDto(halls);
    }

    private List<HallDto> getHallDto(List<Hall> hallList) {
        return hallList.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private HallDto convertToDto(Hall hall) {
        return new HallDto(
                hall.getId(),
                hall.getName(),
                hall.getTotal_seat_count(),
                hall.getAddress()
        );
    }
}

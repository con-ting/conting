package com.c209.catalog.domain.hall.service;

import com.c209.catalog.domain.hall.dto.HallDto;
import com.c209.catalog.domain.hall.entity.Hall;
import com.c209.catalog.domain.hall.repository.HallRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class HallService {

    private final HallRepository hallRepository;

    @Autowired
    public HallService(HallRepository hallRepository) {
        this.hallRepository = hallRepository;
    }

    public List<HallDto> findHallsByKeywordAndRegion(String keyword, String region) {
        List<Hall> halls = hallRepository.findByNameContainingAndAddressContaining(keyword, region);
        return halls.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private HallDto convertToDto(Hall hall) {
        return HallDto.builder()
                .id(hall.getId())
                .name(hall.getName())
                .totalSeatCount(hall.getTotalSeatCount())
                .address(hall.getAddress())
                .build();
    }
}

// HallServiceImpl.java
package com.c209.catalog.domain.hall.service.impl;

import com.c209.catalog.domain.hall.dto.HallDto;
import com.c209.catalog.domain.hall.dto.response.HallsResponse;
import com.c209.catalog.domain.hall.entity.Hall;
import com.c209.catalog.domain.hall.exception.HallErrorCode;
import com.c209.catalog.domain.hall.repository.HallRepository;
import com.c209.catalog.domain.hall.service.HallService;
import com.c209.catalog.global.exception.HallException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class HallServiceImpl implements HallService {
    private final HallRepository hallRepository;

    @Override
    public HallsResponse findHallsByKeywordAndRegion(String keyword, String region) {
        List<Hall> halls = hallRepository.findByNameContainingAndAddressContaining(keyword, region);
        List<HallDto> hallDtos = new ArrayList<>();
        for(Hall h: halls){
            hallDtos.add(HallDto
                    .builder()
                    .id(h.getId())
                    .name((h.getName()))
                    .build());
        }

//        stream, for문 사용하는데, stream 권장(많이 사용)
//        stream이 상대적으로 어려워서 for문 사용해도 큰 문제는 없을듯(이번 프로젝트)
//        항상 빌더 쓸 때,  빌더-빌드 세트로 있다는거 유의하자
//        필요한 것들 모두 빌더 안에 적어주어야 한다. (스트림, 포문 둘 다)
//        for문 사용할 때에는 halls에 있는 것들 반복하면서 리스트에 담아줌.






        if (halls.isEmpty()) throw new HallException(HallErrorCode.NOT_EXIST_HALL);

        return HallsResponse.builder().halls(hallDtos).build();
    }

    private HallsResponse groupHallsByKey(List<Hall> hallList) {
        Map<String, List<HallDto>> resultMap = new HashMap<>();
        resultMap.put("halls", hallList.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList()));
        return resultMap;
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

package com.c209.catalog.domain.performance.service.impl;

import com.c209.catalog.domain.performance.dto.PerformanceSearchDto;
import com.c209.catalog.domain.performance.dto.response.SearchShowResponse;
import com.c209.catalog.domain.performance.entity.QPerformance;
import com.c209.catalog.domain.performance.enums.ReservationType;
import com.c209.catalog.domain.performance.enums.Status;
import com.c209.catalog.domain.performance.exception.PerformanceErrorCode;
import com.c209.catalog.domain.performance.repository.SearchShowRepository;
import com.c209.catalog.domain.performance.service.SearchShowService;
import com.c209.catalog.global.exception.CommonException;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SearchShowServiceImpl implements SearchShowService {
    private final SearchShowRepository searchShowRepository;

    private final JPAQueryFactory queryFactory;
    @Autowired
    public SearchShowServiceImpl(SearchShowRepository searchShowRepository, EntityManager entityManager) {
        this.searchShowRepository = searchShowRepository;
        this.queryFactory = new JPAQueryFactory(entityManager);
    }

    @Override
    public SearchShowResponse searchShows(
            Status status,
            String region,
            String sort,
            String keyword,
            String searchType,
            ReservationType reservationType
    ) {
        Optional<List<PerformanceSearchDto>> searchResult = searchShowRepository.searchShowsByDetails(status, region, sort, keyword, searchType, reservationType);

        if (searchResult.isEmpty()) {
                throw new CommonException(PerformanceErrorCode.NOT_EXIST_SHOW);
        }

        

        List<PerformanceSearchDto> performanceSearchDtos = searchResult.get();

//        switch (sort) {
//            case "예매일순":
//                performanceSearchDtos.sort(Comparator.comparing(PerformanceSearchDto::getReservation_start_date_time));
//                break;
//            case "이름순":
//                performanceSearchDtos.sort(Comparator.comparing(PerformanceSearchDto::getTitle));
//                break;
//            case "공연일순":
//                performanceSearchDtos.sort(Comparator.comparing(PerformanceSearchDto::getStart_date));
//                break;
//            default:
//                break;
//        }

//        if (searchResult.isEmpty()) {
//            throw new CommonException(PerformanceSearchErrorCode.NOT_FOUND_SHOW);
//        }

        SearchShowResponse response = new SearchShowResponse();
        response.setPerformances(performanceSearchDtos);
        return response;
    }

    private BooleanExpression statusEq(Status status) {
        return status != null ? QPerformance.performance.status.eq(status) : null;
    }

    private BooleanExpression regionEq(String region) {
        return StringUtils.hasText(region) ? QPerformance.performance.hall.address.contains(region) : null;
    }

    private BooleanExpression reservationTypeEq(ReservationType reservationType) {
        return reservationType != null ? QPerformance.performance.reservationType.eq(reservationType) : null;
    }

    private BooleanExpression searchTypeEq(String keyword, String searchType) {
        if (StringUtils.hasText(keyword) && StringUtils.hasText(searchType)) {
            switch (searchType) {
                case "가수":
                    return QPerformance.performance.singer.name.contains(keyword);
                case "공연장":
                    return QPerformance.performance.hall.name.contains(keyword);
                case "공연명":
                    return QPerformance.performance.title.contains(keyword);
                default:
                    return null;
            }
        }
        return null;
    }
}

package com.c209.catalog.domain.performance.repository;

import com.c209.catalog.domain.performance.dto.PerformanceSearchDto;
import com.c209.catalog.domain.performance.entity.Performance;
import com.c209.catalog.domain.performance.enums.ReservationType;
import com.c209.catalog.domain.performance.enums.Status;
import com.querydsl.core.BooleanBuilder;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import jakarta.persistence.EntityManager;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.List;
import java.util.function.Supplier;

import static com.c209.catalog.domain.performance.entity.QPerformance.performance;

@Repository
public interface SearchShowRepository extends JpaRepository<Performance, Long> {
    default List<PerformanceSearchDto> searchShowsByDetails(Status status, String region, String sort, String keyword, String searchType, ReservationType reservationType) {
        JPAQueryFactory queryFactory = new JPAQueryFactory(getEntityManager());

        JPAQuery<PerformanceSearchDto> query = queryFactory
                .select(new PerformanceSearchDto(
                        performance.id,
                        performance.posterImage,
                        performance.title,
                        performance.hall.id,
                        performance.hall.name,
                        performance.hall.address,
                        performance.reservationType,
                        performance.status,
                        performance.reservationStartDatetime,
                        performance.reservationEndDatetime,
                        performance.startDate,
                        performance.endDate,
                        performance.singer.name
                ))
                .from(performance)
                .leftJoin(performance.hall)
                .leftJoin(performance.singer);

        BooleanBuilder whereBuilder = new BooleanBuilder();

        if (status != null) {
            whereBuilder.and(performance.status.eq(status));
        }
        if (StringUtils.hasText(region)) {
            whereBuilder.and(performance.hall.address.contains(region));
        }
        if (StringUtils.hasText(keyword) && StringUtils.hasText(searchType)) {
            switch (searchType) {
                case "가수":
                    whereBuilder.and(performance.singer.name.contains(keyword));
                    break;
                case "공연장":
                    whereBuilder.and(performance.hall.name.contains(keyword));
                    break;
                case "공연명":
                    whereBuilder.and(performance.title.contains(keyword));
                    break;
                default:
                    whereBuilder
                            .or(performance.singer.name.contains(keyword))
                            .or(performance.hall.name.contains(keyword))
                            .or(performance.title.contains(keyword));
                    break;
            }
        }
        if (reservationType != null) {
            whereBuilder.and(performance.reservationType.eq(reservationType));
        }

        query.where(whereBuilder);

        if (StringUtils.hasText(sort)) {
            switch (sort) {
                case "예매일순":
                    query.orderBy(performance.reservationStartDatetime.asc());
                    break;
                case "이름순":
                    query.orderBy(performance.title.asc());
                    break;
                case "공연일순":
                    query.orderBy(performance.startDate.asc());
                    break;
                default:
                    break;
            }
        }

        return query.fetch();
    }

    Supplier<EntityManager> getEntityManager();

}


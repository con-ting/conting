package com.c209.catalog.domain.performance.service.impl;

import com.c209.catalog.domain.performance.dto.*;
import com.c209.catalog.domain.performance.dto.info.PerformanceDetailInfo;
import com.c209.catalog.domain.performance.dto.response.GetShowResponse;
import com.c209.catalog.domain.performance.entity.Performance;
import com.c209.catalog.domain.performance.exception.PerformanceErrorCode;
import com.c209.catalog.domain.performance.repository.PerformanceRepository;
import com.c209.catalog.domain.performance.service.PerformanceService;
import com.c209.catalog.global.exception.CommonException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor //변수명에 private final만 붙은 빈들로만 인자를 구성한 생성자가 만들어진다.
public class PerformanceServiceImpl implements PerformanceService {
    private final PerformanceRepository performanceRepository;

    private PerformanceDto getPerformanceDtoFromPerformanceDetailInfoList(List<PerformanceDetailInfo> performanceDetailInfoList){
        return performanceDetailInfoList.stream()
                .map(info -> PerformanceDto.builder()
                        .show_id(info.getShowId())
                        .title(info.getShowTitle())
                        .description(info.getShowDescription())
                        .poster(info.getShowPoster())
                        .description_image(info.getShowDescriptionImage())
                        .reservation_type(String.valueOf(info.getShowReservationType()))
//                        .reservation_rate(info.getShowReservationRate())
                        .ticket_open_date(info.getShowTicketOpenDate())
                        .ticket_close_date(info.getShowTicketCloseDate())
                        .start_date(info.getShowStartDate())
                        .end_date(info.getShowEndDate())
                        .build())
                .findFirst()
                .orElseThrow(() -> new CommonException(PerformanceErrorCode.NOT_EXIST_SHOW));
    }

    private List<GradeDto> getGradeDtoFromPerformanceDetailInfoList(List<PerformanceDetailInfo> performanceDetailInfoList){
        return performanceDetailInfoList.stream()
                .map(info -> GradeDto.builder()
                        .id(info.getGradeId())
                        .grade(info.getGradeGrade())
                        .price(info.getGradePrice())
                        .build())
                .collect(Collectors.toList());
    }

    private List<ScheduleDto> getScheduleDtoFromPerformanceDetailInfoList(List<PerformanceDetailInfo> performanceDetailInfoList) {
        return performanceDetailInfoList.stream()
                .map(info -> ScheduleDto.builder()
                        .start_datetime(info.getScheduleStartDateTime())
                        .end_datetime(info.getScheduleEndDateTime())
                        .build())
                .collect(Collectors.toList());
    }

    private HallDto getHallDtoFromPerformanceDetailInfoList(List<PerformanceDetailInfo> performanceDetailInfoList) {
        return performanceDetailInfoList.stream()
                .map(info -> HallDto.builder()
                        .id(info.getHallId())
                        .name(info.getHallName())
                        .address(info.getHallAddress())
                        .seat_total(info.getHallSeatTotal())
                        .x(info.getHallX())
                        .y(info.getHallY())
                        .build())
                .findFirst()
                .orElseThrow();
    }

    private List<SingerDto> getSingerDtoFromPerformanceDetailInfoList(List<PerformanceDetailInfo> performanceDetailInfoList) {
        return performanceDetailInfoList.stream()
                .map(info -> SingerDto.builder()
                        .id(info.getSingerId())
                        .name(info.getSingerName())
                        .profile(info.getSingerProfile())
                        .build())
                .distinct()
                .collect(Collectors.toList());
    }

    private CompanyDto getCompanyDtoFromPerformanceDetailInfoList(List<PerformanceDetailInfo> performanceDetailInfoList) {
        return performanceDetailInfoList.stream()
                .map(info -> CompanyDto.builder()
                        .id(info.getCompanyId())
                        .name(info.getCompanyName())
                        .call(info.getCompanyCall())
                        .build())
                .findFirst()
                .orElseThrow();
    }

    @Override
    public GetShowResponse getShowDetails(Long showId) {
        List<PerformanceDetailInfo> performanceDetailInfoList = performanceRepository
                .getPerformanceByShowId((showId))
                .orElseThrow(() ->
                        new CommonException(PerformanceErrorCode.NOT_EXIST_SHOW)
                );

        PerformanceDto performanceDto = getPerformanceDtoFromPerformanceDetailInfoList(performanceDetailInfoList);
        List<GradeDto> gradeList = getGradeDtoFromPerformanceDetailInfoList(performanceDetailInfoList);
        List<ScheduleDto> scheduleList = getScheduleDtoFromPerformanceDetailInfoList(performanceDetailInfoList);
        HallDto hallDto = getHallDtoFromPerformanceDetailInfoList(performanceDetailInfoList);
        List<SingerDto> singerList = getSingerDtoFromPerformanceDetailInfoList(performanceDetailInfoList);
        CompanyDto companyDto= getCompanyDtoFromPerformanceDetailInfoList(performanceDetailInfoList);

        Performance performance = performanceRepository.findById(showId)
                .orElseThrow(() -> new CommonException(PerformanceErrorCode.NOT_EXIST_SHOW));
        performance.setView(performance.getView()+1);

        return GetShowResponse.builder()
                .show(performanceDto)
                .grade(gradeList)
                .schedule(scheduleList)
                .hall(hallDto)
                .singers(singerList)
                .company(companyDto)
                .build();
    }
}

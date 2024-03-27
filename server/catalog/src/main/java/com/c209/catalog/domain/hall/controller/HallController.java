package com.c209.catalog.domain.hall.controller;

import com.c209.catalog.domain.hall.dto.response.HallsResponse;
import com.c209.catalog.domain.hall.dto.response.ViewResponse;
import com.c209.catalog.domain.hall.service.HallService;
import com.c209.catalog.domain.hall.service.ViewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("catalog/hall")
@RequiredArgsConstructor
public class HallController {
    private final HallService hallService;
    private final ViewService viewService;

    //<>안에 들어가는 것을 제너릭이라함
    //제너릭 : 객체 안에 들어가는 타입을 명시
    //컨트롤러에서는 ResponseEntity를 반환한다. -> 프론트에게 http status를 같이 줘야하기 때문!

    @GetMapping
    public ResponseEntity<HallsResponse> getHallResponse(
            @RequestParam(value = "keyword", required = false, defaultValue = "") String keyword,
            @RequestParam(value = "region", required = false, defaultValue = "") String region
    ) {
//       흔한 오류들은 여기에서 적기도 함(handler 따로 안하고. 바디를 직접 커스텀하고싶을 경우에만 아래 주석처럼 사용
        //ResponseEntity.status(HttpStatus.ACCEPTED).body(hallService.findHallsByKeywordAndRegion(keyword, region));
        return ResponseEntity.ok(hallService.findHallsByKeywordAndRegion(keyword, region));
    }

    @GetMapping("{hall_id}/show/{show_id}")
    public ResponseEntity<ViewResponse> getViewResponse(
            @PathVariable("hall_id") Long hallId,
            @PathVariable("show_id") Long showId
    ) {
        return ResponseEntity.ok(viewService.findViewsByHallAndShow(hallId, showId));
    }
}

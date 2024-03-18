package com.c209.catalog.domain.hall.controller;

import com.c209.catalog.domain.hall.dto.HallDto;
import com.c209.catalog.domain.hall.dto.response.HallsResponse;
import com.c209.catalog.domain.hall.service.HallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/hall")
public class HallController {
    private final HallService hallService;

    public HallController(HallService hallService) {
        this.hallService = hallService;
    }


    //<>안에 들어가는 것을 제너릭이라함
    //제너릭 : 객체 안에 들어가는 타입을 명시
    //컨트롤러에서는 ResponseEntity를 반환한다. -> 프론트에게 http status를 같이 줘야하기 때문!



    @GetMapping
    public ResponseEntity<HallsResponse> getHallResponse(@RequestParam("keyword") String keyword, @RequestParam("region") String region) {

//       흔한 오류들은 여기에서 적기도 함(handler 따로 안하고. 바디를 직접 커스텀하고싶을 경우에만 아래 주석처럼 사용
        //ResponseEntity.status(HttpStatus.ACCEPTED).body(hallService.findHallsByKeywordAndRegion(keyword, region));
        return ResponseEntity.ok(hallService.findHallsByKeywordAndRegion(keyword, region));
    }
}

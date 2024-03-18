package com.c209.catalog.domain.singer.controller;



import com.c209.catalog.domain.singer.dto.response.GetSingerResponse;
import com.c209.catalog.domain.singer.service.SingerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/singer")
<<<<<<< HEAD
@RequiredArgsConstructor
=======
@RequiredArgsConstructor //private final 이 붙어있는 변수만 생성자로 만들어준다.
>>>>>>> 61ae66f0f56f29afd874e80e6f911543bead33a7
public class SingerController {

    private final SingerService singerService;

    @GetMapping("{singer_id}")
    public ResponseEntity<GetSingerResponse> getSingerDetail(
            @RequestHeader("X-Authorization-Id") Long memberId,
            @PathVariable("singer_id") Long singerId
    ){
        return ResponseEntity.ok(singerService.getSingerDetails(singerId));
    }

}

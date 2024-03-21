package com.c209.catalog.domain.singer.controller;



import com.c209.catalog.domain.singer.dto.response.GetSingerResponse;
import com.c209.catalog.domain.singer.entity.Singer;
import com.c209.catalog.domain.singer.service.SingerService;
import com.c209.catalog.domain.singer.service.impl.SingerServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/singer")
@RequiredArgsConstructor
public class SingerController {

    private final SingerService singerService;

    @GetMapping("{singer_id}")
    public ResponseEntity<GetSingerResponse> getSingerDetail(
//            @RequestHeader("X-Authorization-Id") Long memberId,
            @PathVariable("singer_id") Long singerId
    ){
//        Singer singer = singerService.getSingerDetails(singerId);
//        singer.setView(singer.getView() + 1); // Incrementing the view count
//        singerService.saveSinger(singer); // Assuming you have a method to save the Singer in your service
//        return ResponseEntity.ok(singer);
        return ResponseEntity.ok(singerService.getSingerDetails(singerId));
    }

}

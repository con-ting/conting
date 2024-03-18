package com.c209.catalog.domain.hall.controller;

import com.c209.catalog.domain.hall.dto.HallDto;
import com.c209.catalog.domain.hall.service.HallService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/hall")
public class HallController {
    private final HallService hallService;

    @Autowired
    public HallController(HallService hallService) {
        this.hallService = hallService;
    }

    @GetMapping
    public List<HallDto> getHalls(@RequestParam("keyword") String keyword, @RequestParam("region") String region) {
        return hallService.findHallsByKeywordAndRegion(keyword, region);
    }

}

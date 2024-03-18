package com.c209.catalog.domain.hall.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

package com.c209.ticket.global.api;

import com.c209.ticket.global.api.dto.FcmRequest;
import com.c209.ticket.global.api.dto.FcmResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;


@Service
public class NotificationRestClient {

    private final RestTemplate restTemplate;
    private final String baseUrl;

    public NotificationRestClient() {
        this.restTemplate = new RestTemplate();
        this.baseUrl = "http://3.36.52.191:8886";
    }

    public FcmResponse sendFcm(FcmRequest request) {
        String url = baseUrl + "/fcm/send";
        ResponseEntity<FcmResponse> responseEntity = restTemplate.postForEntity(url, request, FcmResponse.class);
        return responseEntity.getBody();
    }
}

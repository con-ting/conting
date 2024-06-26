package com.c209.payment.global.api.seat;

import com.c209.payment.domain.order.dto.response.SeatStatusResponse;
import com.c209.payment.global.api.seat.SeatClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.couchbase.CouchbaseProperties;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.web.util.UriComponentsBuilder;
import reactor.core.publisher.Mono;
import org.springframework.http.HttpHeaders;

import java.util.List;


@Service
public class SeatClientService {

    private final WebClient webClient;
    private final SeatClient seatClient;

    private final Environment env;

    public SeatClientService(WebClient.Builder webClientBuilder, SeatClient seatClient, Environment env) {
        this.env = env;
        this.webClient = webClientBuilder.baseUrl(env.getProperty("service.seat.url")).build();
        this.seatClient = seatClient;
    }

    public Mono<SeatStatusResponse> getSeatStatusListAsync(List<Long> seatIds, Long userId) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Authorization-Id", "your-authorization-id");

        return webClient.get()
                .uri(uriBuilder -> uriBuilder.path("/list/status")
                        .queryParam("seatIds", seatIds.toArray())
                        .build())
                .headers(httpHeaders -> httpHeaders.addAll(headers))
                .retrieve()
                .bodyToMono(SeatStatusResponse.class);
    }


}

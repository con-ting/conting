package com.c209.payment.global.api.iamport.async;


import com.c209.payment.global.api.iamport.dto.request.CreateIamportAccessTokenRequest;
import com.c209.payment.global.api.iamport.dto.request.PreparePaymentRequest;
import com.c209.payment.global.api.iamport.dto.response.CreateIamportAccessTokenResponse;
import com.c209.payment.global.api.iamport.dto.response.PaymentResponse;
import com.c209.payment.global.api.iamport.dto.response.PreparePaymentResponse;
import io.netty.channel.ChannelOption;
import io.netty.handler.ssl.SslContextBuilder;
import io.netty.handler.ssl.util.InsecureTrustManagerFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;
import reactor.netty.tcp.SslProvider;

import javax.net.ssl.SSLException;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class IamportApi {

    @Value("${iamport.apiKey}")
    private String IMP_KEY;

    @Value("${iamport.secret}")
    private String IMP_SECRET;

    private final WebClient webClient;


    private WebClient createClient() throws SSLException {
        SslProvider sslProvider = SslProvider.builder()
                .sslContext(SslContextBuilder.forClient().trustManager(Objects.requireNonNull(InsecureTrustManagerFactory.INSTANCE)).build())
                .build();

        HttpClient httpClient = HttpClient.create()
                .secure(sslProvider)
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 1000);

        WebClient.Builder builder = WebClient.builder().baseUrl("https://api.iamport.kr")
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .clientConnector(new ReactorClientHttpConnector(httpClient));

        return builder.build();

    }

    public Mono<CreateIamportAccessTokenResponse> createAccessToken() {
        return webClient.post()
                .uri("/users/getToken")
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(CreateIamportAccessTokenRequest
                                                .builder()
                                                .impKey(IMP_KEY)
                                                .impSecret(IMP_SECRET)
                                                .build()
                ))
                .retrieve()
                .bodyToMono(CreateIamportAccessTokenResponse.class);
    }

    public Mono<PreparePaymentResponse> preparePayment(String accessToken, PreparePaymentRequest paymentRequest) {
        return webClient.post()
                .uri("/payments/prepare")
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .contentType(MediaType.APPLICATION_JSON)
                .body(BodyInserters.fromValue(paymentRequest))
                .retrieve()
                .bodyToMono(PreparePaymentResponse.class);
    }


    public Mono<PaymentResponse> getPayHistory(String impUid, String accessToken){
        return webClient.get()
                .uri("/payments/{imp_uid}", impUid)
                .header(HttpHeaders.AUTHORIZATION, accessToken)
                .retrieve()
                .bodyToMono(PaymentResponse.class);
    }

    public Mono<PaymentResponse> createAccessTokenAndGetPayHistory(String impUid) {
        return createAccessToken().flatMap(accessTokenResponse ->
                getPayHistory(impUid, accessTokenResponse.response().accessToken())
        );
    }
}

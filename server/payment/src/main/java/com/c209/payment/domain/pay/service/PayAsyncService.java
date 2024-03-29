package com.c209.payment.domain.pay.service;

import com.c209.payment.domain.pay.dto.request.PayAuthRequest;
import reactor.core.publisher.Mono;

public interface PayAsyncService {

    Mono<Boolean> authSucceed(PayAuthRequest request);


    Mono<Void> authFailed(PayAuthRequest request);

    Mono<Void> capture(PayAuthRequest request);

}

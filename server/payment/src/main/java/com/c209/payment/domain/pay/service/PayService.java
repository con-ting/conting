package com.c209.payment.domain.pay.service;

import com.c209.payment.domain.pay.dto.request.PayAuthRequest;
import reactor.core.publisher.Mono;

public interface PayService {

    public boolean authSucceed(PayAuthRequest request);


    public void authFailed(PayAuthRequest request);

    public void capture(PayAuthRequest request);
}

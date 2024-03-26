package com.c209.payment.domain.order.service;

import reactor.core.publisher.Mono;

public interface OrderService {

    Mono<?> createOrder();

}

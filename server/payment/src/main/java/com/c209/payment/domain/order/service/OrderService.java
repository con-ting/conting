package com.c209.payment.domain.order.service;

import com.c209.payment.domain.order.dto.request.CreateOrderRequest;
import com.c209.payment.domain.order.dto.response.CreateOrderResponse;

public interface OrderService {

    CreateOrderResponse createOrder(CreateOrderRequest request, Long userId);

}

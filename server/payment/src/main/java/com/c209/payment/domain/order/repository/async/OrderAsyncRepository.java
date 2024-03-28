package com.c209.payment.domain.order.repository.async;


import com.c209.payment.domain.order.entity.OrderAsync;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;


public interface OrderAsyncRepository extends ReactiveCrudRepository<OrderAsync, Long> {


    Mono<OrderAsync> getOrderByPgOrderId(String s);
    Mono<OrderAsync> getOrderByOrderId(Long orderId);
}

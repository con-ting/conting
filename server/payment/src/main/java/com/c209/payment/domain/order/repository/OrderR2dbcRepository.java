package com.c209.payment.domain.order.repository;

import com.c209.payment.domain.order.entity.Order;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface OrderR2dbcRepository extends ReactiveCrudRepository<Order, Long> {





}

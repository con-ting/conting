package com.c209.payment.domain.order.repository.sync;

import com.c209.payment.domain.order.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import reactor.core.publisher.Mono;

import java.util.Optional;

@Repository
public interface OrderSyncRepository extends JpaRepository<Order, Long> {

    Boolean existsByPgOrderId(String pgOrderId);
    Boolean existsByMerchantUid(String merchantUid);

    Optional<Order> getOrderByPgOrderId(String merchantUid);

    Optional<Order> getOrderById(Long orderId);

    Optional<Order> getOrderByMerchantUid(String merchantUid);
}

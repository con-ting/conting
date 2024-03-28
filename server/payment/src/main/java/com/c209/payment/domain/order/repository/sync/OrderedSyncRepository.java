package com.c209.payment.domain.order.repository.sync;

import com.c209.payment.domain.order.entity.Order;
import com.c209.payment.domain.order.entity.OrderedSeat;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderedSyncRepository extends JpaRepository<OrderedSeat, Long> {
}

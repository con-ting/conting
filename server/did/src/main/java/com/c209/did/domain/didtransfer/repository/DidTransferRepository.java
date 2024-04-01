package com.c209.did.domain.didtransfer.repository;

import com.c209.did.domain.didtransfer.data.entity.DidTransferEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DidTransferRepository extends JpaRepository<DidTransferEntity, Long> {
    List<DidTransferEntity> findAllByBuyerId(long buyerId);

    Optional<DidTransferEntity> findByScheduleIdAndOwnerIdAndBuyerId(long ScheduleId, long ownerId, long buyerId);
}

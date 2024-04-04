package com.c209.did.domain.didtransfer.repository;

import com.c209.did.domain.didtransfer.data.entity.DidTransferEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DidTransferRepository extends JpaRepository<DidTransferEntity, Long> {
    List<DidTransferEntity> findAllByBuyerId(long buyerId);

    List<DidTransferEntity> findAllByBuyerIdAndPerformanceId(long buyerId, long performanceId);

    List<DidTransferEntity> findAllByOwnerId(long ownerId);

    List<DidTransferEntity> findAllByOwnerIdAndPerformanceId(long ownerId, long performanceId);

    Optional<DidTransferEntity> findByPerformanceIdAndOwnerIdAndBuyerId(long performanceId, long ownerId, long buyerId);
}

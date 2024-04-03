package com.c209.catalog.domain.seller.repository;

import com.c209.catalog.domain.seller.dto.info.SellerShowInfo;
import com.c209.catalog.domain.seller.entity.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SellerShowRepository extends JpaRepository<Seller, Long> {
    @Query("SELECT new com.c209.catalog.domain.seller.dto.info.SellerShowInfo (" +
            "p.id, p.title, p.reservationType, p.status, p.startDate, p.endDate, " +
            "p.reservationStartDatetime, p.reservationEndDatetime, p.hall.id, p.hall.name ) " +
            "FROM Performance p " +
            "WHERE p.seller.id = :sellerId")
    Optional<List<SellerShowInfo>> findBySellerId(@Param("sellerId") Long sellerId);
}

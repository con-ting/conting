package com.c209.did.domain.didtransfer.data.entity;


import jakarta.persistence.*;
import lombok.*;

@Entity(name = "did_transfer")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class DidTransferEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "did_id")
    private Long id;
    private Long scheduleId;
    private Long ownerId;
    private String ownerWallet;
    private String ownerFingerprintKey;
    private Long buyerId;
    private String buyerWallet;
}

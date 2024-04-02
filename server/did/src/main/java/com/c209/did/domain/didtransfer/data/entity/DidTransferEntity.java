package com.c209.did.domain.didtransfer.data.entity;


import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity(name = "did_transfer")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class DidTransferEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "did_transfer_id")
    private Long id;
    @NotNull
    private Long performanceId;
    @NotNull
    private Long ownerId;
    @NotNull
    private Long buyerId;
    @NotNull
    private String ownerWallet;
    @NotNull
    private String buyerWallet;
    @NotNull
    private String ownerFingerprintKey;
}

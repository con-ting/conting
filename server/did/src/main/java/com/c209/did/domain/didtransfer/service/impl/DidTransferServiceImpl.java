package com.c209.did.domain.didtransfer.service.impl;

import com.c209.did.domain.didtransfer.data.dto.request.DidTransferRequest;
import com.c209.did.domain.didtransfer.data.dto.response.DidTransferResponse;
import com.c209.did.domain.didtransfer.data.mapper.DidTransferMapper;
import com.c209.did.domain.didtransfer.exception.DidTransferErrorCode;
import com.c209.did.domain.didtransfer.repository.DidTransferRepository;
import com.c209.did.domain.didtransfer.service.DidTransferService;
import com.c209.did.global.error.CommonException;
import com.c209.did.global.web3.Web3Props;
import com.c209.did.global.web3.Web3Service;
import com.c209.did.global.web3.dto.MemcmpDto;
import com.c209.did.global.web3.dto.response.RpcGetProgramAccountsResultResponse;
import com.c209.did.lib.Base58;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DidTransferServiceImpl implements DidTransferService {
    private final DidTransferRepository didTransferRepository;
    private final DidTransferMapper didTransferMapper;
    private final Web3Props web3Props;
    private final Web3Service web3Service;

    @Override
    @Transactional(readOnly = true)
    public List<DidTransferResponse> getDidTransferListByBuyerId(final long buyerId) {
        return didTransferRepository.findAllByBuyerId(buyerId).stream()
                .map(didTransferMapper::toResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public DidTransferResponse getDidTransfer(final long performanceId, final long ownerId, final long buyerId) {
        return didTransferRepository.findByPerformanceIdAndOwnerIdAndBuyerId(performanceId, ownerId, buyerId)
                .map(didTransferMapper::toResponse)
                .orElseThrow(() -> new CommonException(DidTransferErrorCode.NOT_FOUND_DID_TRANSFER));
    }

    @Override
    @Transactional
    public long createDidTransfer(final DidTransferRequest didTransferRequest, final long userId) {
        if (didTransferRequest.ownerId() != userId) {
            throw new CommonException(DidTransferErrorCode.NOT_MATCH_USER_OWNER_ID);
        }
        final BigInteger ownerWalletNumber = Base58.decodeToBigInteger(didTransferRequest.ownerWallet());
        final BigInteger buyerWalletNumber = Base58.decodeToBigInteger(didTransferRequest.buyerWallet());
        final boolean isOwnerLower = ownerWalletNumber.compareTo(buyerWalletNumber) < 0;

        final BigInteger lowerWalletNumber = isOwnerLower ? ownerWalletNumber : buyerWalletNumber;
        final BigInteger upperWalletNumber = isOwnerLower ? buyerWalletNumber : ownerWalletNumber;
        final RpcGetProgramAccountsResultResponse response = web3Service.getProgramAccountsResult(
                web3Props.didProgramId(),
                MemcmpDto.builder()
                        .offset(8)
                        .bytes(Base58.encode(lowerWalletNumber.toByteArray()))
                        .build(),
                MemcmpDto.builder()
                        .offset(8 + 32)
                        .bytes(Base58.encode(upperWalletNumber.toByteArray()))
                        .build()
        );
        if (response.result().isEmpty()) {
            throw new CommonException(DidTransferErrorCode.NOT_FOUND_DID_ACCOUNT);
        }

        final var result = response.result().get(0);
        final ByteBuffer byteBuffer = ByteBuffer.wrap(Base58.decode(result.account().data())).order(ByteOrder.LITTLE_ENDIAN);
        final long lowerId = byteBuffer.getLong(8 + 32 + 32);
        final long upperId = byteBuffer.getLong(8 + 32 + 32 + 8);
        final long ownerId = isOwnerLower ? lowerId : upperId;
        final long buyerId = isOwnerLower ? upperId : lowerId;
        if (ownerId != didTransferRequest.ownerId()) {
            throw new CommonException(DidTransferErrorCode.NOT_MATCH_DID_OWNER_ID);
        }
        if (buyerId != didTransferRequest.buyerId()) {
            throw new CommonException(DidTransferErrorCode.NOT_MATCH_DID_BUYER_ID);
        }
        return didTransferRepository
                .save(didTransferMapper.toEntity(didTransferRequest))
                .getId();
    }
}

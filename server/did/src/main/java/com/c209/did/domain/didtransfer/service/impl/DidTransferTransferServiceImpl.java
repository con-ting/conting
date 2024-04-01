package com.c209.did.domain.didtransfer.service.impl;

import com.c209.did.domain.didtransfer.data.dto.request.DidTransferRequest;
import com.c209.did.domain.didtransfer.data.dto.response.DidTransferResponse;
import com.c209.did.domain.didtransfer.data.mapper.DidTransferMapper;
import com.c209.did.domain.didtransfer.exception.DidTransferErrorCode;
import com.c209.did.domain.didtransfer.repository.DidTransferRepository;
import com.c209.did.domain.didtransfer.service.DidTransferService;
import com.c209.did.global.error.CommonException;
import com.c209.did.global.web3.Web3Service;
import com.c209.did.global.web3.dto.MemcmpDto;
import com.c209.did.global.web3.dto.response.RpcGetProgramAccountsResultResponse;
import com.c209.did.lib.Base58;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class DidTransferTransferServiceImpl implements DidTransferService {
    private final DidTransferRepository didTransferRepository;
    private final DidTransferMapper didTransferMapper;
    private final Web3Service web3Service;

    @Override
    public List<DidTransferResponse> getDidListByBuyerId(Long buyerId) {
        return didTransferRepository.findAllByBuyerId(buyerId).stream()
                .map(didTransferMapper::toResponse)
                .toList();
    }

    @Override
    public void createDid(DidTransferRequest didTransferRequest, Long userId) {
        if (!Objects.equals(didTransferRequest.ownerId(), userId)) {
            throw new CommonException(DidTransferErrorCode.BAD_REQUEST_DID_OWNER_ID);
        }

        BigInteger ownerWalletNumber = Base58.decodeToBigInteger(didTransferRequest.ownerWallet());
        BigInteger buyerWalletNumber = Base58.decodeToBigInteger(didTransferRequest.buyerWallet());

        BigInteger lowerWalletNumber;
        BigInteger upperWalletNumber;
        Long lowerId;
        Long upperId;
        if (ownerWalletNumber.compareTo(buyerWalletNumber) < 0) {
            lowerWalletNumber = ownerWalletNumber;
            upperWalletNumber = buyerWalletNumber;
            lowerId = didTransferRequest.ownerId();
            upperId = didTransferRequest.buyerId();
        } else {
            lowerWalletNumber = buyerWalletNumber;
            upperWalletNumber = ownerWalletNumber;
            lowerId = didTransferRequest.buyerId();
            upperId = didTransferRequest.ownerId();
        }
        RpcGetProgramAccountsResultResponse response = web3Service.getProgramAccountsResult(
                MemcmpDto.builder()
                        .offset(8L)
                        .bytes(Base58.encode(lowerWalletNumber.toByteArray()))
                        .build(),
                MemcmpDto.builder()
                        .offset(8L + 32L)
                        .bytes(Base58.encode(upperWalletNumber.toByteArray()))
                        .build()
        );
        if (response.result().isEmpty()) {
            throw new CommonException(DidTransferErrorCode.NOT_FOUND_DID_ACCOUNT);
        }
    }
}

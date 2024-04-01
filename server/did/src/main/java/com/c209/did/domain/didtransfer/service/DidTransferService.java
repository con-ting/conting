package com.c209.did.domain.didtransfer.service;

import com.c209.did.domain.didtransfer.data.dto.request.DidTransferRequest;
import com.c209.did.domain.didtransfer.data.dto.response.DidTransferResponse;

import java.util.List;

public interface DidTransferService {
    List<DidTransferResponse> getDidListByBuyerId(Long userId);

    void createDid(DidTransferRequest didTransferRequest, Long userId);
}

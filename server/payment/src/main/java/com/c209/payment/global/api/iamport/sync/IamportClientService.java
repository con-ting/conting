package com.c209.payment.global.api.iamport.sync;


import com.c209.payment.global.api.iamport.dto.request.CreateIamportAccessTokenRequest;
import com.c209.payment.global.api.iamport.dto.request.PreparePaymentRequest;
import com.c209.payment.global.api.iamport.dto.response.CreateIamportAccessTokenResponse;
import com.c209.payment.global.api.iamport.dto.response.PaymentResponse;
import com.c209.payment.global.api.iamport.dto.response.PreparePaymentResponse;
import com.c209.payment.global.exception.CommonException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class IamportClientService {
    private final IamportClient iamportClient;

    @Value("${iamport.apiKey}")
    private String IMP_KEY;

    @Value("${iamport.secret}")
    private String IMP_SECRET;


    private CreateIamportAccessTokenResponse requestAccessToken(){
        return iamportClient.createAccessToken(
                CreateIamportAccessTokenRequest
                        .builder()
                        .impKey(IMP_KEY)
                        .impSecret(IMP_SECRET)
                        .build()
        );
    }


    public String getAccessToken(){
        CreateIamportAccessTokenResponse response = requestAccessToken();
        if(response.code()==0){
            return response.response().accessToken();
        }else{
            log.error("인증 토큰을 받아오는 중 에러가 발생했습니다. code :: {} message :: {}", response.code(), response.message());
            throw new CommonException( "아이엠 포트 액세스 토큰을 받아오는 중 에러가 발생햇습니다.", HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    public PaymentResponse getPayment(String impUid){
        return iamportClient.getPayment(getAccessToken(), impUid );
    }

    public PreparePaymentResponse prepare(PreparePaymentRequest request){
        return iamportClient.preparePayment(getAccessToken(), request);
    }







}

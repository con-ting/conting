package com.c209.did.domain.didtransfer.data.mapper;

import com.c209.did.domain.didtransfer.data.dto.response.DidTransferResponse;
import com.c209.did.domain.didtransfer.data.entity.DidTransferEntity;
import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

@Mapper(componentModel = "spring",
        injectionStrategy = InjectionStrategy.CONSTRUCTOR,
        unmappedTargetPolicy = ReportingPolicy.ERROR)
public interface DidTransferMapper {
    DidTransferResponse toResponse(DidTransferEntity did);

    DidTransferEntity toEntity(DidTransferResponse didTransferResponse);
}

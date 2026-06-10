package com.corely.corely_backend.mapper;

import com.corely.corely_backend.dto.request.store.StoreCreationRequest;
import com.corely.corely_backend.dto.response.store.StoreResponse;
import com.corely.corely_backend.entity.Store;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface StoreMapper {
    @Mapping(target = "owner", ignore = true)
    Store toStore(StoreCreationRequest request);

    @Mapping(source = "owner.id", target = "ownerId")
    StoreResponse toStoreResponse(Store store);
}
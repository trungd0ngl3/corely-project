package com.corely.corely_backend.mapper;

import com.corely.corely_backend.dto.response.WishlistResponse;
import com.corely.corely_backend.entity.WishlistItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", uses = {ProductMapper.class})
public interface WishlistMapper {
    @Mapping(source = "product", target = "product")
    WishlistResponse toWishlistResponse(WishlistItem wishlistItem);
}

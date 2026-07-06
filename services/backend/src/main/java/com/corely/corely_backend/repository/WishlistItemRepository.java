package com.corely.corely_backend.repository;

import com.corely.corely_backend.entity.WishlistItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.UUID;

@Repository
public interface WishlistItemRepository extends JpaRepository<WishlistItem, Long> {
    void deleteByWishlistIdAndProductId(String wishlistId, UUID productId);
    boolean existsByWishlistIdAndProductId(String wishlistId, UUID productId);
}
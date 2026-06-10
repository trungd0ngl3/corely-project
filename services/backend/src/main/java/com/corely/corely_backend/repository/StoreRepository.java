package com.corely.corely_backend.repository;

import com.corely.corely_backend.entity.Store;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
import java.util.Optional;

@Repository
public interface StoreRepository extends JpaRepository<Store, UUID> {
    Optional<Store> findByOwnerId(UUID ownerId);

    Optional<Store> findBySlug(String slug);

    boolean existsByName(String name);

    boolean existsBySlug(String slug);
}
package com.corely.corely_backend.service;

import com.corely.corely_backend.dto.request.store.StoreCreationRequest;
import com.corely.corely_backend.dto.response.store.StoreResponse;
import com.corely.corely_backend.entity.Store;
import com.corely.corely_backend.entity.User;
import com.corely.corely_backend.exception.AppException;
import com.corely.corely_backend.exception.ErrorCode;
import com.corely.corely_backend.mapper.StoreMapper;
import com.corely.corely_backend.repository.StoreRepository;
import com.corely.corely_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class StoreService {

    StoreRepository storeRepository;
    UserRepository userRepository;
    StoreMapper storeMapper;

    public StoreResponse createStore(StoreCreationRequest request) {
        if (storeRepository.existsByName(request.getName())) {
            throw new AppException(ErrorCode.STORE_EXISTED);
        }

        User owner = userRepository.findById(request.getOwnerId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        // One user can only own one store for now
        if (storeRepository.findByOwnerId(owner.getId()).isPresent()) {
            throw new AppException(ErrorCode.STORE_EXISTED); // We can create a new code ONE_STORE_PER_USER
        }

        Store store = storeMapper.toStore(request);
        store.setOwner(owner);
        // generate slug
        store.setSlug(generateSlug(request.getName()));

        store = storeRepository.save(store);
        return storeMapper.toStoreResponse(store);
    }

    public StoreResponse getStoreBySlug(String slug) {
        Store store = storeRepository.findBySlug(slug)
                .orElseThrow(() -> new AppException(ErrorCode.STORE_NOT_FOUND));
        return storeMapper.toStoreResponse(store);
    }

    private String generateSlug(String name) {
        String slug = name.toLowerCase().replaceAll("[^a-z0-9]+", "-");
        // ensure uniqueness
        int count = 1;
        String originalSlug = slug;
        while (storeRepository.existsBySlug(slug)) {
            slug = originalSlug + "-" + count++;
        }
        return slug;
    }
}
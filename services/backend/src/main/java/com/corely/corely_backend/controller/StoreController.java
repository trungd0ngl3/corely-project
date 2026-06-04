package com.corely.corely_backend.controller;

import com.corely.corely_backend.dto.request.store.StoreCreationRequest;
import com.corely.corely_backend.dto.response.store.StoreResponse;
import com.corely.corely_backend.service.StoreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/stores")
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class StoreController {

    StoreService storeService;

    @PostMapping
    public ResponseEntity<StoreResponse> createStore(@RequestBody @Valid StoreCreationRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(storeService.createStore(request));
    }

    @GetMapping("/{slug}")
    public ResponseEntity<StoreResponse> getStoreBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(storeService.getStoreBySlug(slug));
    }
}
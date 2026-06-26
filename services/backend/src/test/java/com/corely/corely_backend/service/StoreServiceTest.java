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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.Optional;
import java.util.UUID;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("StoreService Tests")
class StoreServiceTest {

    @InjectMocks
    private StoreService storeService;

    @Mock
    private StoreRepository storeRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private StoreMapper storeMapper;

    private User testUser;
    private Store testStore;
    private UUID userId;
    private UUID storeId;

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        storeId = UUID.randomUUID();

        testUser = User.builder()
                .id(userId)
                .email("owner@example.com")
                .fullName("Store Owner")
                .build();

        testStore = Store.builder()
                .id(storeId)
                .name("Test Store")
                .slug("test-store")
                .owner(testUser)
                .build();

        SecurityContext securityContext = mock(SecurityContext.class);
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn(userId.toString());
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    @DisplayName("should create store successfully")
    void testCreateStore_Success() {
        StoreCreationRequest request = StoreCreationRequest.builder()
                .name("New Store")
                .description("A new test store")
                .build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(testUser));
        when(storeRepository.existsBySlug(anyString())).thenReturn(false);
        when(storeMapper.toStore(request)).thenReturn(testStore);
        when(storeRepository.save(any(Store.class))).thenReturn(testStore);
        when(storeMapper.toStoreResponse(testStore))
                .thenReturn(StoreResponse.builder().name("New Store").build());

        StoreResponse response = storeService.createStore(request);

        assertThat(response).isNotNull();
        verify(storeRepository).save(any(Store.class));
    }

    @Test
    @DisplayName("should generate unique slug for store")
    void testCreateStore_GenerateUniqueSlug() {
        StoreCreationRequest request = StoreCreationRequest.builder()
                .name("Test Store")
                .build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(testUser));
        when(storeRepository.existsBySlug("test-store")).thenReturn(true);
        when(storeRepository.existsBySlug("test-store-1")).thenReturn(false);
        when(storeMapper.toStore(request)).thenReturn(testStore);
        when(storeRepository.save(any(Store.class))).thenReturn(testStore);
        when(storeMapper.toStoreResponse(testStore)).thenReturn(StoreResponse.builder().build());

        storeService.createStore(request);

        ArgumentCaptor<Store> storeCaptor = ArgumentCaptor.forClass(Store.class);
        verify(storeRepository).save(storeCaptor.capture());

        assertThat(storeCaptor.getValue().getSlug()).isEqualTo("test-store-1");
    }

    @Test
    @DisplayName("should get store by slug")
    void testGetStoreBySlug_Success() {
        when(storeRepository.findBySlug("test-store")).thenReturn(Optional.of(testStore));
        when(storeMapper.toStoreResponse(testStore))
                .thenReturn(StoreResponse.builder().name("Test Store").build());

        StoreResponse response = storeService.getStoreBySlug("test-store");

        assertThat(response).isNotNull();
        assertThat(response.getName()).isEqualTo("Test Store");
        verify(storeRepository).findBySlug("test-store");
    }

    @Test
    @DisplayName("should throw exception when store by slug not found")
    void testGetStoreBySlug_NotFound() {
        when(storeRepository.findBySlug("nonexistent")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> storeService.getStoreBySlug("nonexistent"))
                .isInstanceOf(AppException.class)
                .hasFieldOrPropertyWithValue("errorCode", ErrorCode.STORE_NOT_FOUND);
    }
}
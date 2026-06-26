package com.corely.corely_backend.service;

import com.corely.corely_backend.dto.request.PermissionRequest;
import com.corely.corely_backend.dto.response.auth.PermissionResponse;
import com.corely.corely_backend.entity.Permission;
import com.corely.corely_backend.mapper.PermissionMapper;
import com.corely.corely_backend.repository.PermissionRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.UUID;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("PermissionService Tests")
class PermissionServiceTest {

    @InjectMocks
    private PermissionService permissionService;

    @Mock
    private PermissionRepository permissionRepository;

    @Mock
    private PermissionMapper permissionMapper;

    private Permission testPermission;

    @BeforeEach
    void setUp() {
        testPermission = Permission.builder()
                .name("READ_PRODUCT")
                .build();
    }

    @Test
    @DisplayName("should create permission successfully")
    void testCreatePermission_Success() {
        PermissionRequest request = PermissionRequest.builder()
                .name("READ_PRODUCT")
                .build();

        when(permissionMapper.toPermission(request)).thenReturn(testPermission);
        when(permissionRepository.save(any(Permission.class))).thenReturn(testPermission);
        when(permissionMapper.toPermissionResponse(testPermission))
                .thenReturn(PermissionResponse.builder().name("READ_PRODUCT").build());

        PermissionResponse response = permissionService.create(request);

        assertThat(response).isNotNull();
        assertThat(response.getName()).isEqualTo("READ_PRODUCT");
        verify(permissionRepository).save(any(Permission.class));
    }

    @Test
    @DisplayName("should get all permissions")
    void testGetAllPermissions_Success() {
        Permission perm1 = testPermission;
        Permission perm2 = Permission.builder()
                .name("CREATE_PRODUCT")
                .build();

        when(permissionRepository.findAll()).thenReturn(List.of(perm1, perm2));
        when(permissionMapper.toPermissionResponse(perm1))
                .thenReturn(PermissionResponse.builder().name("READ_PRODUCT").build());
        when(permissionMapper.toPermissionResponse(perm2))
                .thenReturn(PermissionResponse.builder().name("CREATE_PRODUCT").build());

        List<PermissionResponse> responses = permissionService.getAll();

        assertThat(responses).hasSize(2);
        verify(permissionRepository).findAll();
    }

    @Test
    @DisplayName("should delete permission by name")
    void testDeletePermission_Success() {
        permissionService.delete("READ_PRODUCT");

        verify(permissionRepository).deleteById("READ_PRODUCT");
    }
}
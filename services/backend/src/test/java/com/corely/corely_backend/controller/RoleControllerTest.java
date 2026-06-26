package com.corely.corely_backend.controller;

import com.corely.corely_backend.dto.request.RoleRequest;
import com.corely.corely_backend.dto.response.auth.RoleResponse;
import com.corely.corely_backend.service.RoleService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Set;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(RoleController.class)
@org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc(addFilters = false)
class RoleControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockitoBean
    RoleService roleService;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    void createRole_success() throws Exception {
        RoleRequest request = RoleRequest.builder()
                .name("ADMIN")
                .description("Admin role")
                .permissions(Set.of("READ", "WRITE"))
                .build();

        RoleResponse response = RoleResponse.builder()
                .name("ADMIN")
                .description("Admin role")
                .build();

        when(roleService.create(any())).thenReturn(response);

        mockMvc.perform(post("/api/v1/roles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.name").value("ADMIN"));
    }

    @Test
    void getAllRoles_success() throws Exception {
        when(roleService.getAll()).thenReturn(List.of());

        mockMvc.perform(get("/api/v1/roles"))
                .andExpect(status().isOk());
    }

    @Test
    void deleteRole_success() throws Exception {
        mockMvc.perform(delete("/api/v1/roles/ADMIN")
                        .contentType(MediaType.TEXT_PLAIN)
                        .content("ADMIN"))
                .andExpect(status().isOk());
    }
}
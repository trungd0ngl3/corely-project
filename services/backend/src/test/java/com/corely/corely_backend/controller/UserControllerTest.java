package com.corely.corely_backend.controller;

import com.corely.corely_backend.dto.request.UserCreationRequest;
import com.corely.corely_backend.dto.request.UserUpdateRequest;
import com.corely.corely_backend.dto.response.auth.UserResponse;
import com.corely.corely_backend.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import org.springframework.security.test.context.support.WithMockUser;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(UserController.class)
@org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc(addFilters = false)
class UserControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockitoBean
    UserService userService;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    void createUser_success() throws Exception {
        UserCreationRequest request = UserCreationRequest.builder()
                .email("test@example.com")
                .password("password123")
                .fullName("Test User")
                .build();

        UserResponse response = UserResponse.builder()
                .email("test@example.com")
                .fullName("Test User")
                .build();

        when(userService.createUser(any())).thenReturn(response);

        mockMvc.perform(post("/api/v1/users")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.email").value("test@example.com"));
    }

    @Test
    @WithMockUser(roles = "ADMIN")
    void getUsers_success() throws Exception {
        when(userService.getUsers()).thenReturn(List.of());

        mockMvc.perform(get("/api/v1/users"))
                .andExpect(status().isOk());
    }

    @Test
    @WithMockUser
    void getUser_success() throws Exception {
        UserResponse response = UserResponse.builder()
                .email("test@example.com")
                .build();

        when(userService.getUser(anyString())).thenReturn(response);

        mockMvc.perform(get("/api/v1/users/user-id"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.email").value("test@example.com"));
    }

    @Test
    @WithMockUser
    void getMyInfo_success() throws Exception {
        UserResponse response = UserResponse.builder()
                .email("test@example.com")
                .build();

        when(userService.getMyInfo()).thenReturn(response);

        mockMvc.perform(get("/api/v1/users/myinfo"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.email").value("test@example.com"));
    }

    @Test
    @WithMockUser
    void updateUser_success() throws Exception {
        UserUpdateRequest request = UserUpdateRequest.builder()
                .fullName("Updated Name")
                .build();

        UserResponse response = UserResponse.builder()
                .fullName("Updated Name")
                .build();

        when(userService.updateUser(anyString(), any())).thenReturn(response);

        mockMvc.perform(put("/api/v1/users/user-id")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.fullName").value("Updated Name"));
    }

    @Test
    void deleteUser_success() throws Exception {
        mockMvc.perform(delete("/api/v1/users/user-id"))
                .andExpect(status().isOk());
    }
}
package com.corely.corely_backend.controller;

import com.corely.corely_backend.dto.request.AuthenticateRequest;
import com.corely.corely_backend.dto.request.IntrospectRequest;
import com.corely.corely_backend.dto.request.LogoutRequest;
import com.corely.corely_backend.dto.request.RefreshTokenRequest;
import com.corely.corely_backend.dto.request.UserCreationRequest;
import com.corely.corely_backend.dto.response.auth.AuthenticateResponse;
import com.corely.corely_backend.dto.response.auth.IntrospectResponse;
import com.corely.corely_backend.service.AuthenticationService;
import com.corely.corely_backend.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
@org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc(addFilters = false)
class AuthControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockitoBean
    AuthenticationService authenticationService;

    @MockitoBean
    UserService userService;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    void register_success() throws Exception {
        UserCreationRequest request = UserCreationRequest.builder()
                .email("test@example.com")
                .password("password123")
                .build();

        when(userService.createUser(any())).thenReturn(null);

        mockMvc.perform(post("/api/auth/register")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(1000))
                .andExpect(jsonPath("$.message").value("User registered successfully"));
    }

    @Test
    void login_success() throws Exception {
        AuthenticateRequest request = new AuthenticateRequest();
        request.setEmail("test@example.com");
        request.setPassword("password123");

        AuthenticateResponse response = AuthenticateResponse.builder()
                .token("jwt-token-here")
                .build();

        when(authenticationService.authenticate(any())).thenReturn(response);

        mockMvc.perform(post("/api/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.token").value("jwt-token-here"));
    }

    @Test
    void introspect_success() throws Exception {
        IntrospectRequest request = new IntrospectRequest();
        request.setToken("some-token");

        IntrospectResponse response = IntrospectResponse.builder()
                .isValid(true)
                .build();

        when(authenticationService.introspect(any())).thenReturn(response);

        mockMvc.perform(post("/api/auth/introspect")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.valid").value(true));
    }

    @Test
    void logout_success() throws Exception {
        LogoutRequest request = new LogoutRequest();
        request.setToken("some-token");

        doNothing().when(authenticationService).logout(any());

        mockMvc.perform(post("/api/auth/logout")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(1000))
                .andExpect(jsonPath("$.message").value("Logged out successfully"));
    }
}
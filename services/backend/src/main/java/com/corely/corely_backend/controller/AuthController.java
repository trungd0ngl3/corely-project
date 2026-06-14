package com.corely.corely_backend.controller;

import com.corely.corely_backend.dto.request.*;
import com.corely.corely_backend.dto.response.ApiResponse;
import com.corely.corely_backend.dto.response.AuthenticateResponse;
import com.corely.corely_backend.dto.response.IntrospectResponse;
import com.corely.corely_backend.service.AuthenticationService;
import com.corely.corely_backend.service.UserService;
import com.nimbusds.jose.JOSEException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthenticationService authenticationService;
    private final UserService userService;

    @PostMapping("/register")
    ApiResponse<Void> register(@RequestBody @Valid UserCreationRequest request) {
        userService.createUser(request);
        return ApiResponse.<Void>builder()
                .code(1000)
                .message("User registered successfully")
                .build();
    }

    @PostMapping("/login")
    ApiResponse<AuthenticateResponse> login(@RequestBody AuthenticateRequest request) {
        var result = authenticationService.authenticate(request);
        return ApiResponse.<AuthenticateResponse>builder()
                .code(1000)
                .result(result)
                .build();
    }

    @PostMapping("/introspect")
    ApiResponse<IntrospectResponse> introspect(@RequestBody IntrospectRequest request) {
        var result = authenticationService.introspect(request);
        return ApiResponse.<IntrospectResponse>builder()
                .code(1000)
                .result(result)
                .build();
    }

    @PostMapping("/refresh")
    ApiResponse<AuthenticateResponse> refresh(@RequestBody RefreshTokenRequest request)
            throws ParseException, JOSEException {
        var result = authenticationService.refreshToken(request.getToken());
        return ApiResponse.<AuthenticateResponse>builder()
                .code(1000)
                .result(result)
                .build();
    }

    @PostMapping("/logout")
    ApiResponse<Void> logout(@RequestBody LogoutRequest request) throws ParseException, JOSEException {
        authenticationService.logout(request);
        return ApiResponse.<Void>builder()
                .code(1000)
                .message("Logged out successfully")
                .build();
    }
}
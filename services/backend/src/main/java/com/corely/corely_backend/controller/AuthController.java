package com.corely.corely_backend.controller;

import com.corely.corely_backend.dto.request.auth.*;
import com.corely.corely_backend.dto.request.auth.UserCreationRequest;
import com.corely.corely_backend.dto.response.ApiResponse;
import com.corely.corely_backend.dto.response.auth.AuthenticateResponse;
import com.corely.corely_backend.dto.response.auth.IntrospectResponse;
import com.corely.corely_backend.dto.response.auth.UserResponse;
import com.corely.corely_backend.service.AuthenticationService;
import com.nimbusds.jose.JOSEException;
import jakarta.validation.Valid;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.*;

import java.text.ParseException;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthController {
    AuthenticationService authenticationService;

    @PostMapping("/register")
    public ApiResponse<UserResponse> register(@RequestBody @Valid UserCreationRequest request) {
        return ApiResponse.<UserResponse>builder()
                .code(1000)
                .result(authenticationService.register(request))
                .message("User registered successfully")
                .build();
    }

    @PostMapping("/login")
    public ApiResponse<AuthenticateResponse> login(@RequestBody @Valid AuthenticateRequest request) {
        return ApiResponse.<AuthenticateResponse>builder()
                .code(1000)
                .result(authenticationService.authenticate(request))
                .build();
    }

    @PostMapping("/tokens/introspect")
    public ApiResponse<IntrospectResponse> introspect(@RequestBody @Valid IntrospectRequest request) {
        return ApiResponse.<IntrospectResponse>builder()
                .code(1000)
                .result(authenticationService.introspect(request))
                .build();
    }

    @PostMapping("/tokens/refresh")
    public ApiResponse<AuthenticateResponse> refresh(@RequestBody @Valid RefreshTokenRequest request)
            throws ParseException, JOSEException {
        return ApiResponse.<AuthenticateResponse>builder()
                .code(1000)
                .result(authenticationService.refreshToken(request.getToken()))
                .build();
    }

    @PostMapping("/tokens/logout")
    public ApiResponse<Void> logout(@RequestBody @Valid LogoutRequest request){
        authenticationService.logout(request);
        return ApiResponse.<Void>builder()
                .code(1000)
                .message("Logged out successfully")
                .build();
    }

    @GetMapping("/verify-email")
    public ApiResponse<Void> verifyEmail(@RequestParam String token) {
        authenticationService.verifyEmail(token);
        return ApiResponse.<Void>builder()
                .code(1000)
                .message("Email verified successfully")
                .build();
    }

    @PostMapping("/resend-verification")
    public ApiResponse<Void> resendVerification(@RequestBody @Valid ResendVerificationRequest request) {
        authenticationService.resendVerification(request);
        return ApiResponse.<Void>builder()
                .code(1000)
                .message("Verification email sent successfully")
                .build();
    }
}

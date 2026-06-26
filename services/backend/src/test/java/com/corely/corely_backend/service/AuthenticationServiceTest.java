package com.corely.corely_backend.service;

import com.corely.corely_backend.dto.request.AuthenticateRequest;
import com.corely.corely_backend.dto.request.IntrospectRequest;
import com.corely.corely_backend.dto.request.LogoutRequest;
import com.corely.corely_backend.dto.response.auth.AuthenticateResponse;
import com.corely.corely_backend.dto.response.auth.IntrospectResponse;
import com.corely.corely_backend.entity.InvalidatedToken;
import com.corely.corely_backend.entity.Permission;
import com.corely.corely_backend.entity.Role;
import com.corely.corely_backend.entity.User;
import com.corely.corely_backend.exception.AppException;
import com.corely.corely_backend.exception.ErrorCode;
import com.corely.corely_backend.repository.InvalidatedTokenRepository;
import com.corely.corely_backend.repository.UserRepository;
import com.nimbusds.jose.JOSEException;
import com.nimbusds.jwt.SignedJWT;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.util.ReflectionTestUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("AuthenticationService Tests")
class AuthenticationServiceTest {

    @InjectMocks
    private AuthenticationService authenticationService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private InvalidatedTokenRepository invalidatedTokenRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    private User testUser;
    private String testPassword = "password123";
    private String hashedPassword = "$2a$10$hashedpassword";
    private String signerKey = "a8f5e3c1b7d4a9f2e6c3b1a8d7f5e2c9a8f5e3c1b7d4a9f2e6c3b1a8d7f5";

    @BeforeEach
    void setUp() {
        ReflectionTestUtils.setField(authenticationService, "SIGNER_KEY", signerKey);
        ReflectionTestUtils.setField(authenticationService, "VALID_DURATION", 3600L);
        ReflectionTestUtils.setField(authenticationService, "REFRESHABLE_DURATION", 604800L);

        testUser = User.builder()
                .id(UUID.randomUUID())
                .email("test@example.com")
                .password(hashedPassword)
                .fullName("Test User")
                .build();
    }

    @Test
    @DisplayName("should authenticate user with correct credentials")
    void testAuthenticate_Success() {
        AuthenticateRequest request = AuthenticateRequest.builder()
                .email("test@example.com")
                .password(testPassword)
                .build();

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches(testPassword, hashedPassword)).thenReturn(true);

        AuthenticateResponse response = authenticationService.authenticate(request);

        assertThat(response).isNotNull();
        assertThat(response.isAuth()).isTrue();
        assertThat(response.getToken()).isNotBlank();
        verify(userRepository).findByEmail("test@example.com");
        verify(passwordEncoder).matches(testPassword, hashedPassword);
    }

    @Test
    @DisplayName("should throw exception when user not found")
    void testAuthenticate_UserNotFound() {
        AuthenticateRequest request = AuthenticateRequest.builder()
                .email("nonexistent@example.com")
                .password(testPassword)
                .build();

        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authenticationService.authenticate(request))
                .isInstanceOf(AppException.class)
                .hasFieldOrPropertyWithValue("errorCode", ErrorCode.USER_NOT_FOUND);

        verify(userRepository).findByEmail("nonexistent@example.com");
    }

    @Test
    @DisplayName("should throw exception when password is incorrect")
    void testAuthenticate_WrongPassword() {
        AuthenticateRequest request = AuthenticateRequest.builder()
                .email("test@example.com")
                .password("wrongpassword")
                .build();

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(passwordEncoder.matches("wrongpassword", hashedPassword)).thenReturn(false);

        assertThatThrownBy(() -> authenticationService.authenticate(request))
                .isInstanceOf(AppException.class)
                .hasFieldOrPropertyWithValue("errorCode", ErrorCode.UNAUTHENTICATED);

        verify(passwordEncoder).matches("wrongpassword", hashedPassword);
    }

    @Test
    @DisplayName("should generate valid token with correct claims")
    void testGenerateToken_Success() throws JOSEException, ParseException {
        Role role = Role.builder()
                .name("USER")
                .build();
        testUser.setRoles(Set.of(role));

        String token = authenticationService.generateToken(testUser);

        assertThat(token).isNotBlank();
        
        SignedJWT signedJWT = SignedJWT.parse(token);
        assertThat(signedJWT.getJWTClaimsSet().getSubject()).isEqualTo("test@example.com");
        assertThat(signedJWT.getJWTClaimsSet().getIssuer()).isEqualTo("corely-backend");
        assertThat(signedJWT.getJWTClaimsSet().getStringClaim("userId"))
                .isEqualTo(testUser.getId().toString());
        assertThat(signedJWT.getJWTClaimsSet().getClaim("scope"))
                .asString().contains("ROLE_USER");
    }

    @Test
    @DisplayName("should include permissions in token scope")
    void testGenerateToken_WithPermissions() throws JOSEException, ParseException {
        Permission permission = Permission.builder()
                .name("CREATE_PRODUCT")
                .build();
        Role role = Role.builder()
                .name("ADMIN")
                .permissions(Set.of(permission))
                .build();
        testUser.setRoles(Set.of(role));

        String token = authenticationService.generateToken(testUser);

        SignedJWT signedJWT = SignedJWT.parse(token);
        String scope = signedJWT.getJWTClaimsSet().getStringClaim("scope");
        assertThat(scope).contains("ROLE_ADMIN", "CREATE_PRODUCT");
    }

    @Test
    @DisplayName("should verify valid token")
    void testVerifyToken_Valid() throws JOSEException, ParseException {
        String token = authenticationService.generateToken(testUser);
        when(invalidatedTokenRepository.existsById(anyString())).thenReturn(false);

        SignedJWT result = authenticationService.verifyToken(token, false);

        assertThat(result).isNotNull();
        assertThat(result.getJWTClaimsSet().getSubject()).isEqualTo("test@example.com");
    }

    @Test
    @DisplayName("should throw exception for invalid token signature")
    void testVerifyToken_InvalidSignature() {
        String invalidToken = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0QGV4YW1wbGUuY29tIiwiaWF0IjoxNjI0OTAwMDAwLCJleHAiOjE2MjQ5MDM2MDB9.invalid";

        assertThatThrownBy(() -> authenticationService.verifyToken(invalidToken, false))
                .isInstanceOf(AppException.class)
                .hasFieldOrPropertyWithValue("errorCode", ErrorCode.UNAUTHENTICATED);
    }

    @Test
    @DisplayName("should throw exception when token is invalidated")
    void testVerifyToken_Invalidated() throws JOSEException, ParseException {
        String token = authenticationService.generateToken(testUser);
        SignedJWT signedJWT = SignedJWT.parse(token);
        String jwtId = signedJWT.getJWTClaimsSet().getJWTID();

        when(invalidatedTokenRepository.existsById(jwtId)).thenReturn(true);

        assertThatThrownBy(() -> authenticationService.verifyToken(token, false))
                .isInstanceOf(AppException.class)
                .hasFieldOrPropertyWithValue("errorCode", ErrorCode.UNAUTHENTICATED);
    }

    @Test
    @DisplayName("should refresh token successfully")
    void testRefreshToken_Success() throws JOSEException, ParseException {
        String oldToken = authenticationService.generateToken(testUser);
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(invalidatedTokenRepository.existsById(anyString())).thenReturn(false);

        AuthenticateResponse response = authenticationService.refreshToken(oldToken);

        assertThat(response).isNotNull();
        assertThat(response.isAuth()).isTrue();
        assertThat(response.getToken()).isNotBlank();
        assertThat(response.getToken()).isNotEqualTo(oldToken);
        
        verify(invalidatedTokenRepository).save(any(InvalidatedToken.class));
    }

    @Test
    @DisplayName("should throw exception when user not found during refresh")
    void testRefreshToken_UserNotFound() throws JOSEException, ParseException {
        String token = authenticationService.generateToken(testUser);
        when(invalidatedTokenRepository.existsById(anyString())).thenReturn(false);
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> authenticationService.refreshToken(token))
                .isInstanceOf(AppException.class)
                .hasFieldOrPropertyWithValue("errorCode", ErrorCode.USER_NOT_FOUND);
    }

    @Test
    @DisplayName("should logout user and invalidate token")
    void testLogout_Success() throws JOSEException, ParseException {
        String token = authenticationService.generateToken(testUser);
        when(invalidatedTokenRepository.existsById(anyString())).thenReturn(false);

        authenticationService.logout(LogoutRequest.builder().token(token).build());

        verify(invalidatedTokenRepository).save(any(InvalidatedToken.class));
    }

    @Test
    @DisplayName("should handle logout with already invalidated token gracefully")
    void testLogout_AlreadyInvalidated() throws JOSEException, ParseException {
        String token = authenticationService.generateToken(testUser);
        when(invalidatedTokenRepository.existsById(anyString())).thenReturn(true);

        // Should not throw exception
        assertThatNoException().isThrownBy(() ->
                authenticationService.logout(LogoutRequest.builder().token(token).build())
        );
    }

    @Test
    @DisplayName("should introspect valid token")
    void testIntrospect_ValidToken() throws JOSEException, ParseException {
        String token = authenticationService.generateToken(testUser);
        when(invalidatedTokenRepository.existsById(anyString())).thenReturn(false);

        IntrospectResponse response = authenticationService.introspect(
                IntrospectRequest.builder().token(token).build()
        );

        assertThat(response).isNotNull();
        assertThat(response.isValid()).isTrue();
    }

    @Test
    @DisplayName("should introspect invalid token")
    void testIntrospect_InvalidToken() {
        IntrospectResponse response = authenticationService.introspect(
                IntrospectRequest.builder().token("invalid.token.here").build()
        );

        assertThat(response).isNotNull();
        assertThat(response.isValid()).isFalse();
    }

    @Test
    @DisplayName("should build scope with roles and permissions")
    void testBuildScope_WithRolesAndPermissions() {
        Permission perm1 = Permission.builder().name("READ_PRODUCT").build();
        Permission perm2 = Permission.builder().name("DELETE_PRODUCT").build();
        
        Role role1 = Role.builder()
                .name("ADMIN")
                .permissions(Set.of(perm1, perm2))
                .build();
        
        Role role2 = Role.builder()
                .name("USER")
                .permissions(Collections.emptySet())
                .build();

        testUser.setRoles(Set.of(role1, role2));
        String token = authenticationService.generateToken(testUser);

        assertThat(token).isNotNull();
        // Verify token contains scope by parsing it
        try {
            SignedJWT signedJWT = SignedJWT.parse(token);
            String scope = signedJWT.getJWTClaimsSet().getStringClaim("scope");
            assertThat(scope).contains("ROLE_ADMIN", "ROLE_USER", "READ_PRODUCT", "DELETE_PRODUCT");
        } catch (ParseException e) {
            fail("Token parsing failed", e);
        }
    }

    @Test
    @DisplayName("should build empty scope when user has no roles")
    void testBuildScope_NoRoles() throws JOSEException, ParseException {
        testUser.setRoles(null);

        String token = authenticationService.generateToken(testUser);
        SignedJWT signedJWT = SignedJWT.parse(token);
        String scope = signedJWT.getJWTClaimsSet().getStringClaim("scope");

        assertThat(scope).isEmpty();
    }
}
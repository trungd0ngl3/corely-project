package com.corely.corely_backend.integration;

import com.corely.corely_backend.dto.request.AuthenticateRequest;
import com.corely.corely_backend.dto.request.IntrospectRequest;
import com.corely.corely_backend.dto.request.LogoutRequest;
import com.corely.corely_backend.dto.request.UserCreationRequest;
import com.corely.corely_backend.dto.response.ApiResponse;
import com.corely.corely_backend.dto.response.auth.AuthenticateResponse;
import com.corely.corely_backend.dto.response.auth.IntrospectResponse;
import com.corely.corely_backend.dto.response.auth.UserResponse;
import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

/**
 * True security integration test — boots full Spring context with
 * SecurityConfig, JWT filter, and real request processing via TestRestTemplate.
 *
 * Requires: H2 (test DB) + Redis running on localhost:6379.
 */
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@ActiveProfiles("test")
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class SecurityIntegrationTest {

    private static final String BASE = "/api/auth";
    private static final String USER_API = "/api/v1/users";
    private static final String TEST_EMAIL = "integration_test_user@example.com";
    private static final String TEST_PASSWORD = "securePass123";

    @Autowired
    TestRestTemplate client;

    // ── helpers ──────────────────────────────────────────────────────

    private HttpHeaders jsonHeaders() {
        HttpHeaders h = new HttpHeaders();
        h.setContentType(MediaType.APPLICATION_JSON);
        return h;
    }

    /**
     * Login via JSON body.
     */
    private String loginAndGetToken() {
        AuthenticateRequest loginRequest = new AuthenticateRequest(TEST_EMAIL, TEST_PASSWORD);
        HttpEntity<AuthenticateRequest> entity = new HttpEntity<>(loginRequest, jsonHeaders());

        ResponseEntity<ApiResponse<AuthenticateResponse>> resp = client.exchange(
                BASE + "/login",
                HttpMethod.POST,
                entity,
                new ParameterizedTypeReference<>() {}
        );

        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(resp.getBody()).isNotNull();
        assertThat(resp.getBody().getResult()).isNotNull();
        return resp.getBody().getResult().getToken();
    }

    private HttpEntity<Void> bearerHeader(String token) {
        HttpHeaders h = jsonHeaders();
        h.setBearerAuth(token);
        return new HttpEntity<>(h);
    }

    // ── tests ────────────────────────────────────────────────────────

    @Test
    @Order(1)
    void register_success() {
        UserCreationRequest req = UserCreationRequest.builder()
                .email(TEST_EMAIL)
                .password(TEST_PASSWORD)
                .fullName("Integration Test User")
                .phone("+1234567890")
                .build();

        ResponseEntity<ApiResponse<Void>> resp = client.exchange(
                BASE + "/register",
                HttpMethod.POST,
                new HttpEntity<>(req, jsonHeaders()),
                new ParameterizedTypeReference<>() {}
        );

        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(resp.getBody()).isNotNull();
        assertThat(resp.getBody().getCode()).isEqualTo(1000);
    }

    @Test
    @Order(2)
    void register_duplicateEmail_fails() {
        UserCreationRequest req = UserCreationRequest.builder()
                .email(TEST_EMAIL)
                .password(TEST_PASSWORD)
                .fullName("Duplicate")
                .phone("+1234567890")
                .build();

        ResponseEntity<String> resp = client.exchange(
                BASE + "/register",
                HttpMethod.POST,
                new HttpEntity<>(req, jsonHeaders()),
                String.class
        );

        // AppException(USER_EXISTED) → GlobalExceptionHandler returns 4xx
        assertThat(resp.getStatusCode().is4xxClientError()).isTrue();
    }

    @Test
    @Order(3)
    void login_success() {
        AuthenticateRequest loginRequest = new AuthenticateRequest(TEST_EMAIL, TEST_PASSWORD);

        ResponseEntity<ApiResponse<AuthenticateResponse>> resp = client.exchange(
                BASE + "/login",
                HttpMethod.POST,
                new HttpEntity<>(loginRequest, jsonHeaders()),
                new ParameterizedTypeReference<>() {}
        );

        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(resp.getBody()).isNotNull();
        assertThat(resp.getBody().getResult()).isNotNull();
        assertThat(resp.getBody().getResult().getToken()).isNotBlank();
    }

    @Test
    @Order(4)
    void protectedEndpoint_noToken_returns401() {
        // /api/v1/users/myinfo requires authentication → 401 without token
        ResponseEntity<String> resp = client.getForEntity(USER_API + "/myinfo", String.class);
        if (resp.getStatusCode() != HttpStatus.UNAUTHORIZED) {
            System.out.println("Response body for 401 test: " + resp.getBody());
        }
        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    @Order(5)
    void protectedEndpoint_validToken_insufficientPerms_returns403() {
        String token = loginAndGetToken();

        // User has no roles → /api/v1/users (ADMIN) → 403
        ResponseEntity<ApiResponse<List<UserResponse>>> resp = client.exchange(
                USER_API,
                HttpMethod.GET,
                bearerHeader(token),
                new ParameterizedTypeReference<>() {}
        );

        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.FORBIDDEN);
    }

    @Test
    @Order(6)
    void publicEndpoint_success() {
        // /products is public
        ResponseEntity<String> resp = client.getForEntity("/products", String.class);
        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

    @Test
    @Order(7)
    void introspect_invalidToken_notValid() {
        IntrospectRequest req = new IntrospectRequest("definitely.not.valid");
        ResponseEntity<ApiResponse<IntrospectResponse>> resp = client.exchange(
                BASE + "/introspect",
                HttpMethod.POST,
                new HttpEntity<>(req, jsonHeaders()),
                new ParameterizedTypeReference<>() {}
        );

        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(resp.getBody()).isNotNull();
        assertThat(resp.getBody().getResult().isValid()).isFalse();
    }

    @Test
    @Order(8)
    void logout_thenTokenBecomesInvalid() throws Exception {
        String token = loginAndGetToken();

        // logout → blacklist token
        LogoutRequest logoutRequest = new LogoutRequest(token);
        ResponseEntity<ApiResponse<Void>> logoutResp = client.exchange(
                BASE + "/logout",
                HttpMethod.POST,
                new HttpEntity<>(logoutRequest, jsonHeaders()),
                new ParameterizedTypeReference<>() {}
        );
        assertThat(logoutResp.getStatusCode()).isEqualTo(HttpStatus.OK);

        // blacklisted token should be rejected by filter
        Thread.sleep(200); // brief delay for Redis write
        ResponseEntity<String> infoResp = client.exchange(
                USER_API + "/myinfo",
                HttpMethod.GET,
                bearerHeader(token),
                String.class
        );
        assertThat(infoResp.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    @Order(9)
    void invalidJwtToken_returns401() {
        HttpHeaders h = jsonHeaders();
        h.setBearerAuth("invalid.jwt.token");
        HttpEntity<Void> entity = new HttpEntity<>(h);

        ResponseEntity<String> resp = client.exchange(
                USER_API + "/myinfo",
                HttpMethod.GET,
                entity,
                String.class
        );

        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }

    @Test
    @Order(10)
    void expiredJwtToken_returns401() {
        HttpHeaders h = jsonHeaders();
        h.setBearerAuth("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiZXhwIjoxfQ.invalid_signature");
        HttpEntity<Void> entity = new HttpEntity<>(h);

        ResponseEntity<String> resp = client.exchange(
                USER_API + "/myinfo",
                HttpMethod.GET,
                entity,
                String.class
        );

        assertThat(resp.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
    }
}
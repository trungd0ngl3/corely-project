package com.corely.corely_backend.service;

import com.corely.corely_backend.dto.response.IntrospectResponse;
import com.corely.corely_backend.repository.InvalidatedTokenRepository;
import com.corely.corely_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    UserRepository userRepository;
    InvalidatedTokenRepository invalidatedTokenRepository;

    PasswordEncoder passwordEncoder;

    @NonFinal
    @Value("${jwt.signing-key}")
    String SIGNING_KEY;

    @Value("${jwt.expiration}")
    long EXPIRATION_TIME;

    @Value("${jwt.refresh-expiration}")
    long REFRESH_EXPIRATION_TIME;

    public IntrospectResponse introspect(){
        return null;
    }
}

package com.corely.corely_backend.configuration;

import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.stereotype.Component;


@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@Component
public class CustomJwtEncoder implements JwtDecoder {
    @Value("${jwt.signing-key}")
    String SIGNING_KEY;

    @Override
    public Jwt decode(String token) throws JwtException {
        try{

        }catch (Exception e){
            throw new JwtException("Invalid token");
        }
        return null;
    }
}

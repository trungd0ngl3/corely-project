package com.corely.corely_backend.service;

import com.corely.corely_backend.dto.request.auth.AuthenticateRequest;
import com.corely.corely_backend.dto.request.auth.IntrospectRequest;
import com.corely.corely_backend.dto.request.auth.LogoutRequest;
import com.corely.corely_backend.dto.request.auth.ResendVerificationRequest;
import com.corely.corely_backend.dto.request.auth.UserCreationRequest;
import com.corely.corely_backend.dto.response.auth.AuthenticateResponse;
import com.corely.corely_backend.dto.response.auth.IntrospectResponse;
import com.corely.corely_backend.dto.response.auth.UserResponse;
import com.corely.corely_backend.entity.InvalidatedToken;
import com.corely.corely_backend.entity.Role;
import com.corely.corely_backend.entity.User;
import com.corely.corely_backend.exception.AppException;
import com.corely.corely_backend.exception.ErrorCode;
import com.corely.corely_backend.repository.InvalidatedTokenRepository;
import com.corely.corely_backend.repository.RoleRepository;
import com.corely.corely_backend.repository.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.*;

import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class AuthenticationService {
    JwtService jwtService;
    UserService userService;

    UserRepository userRepository;
    RoleRepository roleRepository;
    InvalidatedTokenRepository invalidatedTokenRepository;
    PasswordEncoder passwordEncoder;
    EmailVerificationService emailVerificationService;

    public UserResponse register(UserCreationRequest request){
        UserResponse userResponse = userService.createUser(request);
        User user = userRepository.findById(userResponse.getId())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        emailVerificationService.createTokenAndSend(user);
        return userResponse;
    }


    public IntrospectResponse introspect(IntrospectRequest request) {
        boolean isValid = true;
        try {
            jwtService.verifyToken(request.getToken(), false);
        } catch (AppException | JOSEException | ParseException e) {
            isValid = false;
        }
        return IntrospectResponse.builder().isValid(isValid).build();
    }

    public AuthenticateResponse authenticate(AuthenticateRequest request) {
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        if (!Boolean.TRUE.equals(user.getEmailVerified())) {
            throw new AppException(ErrorCode.EMAIL_NOT_VERIFIED);
        }

        if (!Boolean.TRUE.equals(user.getIsActive())) {
            throw new AppException(ErrorCode.ACCOUNT_NOT_ACTIVATED);
        }

        // Allow admin to login via local even if provider is not local
        if (!"local".equals(user.getProvider())
                && user.getRoles().stream().noneMatch(role -> "ADMIN".equals(role.getName()))) {
            throw new AppException(ErrorCode.USE_SOCIAL_LOGIN);
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        log.info("User {} logged in", request.getEmail());
        return jwtService.generateTokenPair(user);
    }


    @Transactional
    public AuthenticateResponse refreshToken(String token) throws JOSEException, ParseException {
        SignedJWT signedJWT = jwtService.verifyToken(token, true);

        String jit = signedJWT.getJWTClaimsSet().getJWTID();
        Date expiryDate = signedJWT.getJWTClaimsSet().getExpirationTime();

        // Invalidate old token
        invalidatedTokenRepository.save(
                InvalidatedToken.builder().id(jit).expiryDate(expiryDate).build());

        // Generate new token
        String email = signedJWT.getJWTClaimsSet().getSubject();
        User user = userRepository.findByEmailAndIsActiveTrue(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        log.info("User {} refreshed token", email);
        return jwtService.generateTokenPair(user);
    }

    @Transactional
    public void logout(LogoutRequest request){
        try {
            SignedJWT signedToken = jwtService.verifyToken(request.getToken(), true);
            String jit = signedToken.getJWTClaimsSet().getJWTID();
            Date expiryDate = signedToken.getJWTClaimsSet().getExpirationTime();

            invalidatedTokenRepository.save(
                    InvalidatedToken.builder().id(jit).expiryDate(expiryDate).build());
            log.info("User {} logged out", signedToken.getJWTClaimsSet().getSubject());
        }
        catch (AppException e) {
            if (e.getErrorCode() == ErrorCode.UNAUTHENTICATED) {
                log.info("Token already logged out");
            } else {
                throw e;
            }
        }
        catch(ParseException | JOSEException e){
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
    }

    public void verifyEmail(String token) {
        emailVerificationService.verify(token);
    }

    public void resendVerification(ResendVerificationRequest request) {
        emailVerificationService.resend(request.getEmail());
    }

    public User processOAuth2User(String email, String name, String picture, String provider, String providerId) {
        return userRepository.findByEmail(email)
                .map(existingUser -> {
                    if (existingUser.getProvider() == null) {
                        existingUser.setProvider(provider);
                        existingUser.setProviderId(providerId);
                    }
                    if (existingUser.getAvatarUrl() == null && picture != null) {
                        existingUser.setAvatarUrl(picture);
                    }
                    if (!existingUser.getIsActive()) {
                        existingUser.setIsActive(true);
                    }
                    if (!Boolean.TRUE.equals(existingUser.getEmailVerified())) {
                        existingUser.setEmailVerified(true);
                    }
                    return userRepository.save(existingUser);
                })
                .orElseGet(() -> {
                    var userRole = roleRepository.findById("USER");
                    Set<Role> roles = new HashSet<>();
                    userRole.ifPresent(roles::add);

                    User newUser = User.builder()
                            .email(email)
                            .fullName(name)
                            .avatarUrl(picture)
                            .provider(provider)
                            .providerId(providerId)
                            .roles(roles)
                            .emailVerified(true)
                            .isActive(true)
                            .build();
                    return userRepository.save(newUser);
                });
    }



}

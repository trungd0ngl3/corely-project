package com.corely.corely_backend.service;

import com.corely.corely_backend.dto.request.IntrospectRequest;
import com.corely.corely_backend.dto.request.LogoutRequest;
import com.corely.corely_backend.dto.response.IntrospectResponse;
import com.corely.corely_backend.entity.InvalidatedToken;
import com.corely.corely_backend.entity.User;
import com.corely.corely_backend.exception.AppException;
import com.corely.corely_backend.exception.ErrorCode;
import com.corely.corely_backend.repository.InvalidatedTokenRepository;
import com.corely.corely_backend.repository.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jose.crypto.RSASSAVerifier;
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
import java.util.Collections;
import java.util.Date;
import java.util.StringJoiner;
import java.util.UUID;

@Slf4j
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

    @Value("${jwt.valid-duration}")
    long VALID_DURATION;

    // tự kiểm tra token có hợp lệ hay không, nếu hợp lệ thì trả về true, ngược lại trả về false
    public IntrospectResponse introspect(IntrospectRequest request) {
        boolean isValid = true;
        try{
            verifyToken(request.getToken(), false);
        }catch (AppException | JOSEException | ParseException e){
            isValid = false;
        }
        return IntrospectResponse.builder().isValid(isValid).build();
    }

    public String generateToken(User user){
        JWSHeader jwsHeader = new JWSHeader(JWSAlgorithm.HS512);

        JWTClaimsSet claimsSet = new JWTClaimsSet.Builder()
                .subject(user.getEmail())
                .issuer("corely-backend")   //
                .issueTime(new Date())  //thời gian tạo token
                .expirationTime(    // thời hạn token
                        new Date(Instant.now().plus(VALID_DURATION, ChronoUnit.HOURS).toEpochMilli()
                                + REFRESH_EXPIRATION_TIME))
                .jwtID(UUID.randomUUID().toString()) // id token
                .claim("scope", buildScope(user)) // role, quyền hạn
                .build();

        JWSObject jwsObject = new JWSObject(jwsHeader, claimsSet.toPayload());

        try{
            jwsObject.sign((JWSSigner) new MACVerifier(SIGNING_KEY.getBytes(StandardCharsets.UTF_8)));
            return jwsObject.serialize();
        } catch (JOSEException e) {
            log.error("Can not generate Token");
            throw new RuntimeException(e);
        }
    }

    public SignedJWT verifyToken(String token, boolean isRefreshed) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(SIGNING_KEY.getBytes());

        SignedJWT signedJWT = SignedJWT.parse(token);

        Date expiredDate = (isRefreshed) ?
                // isRefresh = true: thêm thời gian hết hạn token
                new Date(signedJWT.getJWTClaimsSet().getIssueTime()
                        .toInstant().plus(REFRESH_EXPIRATION_TIME ,ChronoUnit.SECONDS).toEpochMilli())
                // isRefreshed = false: thời gian hết hạn của token
                : signedJWT.getJWTClaimsSet().getExpirationTime();

        // xác thực token
        boolean verified =  signedJWT.verify(verifier);

        if(!verified && expiredDate.after(new Date())) {
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }
        if(invalidatedTokenRepository.existsById(signedJWT.getJWTClaimsSet().getJWTID())){
            throw new AppException(ErrorCode.UNAUTHENTICATED);
        }

        return signedJWT;
    }

    public void refreshToken(String token) {

    }

    public void authenticate(String token) {
    }

    public void logout(LogoutRequest request) throws JOSEException , ParseException{
        try{
            // lấy lại token đã verify
            SignedJWT signedToken = verifyToken(request.getToken(), true);
            String jit = signedToken.getJWTClaimsSet().getJWTID();// id của token
            Date expiryDate = signedToken.getJWTClaimsSet().getExpirationTime();// ngày hết hạn token

            // lưu thông tin token hết hạn vào DB
            InvalidatedToken invalidatedToken = InvalidatedToken.builder()
                    .id(jit)
                    .expiryDate(expiryDate)
                    .build();

            invalidatedTokenRepository.save(invalidatedToken);
        } catch (AppException e) {
            log.info("Token already logout");
        }
    }

    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");
        if(!CollectionUtils.isEmpty(user.getRoles())){
            user.getRoles().forEach(role -> {
                stringJoiner.add("ROLE_" + role.getName());

                if(!CollectionUtils.isEmpty(role.getPermissions())){
                    role.getPermissions().forEach(permission -> {
                        stringJoiner.add(permission.getName());
                    });
                }
            });
        }

        return stringJoiner.toString();
    }
}

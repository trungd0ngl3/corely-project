package com.corely.corely_backend.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Builder
@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class AuthenticateResponse {
    String token;
    boolean isAuth;
}

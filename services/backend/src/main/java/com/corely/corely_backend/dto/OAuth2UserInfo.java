package com.corely.corely_backend.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class OAuth2UserInfo {

    private String providerId;
    private String email;
    private String name;
    private String avatar;

}

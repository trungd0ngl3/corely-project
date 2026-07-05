package com.corely.corely_backend.service;

import com.corely.corely_backend.configuration.CustomOAuth2User;
import com.corely.corely_backend.dto.OAuth2UserInfo;
import com.corely.corely_backend.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private static final String GOOGLE = "google";
    private static final String FACEBOOK = "facebook";
    private final UserService userService;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest)
            throws OAuth2AuthenticationException {

        OAuth2User oauth2User = super.loadUser(userRequest);

        String provider = userRequest.getClientRegistration().getRegistrationId();

        OAuth2UserInfo userInfo = extractUserInfo(provider, oauth2User);

        User user = userService.processOAuth2User(
                userInfo.getEmail(),
                userInfo.getName(),
                userInfo.getAvatar(),
                provider,
                userInfo.getProviderId());

        return new CustomOAuth2User(oauth2User, user);
    }

    @SuppressWarnings("unchecked")
    private OAuth2UserInfo extractUserInfo(String provider, OAuth2User user) {

        if (GOOGLE.equals(provider)) {
            return OAuth2UserInfo.builder()
                    .providerId(user.getAttribute("sub"))
                    .email(user.getAttribute("email"))
                    .name(user.getAttribute("name"))
                    .avatar(user.getAttribute("picture"))
                    .build();
        }

        if (FACEBOOK.equals(provider)) {

            String avatar = null;

            Map<String, Object> picture = user.getAttribute("picture");
            if (picture != null) {
                Map<String, Object> data = (Map<String, Object>) picture.get("data");
                if (data != null) {
                    avatar = (String) data.get("url");
                }
            }

            return OAuth2UserInfo.builder()
                    .providerId(user.getAttribute("id"))
                    .email(user.getAttribute("email"))
                    .name(user.getAttribute("name"))
                    .avatar(avatar)
                    .build();
        }

        throw new OAuth2AuthenticationException("Unsupported provider: " + provider);
    }
}
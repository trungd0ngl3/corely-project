package com.corely.corely_backend.configuration;

import com.corely.corely_backend.entity.User;
import com.corely.corely_backend.repository.RoleRepository;
import com.corely.corely_backend.repository.UserRepository;
import com.corely.corely_backend.service.AuthenticationService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2AuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final AuthenticationService authenticationService;

    @Value("${app.frontend-url:http://localhost:3000}")
    private String frontendUrl;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();

        String email = (String) attributes.get("email");
        String name = (String) attributes.get("name");
        String picture = (String) attributes.get("picture");

        // Determine provider from registration id
        String provider = "google"; // default
        String providerId = (String) attributes.get("sub");

        // Facebook uses "id" not "sub"
        if (providerId == null) {
            providerId = String.valueOf(attributes.get("id"));
            provider = "facebook";
            // Facebook picture is nested
            if (picture == null && attributes.get("picture") instanceof Map) {
                @SuppressWarnings("unchecked")
                Map<String, Object> pictureData = (Map<String, Object>) ((Map<String, Object>) attributes
                        .get("picture")).get("data");
                if (pictureData != null) {
                    picture = (String) pictureData.get("url");
                }
            }
        }

        final String finalProvider = provider;
        final String finalProviderId = providerId;
        final String finalPicture = picture;

        User user = userRepository.findByEmail(email)
                .map(existingUser -> {
                    // Update provider info if not set
                    if (existingUser.getProvider() == null) {
                        existingUser.setProvider(finalProvider);
                        existingUser.setProviderId(finalProviderId);
                    }
                    if (existingUser.getAvatarUrl() == null && finalPicture != null) {
                        existingUser.setAvatarUrl(finalPicture);
                    }
                    return userRepository.save(existingUser);
                })
                .orElseGet(() -> {
                    // Create new user
                    var userRole = roleRepository.findById("USER");
                    Set<com.corely.corely_backend.entity.Role> roles = new HashSet<>();
                    userRole.ifPresent(roles::add);

                    User newUser = User.builder()
                            .email(email)
                            .fullName(name)
                            .avatarUrl(finalPicture)
                            .provider(finalProvider)
                            .providerId(finalProviderId)
                            .roles(roles)
                            .isActive(true)
                            .build();
                    return userRepository.save(newUser);
                });

        String token = authenticationService.generateToken(user);

        // Redirect to frontend with token
        String targetUrl = frontendUrl + "/oauth2/callback?token=" + token;
        getRedirectStrategy().sendRedirect(request, response, targetUrl);
    }
}
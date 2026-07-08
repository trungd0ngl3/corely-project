package com.corely.corely_backend.service;

import com.corely.corely_backend.dto.request.auth.ChangePasswordRequest;
import com.corely.corely_backend.dto.request.auth.UpdateProfileRequest;
import com.corely.corely_backend.dto.request.auth.UserCreationRequest;
import com.corely.corely_backend.dto.request.auth.UserUpdateRequest;
import com.corely.corely_backend.dto.response.auth.UserResponse;
import com.corely.corely_backend.entity.Role;
import com.corely.corely_backend.entity.User;
import com.corely.corely_backend.exception.AppException;
import com.corely.corely_backend.exception.ErrorCode;
import com.corely.corely_backend.mapper.UserMapper;
import com.corely.corely_backend.repository.RoleRepository;
import com.corely.corely_backend.repository.UserRepository;
import com.corely.corely_backend.util.SecurityUtils;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public class UserService {
    UserRepository userRepository;
    RoleRepository roleRepository;
    PasswordEncoder passwordEncoder;
    UserMapper userMapper;
    SecurityUtils securityUtils;

    @Transactional
    public UserResponse createUser(UserCreationRequest request) {
        if (userRepository.existsByEmail(request.getEmail()))
            throw new AppException(ErrorCode.USER_EXISTED);

        User user = userMapper.toUser(request);
        Role role = roleRepository.findById("USER")
                .orElseThrow(() -> new AppException(ErrorCode.ROLE_NOT_FOUND));
        user.setRoles(Set.of(role));
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setIsActive(true);
        user.setProvider("local");

        log.info("Creating user {}", request.getEmail());
        return userMapper.toUserResponse(userRepository.save(user));
    }

    @Transactional(readOnly = true)
    public Page<UserResponse> getAllUsers(int page, int size) {
        return userRepository.findAll(PageRequest.of(page, size)).map(userMapper::toUserResponse);
    }

    @Transactional(readOnly = true)
    public UserResponse getMyInfo() {
        return userMapper.toUserResponse(getCurrentUser());
    }

    @Transactional
    public UserResponse updateMyInfo(UpdateProfileRequest request) {
        User user = getCurrentUser();
        userMapper.updateProfile(user, request);
        log.info("User {} updated profile", user.getId());
        return userMapper.toUserResponse(userRepository.save(user));
    }

    @Transactional
    public void deleteMyAccount() {
        User user = getCurrentUser();
        user.setIsActive(false);
        userRepository.save(user);
        log.info("User {} deactivated own account", user.getId());
    }

    @Transactional
    public void changePassword(ChangePasswordRequest request) {
        User user = getCurrentUser();
        if (!passwordEncoder.matches(request.getOldPassword(), user.getPassword()))
            throw new AppException(ErrorCode.INVALID_PASSWORD);
        if (request.getOldPassword().equals(request.getNewPassword()))
            throw new AppException(ErrorCode.NEW_PASSWORD_MUST_BE_DIFFERENT);
        if (!request.getNewPassword().equals(request.getConfirmPassword()))
            throw new AppException(ErrorCode.PASSWORD_NOT_MATCH);
        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        log.info("User {} changed password", user.getId());
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
                            .isActive(true)
                            .build();
                    return userRepository.save(newUser);
                });
    }

    @Transactional
    public UserResponse updateUser(UUID userId, UserUpdateRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        userMapper.updateUser(user, request);

        if (request.getPassword() != null && !request.getPassword().isBlank()) {
            user.setPassword(passwordEncoder.encode(request.getPassword()));
        }

        if (request.getRoles() != null) {
            var roles = roleRepository.findAllById(request.getRoles());
            if (roles.size() != request.getRoles().size()) {
                throw new AppException(ErrorCode.ROLE_NOT_FOUND);
            }
            user.setRoles(new HashSet<>(roles));
        }

        return userMapper.toUserResponse(userRepository.save(user));
    }

    @Transactional
    public void deleteUser(UUID userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        if (!user.getIsActive()) {
            throw new AppException(ErrorCode.USER_ALREADY_DEACTIVATED);
        }
        user.setIsActive(false);
        userRepository.save(user);
        log.info("Deactivated user {}", userId);
    }

    @Transactional(readOnly = true)
    public UserResponse getUser(UUID userId) {
        return userMapper.toUserResponse(userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND)));
    }

    User getCurrentUser() {
        return securityUtils.getCurrentUser();
    }

}

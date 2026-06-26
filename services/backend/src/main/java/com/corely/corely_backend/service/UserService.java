package com.corely.corely_backend.service;

import com.corely.corely_backend.dto.request.UserCreationRequest;
import com.corely.corely_backend.dto.request.UserUpdateRequest;
import com.corely.corely_backend.dto.response.auth.UserResponse;
import com.corely.corely_backend.entity.Role;
import com.corely.corely_backend.entity.User;
import com.corely.corely_backend.exception.AppException;
import com.corely.corely_backend.exception.ErrorCode;
import com.corely.corely_backend.mapper.UserMapper;
import com.corely.corely_backend.repository.RoleRepository;
import com.corely.corely_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
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

    public UserResponse createUser(UserCreationRequest request){
        // check email
        if(userRepository.existsByEmail(request.getEmail()))
            throw new AppException(ErrorCode.USER_EXISTED);

        // map request to user
        User user = userMapper.toUser(request);

        HashSet<String> roles = new HashSet<>();
//        roleRepository.findById(PredefinedRole.USER_ROLE);

        user.setPassword(passwordEncoder.encode(request.getPassword()));

        return userMapper.toUserResponse(userRepository.save(user));
    }

    public User getUserById(UUID id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
    }
    public List<UserResponse> getUsers(){
        return userRepository.findAll()
                .stream()
                .map(userMapper::toUserResponse)
                .toList();
    }

    public UserResponse getUser(String id){
        return userMapper.toUserResponse(findUser(id));
    }

    public UserResponse getMyInfo(){
        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();

        User user = userRepository.findByEmail(email).orElseThrow(() -> new AppException(ErrorCode.EMAIL_NOT_EXISTED));

        return userMapper.toUserResponse(user);
    }


    public UserResponse updateUser(String userId, UserUpdateRequest request) {
        User user = findUser(userId);
        var roles = roleRepository.findAllById(request.getRoles());

        userMapper.updateUser(user, request);

        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRoles(new HashSet<>(roles));

        return userMapper.toUserResponse(userRepository.save(user));
    }

    public void deleteUser(String userId){
        userRepository.deleteById(UUID.fromString(userId));
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

    private User findUser(String id){
        return userRepository.findById(UUID.fromString(id)).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
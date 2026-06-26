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
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.*;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@DisplayName("UserService Tests")
class UserServiceTest {

    @InjectMocks
    private UserService userService;

    @Mock
    private UserRepository userRepository;

    @Mock
    private RoleRepository roleRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @Mock
    private UserMapper userMapper;

    private User testUser;
    private UUID userId;
    private String testPassword = "password123";
    private String encodedPassword = "$2a$10$encodedpassword";

    @BeforeEach
    void setUp() {
        userId = UUID.randomUUID();
        testUser = User.builder()
                .id(userId)
                .email("test@example.com")
                .fullName("Test User")
                .password(encodedPassword)
                .build();
    }

    @Test
    @DisplayName("should create user successfully")
    void testCreateUser_Success() {
        UserCreationRequest request = UserCreationRequest.builder()
                .email("newuser@example.com")
                .password(testPassword)
                .fullName("New User")
                .build();

        User newUser = User.builder()
                .email("newuser@example.com")
                .fullName("New User")
                .build();

        when(userRepository.existsByEmail("newuser@example.com")).thenReturn(false);
        when(userMapper.toUser(request)).thenReturn(newUser);
        when(passwordEncoder.encode(testPassword)).thenReturn(encodedPassword);
        when(userRepository.save(any(User.class))).thenReturn(newUser);
        when(userMapper.toUserResponse(newUser))
                .thenReturn(UserResponse.builder()
                        .email("newuser@example.com")
                        .fullName("New User")
                        .build());

        UserResponse response = userService.createUser(request);

        assertThat(response).isNotNull();
        assertThat(response.getEmail()).isEqualTo("newuser@example.com");
        
        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());
        assertThat(userCaptor.getValue().getPassword()).isEqualTo(encodedPassword);
    }

    @Test
    @DisplayName("should throw exception when email already exists")
    void testCreateUser_EmailExists() {
        UserCreationRequest request = UserCreationRequest.builder()
                .email("test@example.com")
                .password(testPassword)
                .fullName("Test User")
                .build();

        when(userRepository.existsByEmail("test@example.com")).thenReturn(true);

        assertThatThrownBy(() -> userService.createUser(request))
                .isInstanceOf(AppException.class)
                .hasFieldOrPropertyWithValue("errorCode", ErrorCode.USER_EXISTED);

        verify(userRepository, never()).save(any());
    }

    @Test
    @DisplayName("should encode password during user creation")
    void testCreateUser_PasswordEncoded() {
        UserCreationRequest request = UserCreationRequest.builder()
                .email("newuser@example.com")
                .password(testPassword)
                .fullName("New User")
                .build();

        User newUser = User.builder()
                .email("newuser@example.com")
                .fullName("New User")
                .build();

        when(userRepository.existsByEmail("newuser@example.com")).thenReturn(false);
        when(userMapper.toUser(request)).thenReturn(newUser);
        when(passwordEncoder.encode(testPassword)).thenReturn(encodedPassword);
        when(userRepository.save(any(User.class))).thenReturn(newUser);
        when(userMapper.toUserResponse(newUser)).thenReturn(UserResponse.builder().build());

        userService.createUser(request);

        verify(passwordEncoder).encode(testPassword);
    }

    @Test
    @DisplayName("should get user by ID")
    void testGetUserById_Success() {
        when(userRepository.findById(userId)).thenReturn(Optional.of(testUser));

        User result = userService.getUserById(userId);

        assertThat(result).isEqualTo(testUser);
        assertThat(result.getEmail()).isEqualTo("test@example.com");
        verify(userRepository).findById(userId);
    }

    @Test
    @DisplayName("should throw exception when user by ID not found")
    void testGetUserById_NotFound() {
        UUID nonExistentId = UUID.randomUUID();
        when(userRepository.findById(nonExistentId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userService.getUserById(nonExistentId))
                .isInstanceOf(AppException.class)
                .hasFieldOrPropertyWithValue("errorCode", ErrorCode.USER_NOT_FOUND);
    }

    @Test
    @DisplayName("should get user by email")
    void testGetUserByEmail_Success() {
        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));

        User result = userService.getUserByEmail("test@example.com");

        assertThat(result).isEqualTo(testUser);
        verify(userRepository).findByEmail("test@example.com");
    }

    @Test
    @DisplayName("should throw exception when user by email not found")
    void testGetUserByEmail_NotFound() {
        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userService.getUserByEmail("nonexistent@example.com"))
                .isInstanceOf(AppException.class)
                .hasFieldOrPropertyWithValue("errorCode", ErrorCode.USER_NOT_FOUND);
    }

    @Test
    @DisplayName("should get all users")
    void testGetUsers_Success() {
        User user2 = User.builder()
                .id(UUID.randomUUID())
                .email("user2@example.com")
                .fullName("User 2")
                .build();

        when(userRepository.findAll()).thenReturn(List.of(testUser, user2));
        when(userMapper.toUserResponse(testUser))
                .thenReturn(UserResponse.builder().email("test@example.com").build());
        when(userMapper.toUserResponse(user2))
                .thenReturn(UserResponse.builder().email("user2@example.com").build());

        List<UserResponse> responses = userService.getUsers();

        assertThat(responses).hasSize(2);
        verify(userRepository).findAll();
    }

    @Test
    @DisplayName("should return empty list when no users exist")
    void testGetUsers_Empty() {
        when(userRepository.findAll()).thenReturn(Collections.emptyList());

        List<UserResponse> responses = userService.getUsers();

        assertThat(responses).isEmpty();
    }

    @Test
    @DisplayName("should get user by string ID")
    void testGetUser_Success() {
        when(userRepository.findById(userId)).thenReturn(Optional.of(testUser));
        when(userMapper.toUserResponse(testUser))
                .thenReturn(UserResponse.builder().email("test@example.com").build());

        UserResponse response = userService.getUser(userId.toString());

        assertThat(response).isNotNull();
        assertThat(response.getEmail()).isEqualTo("test@example.com");
    }

    @Test
    @DisplayName("should get current user info from security context")
    void testGetMyInfo_Success() {
        SecurityContext securityContext = mock(SecurityContext.class);
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("test@example.com");
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userRepository.findByEmail("test@example.com")).thenReturn(Optional.of(testUser));
        when(userMapper.toUserResponse(testUser))
                .thenReturn(UserResponse.builder().email("test@example.com").fullName("Test User").build());

        UserResponse response = userService.getMyInfo();

        assertThat(response).isNotNull();
        assertThat(response.getEmail()).isEqualTo("test@example.com");
    }

    @Test
    @DisplayName("should throw exception when my info user not found")
    void testGetMyInfo_UserNotFound() {
        SecurityContext securityContext = mock(SecurityContext.class);
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("nonexistent@example.com");
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);

        when(userRepository.findByEmail("nonexistent@example.com")).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userService.getMyInfo())
                .isInstanceOf(AppException.class)
                .hasFieldOrPropertyWithValue("errorCode", ErrorCode.EMAIL_NOT_EXISTED);
    }

    @Test
    @DisplayName("should update user successfully")
    void testUpdateUser_Success() {
        UUID roleId = UUID.randomUUID();
        Role newRole = Role.builder()
                .name("ADMIN")
                .build();

        UserUpdateRequest request = UserUpdateRequest.builder()
                .email("updated@example.com")
                .password(testPassword)
                .fullName("Updated User")
                .roles(List.of(roleId.toString()))
                .build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(testUser));
        when(roleRepository.findAllById(anyList())).thenReturn(List.of(newRole));
        when(passwordEncoder.encode(testPassword)).thenReturn(encodedPassword);
        when(userRepository.save(any(User.class))).thenReturn(testUser);
        when(userMapper.toUserResponse(testUser))
                .thenReturn(UserResponse.builder().email("updated@example.com").build());

        UserResponse response = userService.updateUser(userId.toString(), request);

        assertThat(response).isNotNull();
        
        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());
        User updatedUser = userCaptor.getValue();
        
        assertThat(updatedUser.getRoles()).contains(newRole);
        assertThat(updatedUser.getPassword()).isEqualTo(encodedPassword);
    }

    @Test
    @DisplayName("should throw exception when updating non-existent user")
    void testUpdateUser_NotFound() {
        UUID nonExistentId = UUID.randomUUID();
        UserUpdateRequest request = UserUpdateRequest.builder()
                .email("test@example.com")
                .password(testPassword)
                .build();

        when(userRepository.findById(nonExistentId)).thenReturn(Optional.empty());

        assertThatThrownBy(() -> userService.updateUser(nonExistentId.toString(), request))
                .isInstanceOf(RuntimeException.class);
    }

    @Test
    @DisplayName("should delete user")
    void testDeleteUser_Success() {
        userService.deleteUser(userId.toString());

        verify(userRepository).deleteById(userId);
    }

    @Test
    @DisplayName("should encode password during user update")
    void testUpdateUser_PasswordEncoded() {
        UUID roleId = UUID.randomUUID();
        Role role = Role.builder().name("USER").build();
        
        UserUpdateRequest request = UserUpdateRequest.builder()
                .email("test@example.com")
                .password(testPassword)
                .fullName("Test User")
                .roles(List.of(roleId.toString()))
                .build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(testUser));
        when(roleRepository.findAllById(anyList())).thenReturn(List.of(role));
        when(passwordEncoder.encode(testPassword)).thenReturn(encodedPassword);
        when(userRepository.save(any(User.class))).thenReturn(testUser);
        when(userMapper.toUserResponse(testUser)).thenReturn(UserResponse.builder().build());

        userService.updateUser(userId.toString(), request);

        verify(passwordEncoder).encode(testPassword);
    }

    @Test
    @DisplayName("should assign roles to user")
    void testUpdateUser_AssignRoles() {
        UUID adminRoleId = UUID.randomUUID();
        UUID userRoleId = UUID.randomUUID();
        Role adminRole = Role.builder().name("ADMIN").build();
        Role userRole = Role.builder().name("USER").build();

        UserUpdateRequest request = UserUpdateRequest.builder()
                .email("test@example.com")
                .password(testPassword)
                .fullName("Test User")
                .roles(List.of(adminRoleId.toString(), userRoleId.toString()))
                .build();

        when(userRepository.findById(userId)).thenReturn(Optional.of(testUser));
        when(roleRepository.findAllById(anyList())).thenReturn(List.of(adminRole, userRole));
        when(passwordEncoder.encode(testPassword)).thenReturn(encodedPassword);
        when(userRepository.save(any(User.class))).thenReturn(testUser);
        when(userMapper.toUserResponse(testUser)).thenReturn(UserResponse.builder().build());

        userService.updateUser(userId.toString(), request);

        ArgumentCaptor<User> userCaptor = ArgumentCaptor.forClass(User.class);
        verify(userRepository).save(userCaptor.capture());
        
        Set<Role> assignedRoles = userCaptor.getValue().getRoles();
        assertThat(assignedRoles).containsExactlyInAnyOrder(adminRole, userRole);
    }
}
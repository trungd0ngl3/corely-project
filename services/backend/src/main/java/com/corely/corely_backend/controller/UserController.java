package com.corely.corely_backend.controller;

import com.corely.corely_backend.dto.response.ApiResponse;
import com.corely.corely_backend.dto.response.UserResponse;
import com.corely.corely_backend.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequiredArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
@RequestMapping("/api/v1/users")
public class UserController {
    UserService userService;

    public ApiResponse<UserResponse> createUser() {
        return null;
    }

    public ApiResponse<List<UserResponse>> getAllUsers() {
        return null;
    }

    public ApiResponse<UserResponse> getMyInfo() {
        return null;
    }

    public ApiResponse<UserResponse> getUserById(String id) {
        return null;
    }

    public ApiResponse<UserResponse> updateUser(String id) {
        return null;
    }

    public ApiResponse<String> deleteUser(String id) {
        return null;
    }
}

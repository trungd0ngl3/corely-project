package com.corely.corely_backend.mapper;

import com.corely.corely_backend.dto.request.UserCreationRequest;
import com.corely.corely_backend.dto.request.UserUpdateRequest;
import com.corely.corely_backend.dto.response.auth.UserResponse;
import com.corely.corely_backend.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "roles", ignore = true)
    User toUser(UserCreationRequest request);

    @Mapping(target = "roles", ignore = true)
    UserResponse toUserResponse(User user);

    @Mapping(target = "roles", ignore = true)
    void updateUser(@MappingTarget User user, UserUpdateRequest request);
}

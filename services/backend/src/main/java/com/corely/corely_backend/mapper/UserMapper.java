package com.corely.corely_backend.mapper;

import com.corely.corely_backend.dto.request.UserCreationRequest;
import com.corely.corely_backend.dto.request.UserUpdateRequest;
import com.corely.corely_backend.dto.response.UserResponse;
import com.corely.corely_backend.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toUser(UserCreationRequest request);

    UserResponse toUserResponse(User user);

    @Mapping(target = "role", ignore = true)
    void updateUser(@MappingTarget User user, UserUpdateRequest request);

}

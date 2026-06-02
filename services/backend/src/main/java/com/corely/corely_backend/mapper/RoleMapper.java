package com.corely.corely_backend.mapper;

import com.corely.corely_backend.dto.request.RoleRequest;
import com.corely.corely_backend.dto.response.RoleResponse;
import com.corely.corely_backend.entity.Role;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    Role toRole(RoleRequest request);

    RoleResponse toRoleResponse(Role role);
}

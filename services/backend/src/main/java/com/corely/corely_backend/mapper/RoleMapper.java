package com.corely.corely_backend.mapper;

import com.corely.corely_backend.dto.request.RoleRequest;
import com.corely.corely_backend.dto.response.RoleResponse;
import com.corely.corely_backend.entity.Role;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface RoleMapper {
    @org.mapstruct.Mapping(target = "permissions", ignore = true)
    Role toRole(RoleRequest request);

    @org.mapstruct.Mapping(target = "permissions", ignore = true)
    RoleResponse toRoleResponse(Role role);
}

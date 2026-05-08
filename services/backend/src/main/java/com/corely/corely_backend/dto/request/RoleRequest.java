package com.corely.corely_backend.dto.request;

import com.corely.corely_backend.entity.Permission;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Builder
@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class RoleRequest {
    String name;
    String description;
    Set<String> permissions;
}

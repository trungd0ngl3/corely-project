package com.corely.corely_backend.dto.response;

import com.corely.corely_backend.enums.Role;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.Set;

@Builder
@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class UserResponse {
    String id;
    String email;
    String fullName;
    String phone;
    String dateOfBirth;
    Set<Role> roles;
    Boolean isActive;
}

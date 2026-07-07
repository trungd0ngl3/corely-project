package com.corely.corely_backend.seed;

import com.corely.corely_backend.entity.Permission;
import com.corely.corely_backend.entity.Role;
import com.corely.corely_backend.repository.PermissionRepository;
import com.corely.corely_backend.repository.RoleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import java.util.HashSet;

@Component
@Order(2)
@RequiredArgsConstructor
public class RoleSeeder implements CommandLineRunner {
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;

    @Override
    public void run(String... args) {
        if (roleRepository.count() == 0) {
            var allPermissions = new HashSet<>(permissionRepository.findAll());
            roleRepository.save(Role.builder().name("ADMIN").description("Admin role").permissions(allPermissions).build());
            roleRepository.save(Role.builder().name("USER").description("User role").permissions(new HashSet<>()).build());
        }
    }
}

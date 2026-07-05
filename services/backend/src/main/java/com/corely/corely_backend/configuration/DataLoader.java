package com.corely.corely_backend.configuration;

import com.corely.corely_backend.entity.Permission;
import com.corely.corely_backend.entity.Role;
import com.corely.corely_backend.entity.User;
import com.corely.corely_backend.repository.PermissionRepository;
import com.corely.corely_backend.repository.RoleRepository;
import com.corely.corely_backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Configuration
public class DataLoader {

    @Bean
    CommandLineRunner seedData(RoleRepository roleRepository, UserRepository userRepository,
            PermissionRepository permissionRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Seed permissions
            if (permissionRepository.count() == 0) {
                List<Permission> permissions = List.of(
                        Permission.builder().name("MANAGE_USERS").description("Create, update, delete users").build(),
                        Permission.builder().name("MANAGE_ROLES").description("Create, update, delete roles").build(),
                        Permission.builder().name("MANAGE_PRODUCTS").description("Create, update, delete products").build(),
                        Permission.builder().name("MANAGE_ORDERS").description("Manage orders").build(),
                        Permission.builder().name("VIEW_DASHBOARD").description("View dashboard statistics").build()
                );
                permissionRepository.saveAll(permissions);
            }

            // Seed roles
            if (roleRepository.count() == 0) {
                Set<Permission> allPermissions = new HashSet<>(permissionRepository.findAll());

                Role adminRole = Role.builder()
                        .name("ADMIN")
                        .description("Admin role")
                        .permissions(allPermissions)
                        .build();
                Role userRole = Role.builder()
                        .name("USER")
                        .description("User role")
                        .permissions(new HashSet<>())
                        .build();
                roleRepository.save(adminRole);
                roleRepository.save(userRole);
            }

            // Seed admin user
            if (!userRepository.existsByEmail("admin@corely.local")) {
                Role adminRole = roleRepository.findById("ADMIN").orElseThrow();
                User admin = User.builder()
                        .email("admin@corely.local")
                        .password(passwordEncoder.encode("admin123"))
                        .fullName("Admin")
                        .isActive(true)
                        .roles(new HashSet<>(Set.of(adminRole)))
                        .build();
                userRepository.save(admin);
            }
        };
    }
}
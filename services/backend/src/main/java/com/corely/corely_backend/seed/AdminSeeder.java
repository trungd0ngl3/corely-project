package com.corely.corely_backend.seed;

import com.corely.corely_backend.entity.User;
import com.corely.corely_backend.repository.RoleRepository;
import com.corely.corely_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
@Order(3)
@RequiredArgsConstructor
public class AdminSeeder implements CommandLineRunner {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (!userRepository.existsByEmail("admin@corely.local")) {
            var adminRole = roleRepository.findById("ADMIN").orElseThrow();
            userRepository.save(User.builder()
                .email("admin@corely.local")
                .password(passwordEncoder.encode("admin123"))
                .fullName("Admin")
                .isActive(true)
                .roles(Set.of(adminRole))
                .build());
        }
    }
}

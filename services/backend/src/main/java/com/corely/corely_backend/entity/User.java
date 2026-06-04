package com.corely.corely_backend.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;
import java.util.UUID;

@Entity
@Table(name = "users")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    UUID id;

    @Column(unique = true, nullable = false)
    String email;

    String password;

    String fullName;
    String phone;
    String avatarUrl;

    LocalDate dateOfBirth;

    // OAuth2 fields
    String provider; // "local", "google", "facebook"
    String providerId;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_name"))
    Set<Role> roles;

    @Builder.Default
    Boolean isActive = true;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<Address> addresses;
}

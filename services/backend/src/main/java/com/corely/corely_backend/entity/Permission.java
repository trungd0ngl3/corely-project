package com.corely.corely_backend.entity;

import jakarta.persistence.Entity;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

@Entity
@Builder
@Setter
@Getter
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class Permission {
    String name;
    String description;

}

package com.corely.corely_backend.dto.response.store;

import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class StoreResponse {
    UUID id;
    String name;
    String slug;
    String description;
    String logoUrl;
    String bannerUrl;
    String contactPhone;
    String contactEmail;
    String address;
    Boolean isVerified;
    Boolean isActive;
    Double rating;
    UUID ownerId;
    LocalDateTime createdAt;
}
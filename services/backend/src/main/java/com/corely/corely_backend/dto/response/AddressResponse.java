package com.corely.corely_backend.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;
import java.util.UUID;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddressResponse {
    UUID id;
    String streetAddress;
    String city;
    String district;
    String ward;
    Boolean isDefault;
}
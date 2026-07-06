package com.corely.corely_backend.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AddressRequest {
    String streetAddress;
    String city;
    String district;
    String ward;
    Boolean isDefault;
}
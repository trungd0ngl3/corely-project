package com.corely.corely_backend.dto.request.order;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import lombok.Data;
import lombok.experimental.FieldDefaults;

import java.util.UUID;

@Data
@Builder
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class OrderCreationRequest {

    @NotNull(message = "STORE_ID_REQUIRED")
    UUID storeId;

    @NotBlank(message = "SHIPPING_ADDRESS_REQUIRED")
    String shippingAddress;

    @NotBlank(message = "PAYMENT_METHOD_REQUIRED")
    String paymentMethod; // e.g., "COD", "VNPAY"
}
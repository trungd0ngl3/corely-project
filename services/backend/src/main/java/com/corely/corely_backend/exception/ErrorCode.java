package com.corely.corely_backend.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;

@RequiredArgsConstructor
@Getter
@FieldDefaults(level = lombok.AccessLevel.PRIVATE, makeFinal = true)
public enum ErrorCode {
    // General
    UNCATEGORIZED_ERROR(9999, "Uncategorized error", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_KEY(1001, "Uncategorized error", HttpStatus.BAD_REQUEST),

    // User & Auth
    USER_EXISTED(1002, "User existed", HttpStatus.BAD_REQUEST),
    USERNAME_INVALID(1003, "Username must be at least {min} character", HttpStatus.BAD_REQUEST),
    PASSWORD_INVALID(1004, "Password must be at least {min} character", HttpStatus.BAD_REQUEST),
    EMAIL_NOT_EXISTED(1005, "Email not existed", HttpStatus.NOT_FOUND),
    UNAUTHENTICATED(1006, "Unauthenticated", HttpStatus.UNAUTHORIZED),
    UNAUTHORIZED(1007, "You do not have permission", HttpStatus.FORBIDDEN),
    DOB_INVALID(1008, "Age must at least {min}", HttpStatus.BAD_REQUEST),
    USER_NOT_FOUND(1009, "User not found", HttpStatus.NOT_FOUND),
    USER_NOT_EXISTED(1017, "User not existed", HttpStatus.NOT_FOUND),
    ROLE_NOT_FOUND(1026, "Role not found", HttpStatus.NOT_FOUND),

    // Store & Product
    STORE_NOT_FOUND(1010, "Store not found", HttpStatus.NOT_FOUND),
    STORE_LOCKED(1037, "Store is locked", HttpStatus.BAD_REQUEST),
    PRODUCT_NOT_FOUND(1011, "Product not found", HttpStatus.NOT_FOUND),
    PRODUCT_EXISTED(1035, "Product already exists", HttpStatus.BAD_REQUEST),
    PRODUCT_ALREADY_DELETED(1036, "Product already deleted", HttpStatus.BAD_REQUEST),
    PRODUCT_NOT_AVAILABLE(1027, "Product not available", HttpStatus.BAD_REQUEST),
    PRODUCT_ALREADY_IN_WISHLIST(1028, "Product already in wishlist", HttpStatus.BAD_REQUEST),
    STORE_EXISTED(1014, "Store existed", HttpStatus.BAD_REQUEST),
    OUT_OF_STOCK(1016, "Product out of stock", HttpStatus.BAD_REQUEST),
    BRAND_EXISTED(1020, "Brand existed", HttpStatus.BAD_REQUEST),
    BRAND_NOT_FOUND(1021, "Brand not found", HttpStatus.NOT_FOUND),
    CATEGORY_NOT_FOUND(1023, "Category not found", HttpStatus.NOT_FOUND),
    CATEGORY_EXISTED(1024, "Category existed", HttpStatus.BAD_REQUEST),

    // Order & Cart
    ORDER_NOT_FOUND(1012, "Order not found", HttpStatus.NOT_FOUND),
    INVALID_ORDER_STATUS_TRANSITION(1040, "Invalid order status transition", HttpStatus.BAD_REQUEST),
    INVALID_VOUCHER(1013, "Invalid voucher", HttpStatus.BAD_REQUEST),
    CART_EMPTY(1015, "Cart is empty", HttpStatus.BAD_REQUEST),
    CART_ITEM_NOT_FOUND(1038, "Cart item not found", HttpStatus.NOT_FOUND),
    VARIANT_REQUIRED(1039, "Variant required", HttpStatus.BAD_REQUEST),

    // Payment
    PAYMENT_NOT_FOUND(1018, "Payment not found", HttpStatus.NOT_FOUND),
    INVALID_SIGNATURE(1019, "Invalid signature", HttpStatus.BAD_REQUEST),

    // Other
    ADDRESS_NOT_FOUND(1022, "Address not found", HttpStatus.NOT_FOUND),
    REVIEW_NOT_FOUND(1025, "Review not found", HttpStatus.NOT_FOUND),
    REVIEW_ALREADY_EXIST(1033, "Review already exist", HttpStatus.BAD_REQUEST),
    INVALID_PASSWORD(1029, "Invalid password", HttpStatus.BAD_REQUEST),
    PASSWORD_NOT_MATCH(1030, "Password not match", HttpStatus.BAD_REQUEST),
    NEW_PASSWORD_MUST_BE_DIFFERENT(1031, "New password must be different from old password", HttpStatus.BAD_REQUEST),
    USER_ALREADY_DEACTIVATED(1032, "User already deactivated", HttpStatus.BAD_REQUEST),
    USE_SOCIAL_LOGIN(1034, "Please use social login", HttpStatus.BAD_REQUEST),
    UPLOAD_FAILED(1041, "Upload failed", HttpStatus.INTERNAL_SERVER_ERROR),
    INVALID_FILE(1042, "Invalid file", HttpStatus.BAD_REQUEST),
    FILE_TOO_LARGE(1043, "File too large", HttpStatus.BAD_REQUEST),
    INVALID_FILE_TYPE(1044, "Invalid file type", HttpStatus.BAD_REQUEST),
    ;

    int code;
    String message;
    HttpStatusCode statusCode;
}

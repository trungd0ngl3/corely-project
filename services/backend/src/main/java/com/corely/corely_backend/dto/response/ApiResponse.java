package com.corely.corely_backend.dto.response;


import lombok.*;
import lombok.experimental.FieldDefaults;

@Builder
@Data
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    int code;
    String message;
    T result;

    public static <T> ApiResponse<T> success(T result) {
        return  ApiResponse.<T>builder()
                .code(200)
                .message("Success")
                .result(result)
                .build();
    }


}

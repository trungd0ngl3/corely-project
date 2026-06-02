package com.corely.corely_backend.exception;

import lombok.*;

@RequiredArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AppException extends RuntimeException {
    private ErrorCode  errorCode;
}

package com.corely.corely_backend.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@RequiredArgsConstructor
@Getter
@Setter
public class AppException extends RuntimeException {
    private ErrorCode  errorCode;
}

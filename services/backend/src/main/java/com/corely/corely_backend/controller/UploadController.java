package com.corely.corely_backend.controller;

import com.corely.corely_backend.dto.response.ApiResponse;
import com.corely.corely_backend.dto.response.upload.UploadResponse;
import com.corely.corely_backend.enums.UploadFolder;
import com.corely.corely_backend.service.CloudinaryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/uploads")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UploadController {
    CloudinaryService cloudinaryService;

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public ApiResponse<UploadResponse> upload(
            @RequestParam("file") MultipartFile file,
            @RequestParam("folder") UploadFolder folder) {
        return ApiResponse.<UploadResponse>builder()
                .code(200)
                .message("File uploaded successfully")
                .result(cloudinaryService.upload(file, folder))
                .build();
    }

    @DeleteMapping("/{publicId}")
    @PreAuthorize("hasAnyRole('ADMIN', 'STAFF')")
    public ApiResponse<Void> delete(@PathVariable String publicId) {
        cloudinaryService.delete(publicId);
        return ApiResponse.<Void>builder()
                .code(200)
                .message("File deleted successfully")
                .build();
    }
}

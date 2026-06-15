package com.corely.corely_backend.controller;

import com.corely.corely_backend.dto.response.ApiResponse;
import com.corely.corely_backend.dto.response.upload.UploadResponse;
import com.corely.corely_backend.service.CloudinaryService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/upload")
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UploadController {
    CloudinaryService cloudinaryService;

    @PostMapping
    public ApiResponse<UploadResponse> upload(@RequestParam("file") MultipartFile file) {
        Map uploadResult = cloudinaryService.upload(file);
        return ApiResponse.<UploadResponse>builder()
                .code(200)
                .message("File uploaded successfully")
                .result(UploadResponse.builder()
                        .publicID((String) uploadResult.get("public_id"))
                        .url((String) uploadResult.get("url"))
                        .build())
                .build();
    }
}

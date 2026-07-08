package com.corely.corely_backend.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.corely.corely_backend.dto.response.upload.UploadResponse;
import com.corely.corely_backend.enums.UploadFolder;
import com.corely.corely_backend.exception.AppException;
import com.corely.corely_backend.exception.ErrorCode;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class CloudinaryService {
    Cloudinary cloudinary;
    static List<String> ALLOWED_MIME_TYPES = Arrays.asList("image/jpeg", "image/png", "image/webp");
    static long MAX_FILE_SIZE = 5 * 1024 * 1024;

    public UploadResponse upload(MultipartFile file, UploadFolder folder) {
        validateFile(file);
        try {
            Map result = cloudinary.uploader().upload(
                    file.getBytes(),
                    ObjectUtils.asMap(
                            "folder", "corely/" + folder.getFolderName(),
                            "resource_type", "image"
                    )
            );
            log.info("Upload success: {}", result.get("public_id"));
            return UploadResponse.builder()
                    .publicId((String) result.get("public_id"))
                    .url((String) result.get("secure_url"))
                    .width((Integer) result.get("width"))
                    .height((Integer) result.get("height"))
                    .bytes((Integer) result.get("bytes") != null ? ((Integer) result.get("bytes")).longValue() : null)
                    .format((String) result.get("format"))
                    .build();
        } catch (Exception e) {
            throw new AppException(ErrorCode.UPLOAD_FAILED);
        }
    }

    public void delete(String publicId) {
        try {
            cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
            log.info("Delete success: {}", publicId);
        } catch (Exception e) {
            throw new AppException(ErrorCode.UPLOAD_FAILED);
        }
    }

    private void validateFile(MultipartFile file) {
        if (file.isEmpty()) throw new AppException(ErrorCode.INVALID_FILE);
        if (file.getSize() > MAX_FILE_SIZE) throw new AppException(ErrorCode.FILE_TOO_LARGE);
        if (!ALLOWED_MIME_TYPES.contains(file.getContentType())) throw new AppException(ErrorCode.INVALID_FILE_TYPE);
    }
}

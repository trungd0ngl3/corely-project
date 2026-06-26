package com.corely.corely_backend.controller;

import com.corely.corely_backend.service.CloudinaryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(UploadController.class)
@org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc(addFilters = false)
class UploadControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockitoBean
    CloudinaryService cloudinaryService;

    @Test
    void upload_success() throws Exception {
        MockMultipartFile file = new MockMultipartFile(
                "file", "test.png", MediaType.IMAGE_PNG_VALUE, "fake-image".getBytes());

        when(cloudinaryService.upload(any())).thenReturn(Map.of(
                "public_id", "test_public_id",
                "url", "https://res.cloudinary.com/test/image/upload/test.png"
        ));

        mockMvc.perform(multipart("/api/upload").file(file))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.code").value(200))
                .andExpect(jsonPath("$.message").value("File uploaded successfully"))
                .andExpect(jsonPath("$.result.publicID").value("test_public_id"))
                .andExpect(jsonPath("$.result.url").value("https://res.cloudinary.com/test/image/upload/test.png"));
    }

    @Test
    void upload_fail() throws Exception {
        MockMultipartFile file = new MockMultipartFile(
                "file", "test.png", MediaType.IMAGE_PNG_VALUE, "fake-image".getBytes());

        when(cloudinaryService.upload(any())).thenThrow(new RuntimeException("Upload failed"));

        mockMvc.perform(multipart("/api/upload").file(file))
                .andExpect(status().isBadRequest());
    }
}
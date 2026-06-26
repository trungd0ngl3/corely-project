package com.corely.corely_backend.controller;

import com.corely.corely_backend.dto.request.store.StoreCreationRequest;
import com.corely.corely_backend.dto.response.store.StoreResponse;
import com.corely.corely_backend.service.StoreService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(StoreController.class)
@org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc(addFilters = false)
class StoreControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockitoBean
    StoreService storeService;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    void createStore_success() throws Exception {
        StoreCreationRequest request = StoreCreationRequest.builder()
                .name("My Store")
                .build();

        StoreResponse response = StoreResponse.builder()
                .id(UUID.randomUUID())
                .name("My Store")
                .build();

        when(storeService.createStore(any())).thenReturn(response);

        mockMvc.perform(post("/api/v1/stores")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.name").value("My Store"));
    }

    @Test
    void getStoreBySlug_success() throws Exception {
        StoreResponse response = StoreResponse.builder()
                .name("My Store")
                .slug("my-store")
                .build();

        when(storeService.getStoreBySlug(anyString())).thenReturn(response);

        mockMvc.perform(get("/api/v1/stores/my-store"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.slug").value("my-store"));
    }
}
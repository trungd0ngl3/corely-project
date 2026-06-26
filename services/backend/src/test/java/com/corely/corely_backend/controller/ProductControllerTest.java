package com.corely.corely_backend.controller;

import com.corely.corely_backend.dto.request.product.ProductCreationRequest;
import com.corely.corely_backend.dto.response.ApiResponse;
import com.corely.corely_backend.dto.response.product.ProductResponse;
import com.corely.corely_backend.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.UUID;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ProductController.class)
@org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc(addFilters = false)
class ProductControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockitoBean
    ProductService productService;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    void createProduct_success() throws Exception {
        ProductCreationRequest request = ProductCreationRequest.builder()
                .name("Test Product")
                .price(java.math.BigDecimal.valueOf(100))
                .storeId(UUID.randomUUID())
                .build();

        ProductResponse response = ProductResponse.builder()
                .id(UUID.randomUUID())
                .name("Test Product")
                .build();

        when(productService.createProduct(any())).thenReturn(response);

        mockMvc.perform(post("/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.name").value("Test Product"));
    }

    @Test
    void getActiveProducts_success() throws Exception {
        Page<ProductResponse> page = new PageImpl<>(List.of());
        when(productService.getActiveProducts(anyInt(), anyInt(), anyString(), anyString())).thenReturn(page);

        mockMvc.perform(get("/products"))
                .andExpect(status().isOk());
    }

    @Test
    void getProductBySlug_success() throws Exception {
        ProductResponse response = ProductResponse.builder()
                .name("Test Product")
                .build();

        when(productService.getProductBySlug("test-product")).thenReturn(response);

        mockMvc.perform(get("/products/test-product"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.result.name").value("Test Product"));
    }

    @Test
    void getProductsByStore_success() throws Exception {
        Page<ProductResponse> page = new PageImpl<>(List.of());
        when(productService.getProductsByStore(any(), anyInt(), anyInt())).thenReturn(page);

        mockMvc.perform(get("/products/store/" + UUID.randomUUID()))
                .andExpect(status().isOk());
    }
}
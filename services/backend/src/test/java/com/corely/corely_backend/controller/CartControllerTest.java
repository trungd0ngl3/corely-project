package com.corely.corely_backend.controller;

import com.corely.corely_backend.dto.request.cart.CartItemRequest;
import com.corely.corely_backend.dto.response.cart.CartResponse;
import com.corely.corely_backend.service.CartService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.util.UUID;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(CartController.class)
@org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc(addFilters = false)
class CartControllerTest {

    @Autowired
    MockMvc mockMvc;

    @MockitoBean
    CartService cartService;

    @Autowired
    ObjectMapper objectMapper;

    @Test
    void addToCart_success() throws Exception {
        CartItemRequest request = CartItemRequest.builder()
                .productId(UUID.randomUUID())
                .quantity(2)
                .build();

        doNothing().when(cartService).addToCart(any());

        mockMvc.perform(post("/cart")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk());
    }

    @Test
    void getCart_success() throws Exception {
        CartResponse response = CartResponse.builder()
                .build();

        when(cartService.getCart()).thenReturn(response);

        mockMvc.perform(get("/cart"))
                .andExpect(status().isOk());
    }

    @Test
    void removeFromCart_success() throws Exception {
        UUID productId = UUID.randomUUID();
        UUID variantId = UUID.randomUUID();

        doNothing().when(cartService).removeFromCart(any(), any());

        mockMvc.perform(delete("/cart/" + productId)
                        .param("variantId", variantId.toString()))
                .andExpect(status().isOk());
    }

    @Test
    void clearCart_success() throws Exception {
        doNothing().when(cartService).clearCart();

        mockMvc.perform(delete("/cart"))
                .andExpect(status().isOk());
    }
}
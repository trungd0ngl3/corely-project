package com.corely.corely_backend.dto.response.dashboard;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardStatsResponse {
    private BigDecimal totalRevenue;
    private Long totalOrders;
    private Long totalProducts;
    private Long totalCustomers;
    private Double averageOrderValue;
    private Double conversionRate;
    private Long pendingOrders;
    private Long completedOrders;
}
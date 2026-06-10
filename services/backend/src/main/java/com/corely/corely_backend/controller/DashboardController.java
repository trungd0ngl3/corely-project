package com.corely.corely_backend.controller;

import com.corely.corely_backend.dto.response.dashboard.DashboardStatsResponse;
import com.corely.corely_backend.dto.response.dashboard.RevenueChartResponse;
import com.corely.corely_backend.service.DashboardService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/v1/dashboard")
@RequiredArgsConstructor
@Slf4j
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/stats")
    @PreAuthorize("hasAnyRole('ADMIN', 'STORE_OWNER')")
    public ResponseEntity<DashboardStatsResponse> getDashboardStats() {
        log.info("Getting dashboard stats");
        DashboardStatsResponse stats = dashboardService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/revenue/chart")
    @PreAuthorize("hasAnyRole('ADMIN', 'STORE_OWNER')")
    public ResponseEntity<List<RevenueChartResponse>> getRevenueChart(
            @RequestParam(defaultValue = "7") int days) {
        log.info("Getting revenue chart for last {} days", days);
        List<RevenueChartResponse> revenueData = dashboardService.getRevenueChart(days);
        return ResponseEntity.ok(revenueData);
    }

    @GetMapping("/top-products")
    @PreAuthorize("hasAnyRole('ADMIN', 'STORE_OWNER')")
    public ResponseEntity<List<?>> getTopProducts(
            @RequestParam(defaultValue = "10") int limit) {
        log.info("Getting top {} products", limit);
        return ResponseEntity.ok(dashboardService.getTopProducts(limit));
    }

    @GetMapping("/orders/recent")
    @PreAuthorize("hasAnyRole('ADMIN', 'STORE_OWNER')")
    public ResponseEntity<List<?>> getRecentOrders(
            @RequestParam(defaultValue = "10") int limit) {
        log.info("Getting recent {} orders", limit);
        return ResponseEntity.ok(dashboardService.getRecentOrders(limit));
    }
}
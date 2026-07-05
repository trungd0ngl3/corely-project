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

    @GetMapping("/summary")
    @PreAuthorize("hasAnyRole('ADMIN', 'STORE_OWNER')")
    public ResponseEntity<DashboardStatsResponse> getDashboardSummary() {
        log.info("Getting dashboard summary");
        DashboardStatsResponse stats = dashboardService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/revenues")
    @PreAuthorize("hasAnyRole('ADMIN', 'STORE_OWNER')")
    public ResponseEntity<List<RevenueChartResponse>> getRevenues(
            @RequestParam(defaultValue = "7") int days) {
        log.info("Getting revenues for last {} days", days);
        List<RevenueChartResponse> revenueData = dashboardService.getRevenueChart(days);
        return ResponseEntity.ok(revenueData);
    }

    @GetMapping("/products/top")
    @PreAuthorize("hasAnyRole('ADMIN', 'STORE_OWNER')")
    public ResponseEntity<List<?>> getTopProducts(
            @RequestParam(defaultValue = "10") int limit) {
        log.info("Getting top {} products", limit);
        return ResponseEntity.ok(dashboardService.getTopProducts(limit));
    }

    @GetMapping("/orders")
    @PreAuthorize("hasAnyRole('ADMIN', 'STORE_OWNER')")
    public ResponseEntity<List<?>> getRecentOrders(
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "recent") String sort) {
        log.info("Getting {} orders sorted by {}", limit, sort);
        return ResponseEntity.ok(dashboardService.getRecentOrders(limit));
    }
}
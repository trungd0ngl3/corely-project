package com.corely.corely_backend.service;

import com.corely.corely_backend.dto.response.dashboard.DashboardStatsResponse;
import com.corely.corely_backend.dto.response.dashboard.RevenueChartResponse;
import com.corely.corely_backend.dto.response.order.OrderResponse;
import com.corely.corely_backend.dto.response.product.ProductResponse;
import com.corely.corely_backend.entity.Order;
import com.corely.corely_backend.entity.OrderItem;
import com.corely.corely_backend.entity.Product;
import com.corely.corely_backend.enums.OrderStatus;
import com.corely.corely_backend.mapper.OrderMapper;
import com.corely.corely_backend.mapper.ProductMapper;
import com.corely.corely_backend.repository.OrderRepository;
import com.corely.corely_backend.repository.ProductRepository;
import com.corely.corely_backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class DashboardService {

        private final OrderRepository orderRepository;
        private final ProductRepository productRepository;
        private final UserRepository userRepository;
        private final OrderMapper orderMapper;
        private final ProductMapper productMapper;

        public DashboardStatsResponse getDashboardStats() {
                log.info("Calculating dashboard stats");

                // Total revenue from delivered orders
                BigDecimal totalRevenue = orderRepository.findAll().stream()
                                .filter(order -> order.getStatus() == OrderStatus.DELIVERED)
                                .map(Order::getTotalPrice)
                                .reduce(BigDecimal.ZERO, BigDecimal::add);

                // Total counts
                Long totalOrders = orderRepository.count();
                Long totalProducts = productRepository.count();
                Long totalCustomers = userRepository.count();

                // Pending and delivered orders
                Long pendingOrders = orderRepository.findAll().stream()
                                .filter(order -> order.getStatus() == OrderStatus.PENDING)
                                .count();
                Long completedOrders = orderRepository.findAll().stream()
                                .filter(order -> order.getStatus() == OrderStatus.DELIVERED)
                                .count();

                // Average order value
                Double averageOrderValue = totalOrders > 0
                                ? totalRevenue.doubleValue() / totalOrders
                                : 0.0;

                // Conversion rate (completed / total)
                Double conversionRate = totalOrders > 0
                                ? (completedOrders * 100.0) / totalOrders
                                : 0.0;

                return DashboardStatsResponse.builder()
                                .totalRevenue(totalRevenue)
                                .totalOrders(totalOrders)
                                .totalProducts(totalProducts)
                                .totalCustomers(totalCustomers)
                                .averageOrderValue(averageOrderValue)
                                .conversionRate(conversionRate)
                                .pendingOrders(pendingOrders)
                                .completedOrders(completedOrders)
                                .build();
        }

        public List<RevenueChartResponse> getRevenueChart(int days) {
                log.info("Getting revenue chart for {} days", days);

                LocalDate startDate = LocalDate.now().minusDays(days);
                LocalDateTime startDateTime = startDate.atStartOfDay();

                List<Order> orders = orderRepository.findAll().stream()
                                .filter(order -> order.getCreatedAt().isAfter(startDateTime))
                                .collect(Collectors.toList());

                return orders.stream()
                                .collect(Collectors.groupingBy(order -> order.getCreatedAt().toLocalDate()))
                                .entrySet()
                                .stream()
                                .map(entry -> {
                                        LocalDate date = entry.getKey();
                                        List<Order> dayOrders = entry.getValue();
                                        BigDecimal dayRevenue = dayOrders.stream()
                                                        .filter(order -> order.getStatus() == OrderStatus.DELIVERED)
                                                        .map(Order::getTotalPrice)
                                                        .reduce(BigDecimal.ZERO, BigDecimal::add);
                                        Long orderCount = (long) dayOrders.size();
                                        BigDecimal avgValue = orderCount > 0
                                                        ? dayRevenue.divide(BigDecimal.valueOf(orderCount))
                                                        : BigDecimal.ZERO;

                                        return RevenueChartResponse.builder()
                                                        .date(date)
                                                        .revenue(dayRevenue)
                                                        .orderCount(orderCount)
                                                        .averageOrderValue(avgValue)
                                                        .build();
                                })
                                .sorted((a, b) -> a.getDate().compareTo(b.getDate()))
                                .collect(Collectors.toList());
        }

        public List<ProductResponse> getTopProducts(int limit) {
                log.info("Getting top {} products", limit);

                return productRepository.findAll().stream()
                                .limit(limit)
                                .map(productMapper::toProductResponse)
                                .collect(Collectors.toList());
        }

        public List<OrderResponse> getRecentOrders(int limit) {
                log.info("Getting recent {} orders", limit);

                return orderRepository.findAll().stream()
                                .sorted((o1, o2) -> o2.getCreatedAt().compareTo(o1.getCreatedAt()))
                                .limit(limit)
                                .map(orderMapper::toOrderResponse)
                                .collect(Collectors.toList());
        }
}
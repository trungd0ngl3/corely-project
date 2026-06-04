package com.corely.corely_backend.entity;

import com.corely.corely_backend.enums.OrderStatus;
import com.corely.corely_backend.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "orders")
@Getter
@Setter
public class Order extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private BigDecimal totalAmount;
    private BigDecimal shippingFee;

    public BigDecimal getTotalPrice() {
        if (totalAmount != null && shippingFee != null) {
            return totalAmount.add(shippingFee);
        }
        return totalAmount != null ? totalAmount : BigDecimal.ZERO;
    }

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus;

    private String paymentMethod;

    @Column(unique = true)
    private String orderCode;

    @Column(columnDefinition = "TEXT")
    private String shippingAddress;

    @ManyToOne
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id", nullable = false)
    private Store store;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items;
}

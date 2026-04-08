package com.corely.corely_backend.entity;

import com.corely.corely_backend.enums.OrderStatus;
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
    @GeneratedValue
    private UUID id;

    private BigDecimal totalAmount;
    private BigDecimal shippingFee;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    private String paymentMethod;

    @Column(columnDefinition = "TEXT")
    private String shippingAddress;

    @ManyToOne
    private User user;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> items;
}
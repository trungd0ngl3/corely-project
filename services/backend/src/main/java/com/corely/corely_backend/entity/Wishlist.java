package com.corely.corely_backend.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "wishlists")
@Getter
@Setter
public class Wishlist {

    @Id
    @GeneratedValue
    private UUID id;

    @OneToOne
    private User user;

    @OneToMany(mappedBy = "wishlist", cascade = CascadeType.ALL)
    private List<WishlistItem> items;
}
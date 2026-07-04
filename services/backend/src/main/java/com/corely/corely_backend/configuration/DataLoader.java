package com.corely.corely_backend.configuration;

import com.corely.corely_backend.entity.Permission;
import com.corely.corely_backend.entity.Role;
import com.corely.corely_backend.entity.User;
import com.corely.corely_backend.entity.Brand;
import com.corely.corely_backend.entity.Category;
import com.corely.corely_backend.entity.Product;
import com.corely.corely_backend.entity.ProductVariant;
import com.corely.corely_backend.entity.Store;
import com.corely.corely_backend.repository.BrandRepository;
import com.corely.corely_backend.repository.CategoryRepository;
import com.corely.corely_backend.repository.PermissionRepository;
import com.corely.corely_backend.repository.ProductRepository;
import com.corely.corely_backend.repository.ProductVariantRepository;
import com.corely.corely_backend.repository.RoleRepository;
import com.corely.corely_backend.repository.StoreRepository;
import com.corely.corely_backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Configuration
public class DataLoader {
    private Product createProduct(
            String name,
            String slug,
            String sku,
            BigDecimal price,
            Integer stock,
            Category category,
            Brand brand,
            Store store,
            Map<String, Object> specs) {
        Product p = new Product();

        p.setName(name);
        p.setSlug(slug);
        p.setSku(sku);

        p.setPrice(price);
        p.setDiscountPrice(price.multiply(new BigDecimal("0.95")));

        p.setStockQuantity(stock);

        p.setDescription(name + " chính hãng, bảo hành 36 tháng.");

        p.setThumbnailUrl("https://placehold.co/600x600/png");

        p.setCategory(category);
        p.setBrand(brand);
        p.setStore(store);

        p.setSpecs(specs);

        p.setIsActive(true);

        return p;
    }

    @Bean
    CommandLineRunner seedData(RoleRepository roleRepository, UserRepository userRepository,
            PermissionRepository permissionRepository, PasswordEncoder passwordEncoder,
            StoreRepository storeRepository, BrandRepository brandRepository,
            CategoryRepository categoryRepository, ProductRepository productRepository,
            ProductVariantRepository productVariantRepository) {
        return args -> {
            // Seed permissions
            if (permissionRepository.count() == 0) {
                List<Permission> permissions = List.of(
                        Permission.builder().name("MANAGE_USERS").description("Create, update, delete users").build(),
                        Permission.builder().name("MANAGE_ROLES").description("Create, update, delete roles").build(),
                        Permission.builder().name("MANAGE_PRODUCTS").description("Create, update, delete products")
                                .build(),
                        Permission.builder().name("MANAGE_ORDERS").description("Manage orders").build(),
                        Permission.builder().name("VIEW_DASHBOARD").description("View dashboard statistics").build());
                permissionRepository.saveAll(permissions);
            }

            // Seed roles
            if (roleRepository.count() == 0) {
                Set<Permission> allPermissions = new HashSet<>(permissionRepository.findAll());

                Role adminRole = Role.builder()
                        .name("ADMIN")
                        .description("Admin role")
                        .permissions(allPermissions)
                        .build();
                Role userRole = Role.builder()
                        .name("USER")
                        .description("User role")
                        .permissions(new HashSet<>())
                        .build();
                roleRepository.save(adminRole);
                roleRepository.save(userRole);
            }

            // Seed admin user
            if (!userRepository.existsByEmail("admin@corely.local")) {
                Role adminRole = roleRepository.findById("ADMIN").orElseThrow();
                User admin = User.builder()
                        .email("admin@corely.local")
                        .password(passwordEncoder.encode("admin123"))
                        .fullName("Admin")
                        .isActive(true)
                        .roles(new HashSet<>(Set.of(adminRole)))
                        .build();
                userRepository.save(admin);
            }

            if (brandRepository.count() == 0) {
                List<Brand> brands = new ArrayList<>();
                brands.add(Brand.builder().name("Intel").slug("intel").build());
                brands.add(Brand.builder().name("AMD").slug("amd").build());
                brands.add(Brand.builder().name("NVIDIA").slug("nvidia").build());
                brands.add(Brand.builder().name("ASUS").slug("asus").build());
                brands.add(Brand.builder().name("MSI").slug("msi").build());
                brands.add(Brand.builder().name("Corsair").slug("corsair").build());
                brands.add(Brand.builder().name("Samsung").slug("samsung").build());
                brandRepository.saveAll(brands);
            }
            if (categoryRepository.count() == 0) {
                List<Category> categories = new ArrayList<>();
                categories.add(Category.builder().name("CPU").slug("cpu").build());
                categories.add(Category.builder().name("Graphics Card").slug("graphics-card").build());
                categories.add(Category.builder().name("Motherboard").slug("motherboard").build());
                categories.add(Category.builder().name("RAM").slug("ram").build());
                categories.add(Category.builder().name("SSD").slug("ssd").build());
                categories.add(Category.builder().name("Laptop").slug("laptop").build());
                categoryRepository.saveAll(categories);
            }
            
            Store store = storeRepository.findAll().get(0);

            Category cpu = categoryRepository.findBySlug("cpu").orElseThrow();
            Category gpu = categoryRepository.findBySlug("graphics-card").orElseThrow();
            Category mb = categoryRepository.findBySlug("motherboard").orElseThrow();
            Category ram = categoryRepository.findBySlug("ram").orElseThrow();
            Category ssd = categoryRepository.findBySlug("ssd").orElseThrow();
            Category laptop = categoryRepository.findBySlug("laptop").orElseThrow();

            Brand intel = brandRepository.findBySlug("intel").orElseThrow();
            Brand amd = brandRepository.findBySlug("amd").orElseThrow();
            Brand nvidia = brandRepository.findBySlug("nvidia").orElseThrow();
            Brand asus = brandRepository.findBySlug("asus").orElseThrow();
            Brand msi = brandRepository.findBySlug("msi").orElseThrow();
            Brand corsair = brandRepository.findBySlug("corsair").orElseThrow();
            Brand samsung = brandRepository.findBySlug("samsung").orElseThrow();
            Brand logitech = brandRepository.findBySlug("logitech").orElseThrow();
            Brand razer = brandRepository.findBySlug("razer").orElseThrow();
            Brand hyperx = brandRepository.findBySlug("hyperx").orElseThrow();
            Brand kingston = brandRepository.findBySlug("kingston").orElseThrow();
            Brand gskill = brandRepository.findBySlug("g-skill").orElseThrow();
            Brand adata = brandRepository.findBySlug("adata").orElseThrow();
            Brand acer = brandRepository.findBySlug("acer").orElseThrow();
            Brand lenovo = brandRepository.findBySlug("lenovo").orElseThrow();
            Brand hp = brandRepository.findBySlug("hp").orElseThrow();
            Brand dell = brandRepository.findBySlug("dell").orElseThrow();
            Brand microsoft = brandRepository.findBySlug("microsoft").orElseThrow();
            Brand apple = brandRepository.findBySlug("apple").orElseThrow();
            Brand huawei = brandRepository.findBySlug("huawei").orElseThrow();
            Brand xiaomi = brandRepository.findBySlug("xiaomi").orElseThrow();
            Brand oppo = brandRepository.findBySlug("oppo").orElseThrow();
            Brand vivo = brandRepository.findBySlug("vivo").orElseThrow();
            Brand realme = brandRepository.findBySlug("realme").orElseThrow();
            Brand oneplus = brandRepository.findBySlug("oneplus").orElseThrow();
            Brand lg = brandRepository.findBySlug("lg").orElseThrow();

            productRepository.save(createProduct(
                    "Intel Core i5-14600K",
                    "intel-core-i5-14600k",
                    "CPU001",
                    new BigDecimal("8490000"),
                    30,
                    cpu,
                    intel,
                    store,
                    Map.of(
                            "Cores", 14,
                            "Threads", 20,
                            "Socket", "LGA1700")));

            productRepository.save(createProduct(
                    "Intel Core i9-14900K",
                    "intel-core-i9-14900k",
                    "CPU002",
                    new BigDecimal("15990000"),
                    15,
                    cpu,
                    intel,
                    store,
                    Map.of(
                            "Cores", 24,
                            "Threads", 32,
                            "Socket", "LGA1700")));

            productRepository.save(createProduct(
                    "AMD Ryzen 7 9800X3D",
                    "amd-ryzen-7-9800x3d",
                    "CPU003",
                    new BigDecimal("13990000"),
                    20,
                    cpu,
                    amd,
                    store,
                    Map.of(
                            "Cores", 8,
                            "Threads", 16,
                            "Socket", "AM5")));
            productRepository.save(createProduct(
                    "NVIDIA RTX 4060 Ti",
                    "rtx-4060-ti",
                    "GPU001",
                    new BigDecimal("12990000"),
                    18,
                    gpu,
                    nvidia,
                    store,
                    Map.of(
                            "VRAM", "8GB GDDR6")));

            productRepository.save(createProduct(
                    "NVIDIA RTX 4070 Super",
                    "rtx-4070-super",
                    "GPU002",
                    new BigDecimal("19990000"),
                    10,
                    gpu,
                    nvidia,
                    store,
                    Map.of(
                            "VRAM", "12GB GDDR6X")));

            productRepository.save(createProduct(
                    "NVIDIA RTX 5090",
                    "rtx-5090",
                    "GPU003",
                    new BigDecimal("68990000"),
                    5,
                    gpu,
                    nvidia,
                    store,
                    Map.of(
                            "VRAM", "32GB GDDR7")));
            productRepository.save(createProduct(
                    "Corsair Vengeance DDR5 32GB",
                    "corsair-ddr5-32gb",
                    "RAM001",
                    new BigDecimal("3590000"),
                    50,
                    ram,
                    corsair,
                    store,
                    Map.of(
                            "Capacity", "32GB",
                            "Speed", "6000MHz")));
            productRepository.save(createProduct(
                    "Samsung 990 Pro 1TB",
                    "samsung-990-pro-1tb",
                    "SSD001",
                    new BigDecimal("3190000"),
                    40,
                    ssd,
                    samsung,
                    store,
                    Map.of(
                            "Capacity", "1TB",
                            "Interface", "PCIe 4.0")));
            productRepository.save(createProduct(
                    "ASUS ROG STRIX Z790-E",
                    "asus-z790-e",
                    "MB001",
                    new BigDecimal("11990000"),
                    15,
                    mb,
                    asus,
                    store,
                    Map.of(
                            "Socket", "LGA1700",
                            "Chipset", "Z790")));

            productRepository.save(createProduct(
                    "MSI MAG B650 Tomahawk",
                    "msi-b650-tomahawk",
                    "MB002",
                    new BigDecimal("6390000"),
                    18,
                    mb,
                    msi,
                    store,
                    Map.of(
                            "Socket", "AM5",
                            "Chipset", "B650")));
            productRepository.save(createProduct(
                    "ASUS ROG Zephyrus G16",
                    "rog-zephyrus-g16",
                    "LAP001",
                    new BigDecimal("52990000"),
                    8,
                    laptop,
                    asus,
                    store,
                    Map.of(
                            "CPU", "Intel Core Ultra 9",
                            "GPU", "RTX 4080",
                            "RAM", "32GB")));

            productRepository.save(createProduct(
                    "MSI Raider GE78 HX",
                    "msi-raider-ge78",
                    "LAP002",
                    new BigDecimal("68990000"),
                    6,
                    laptop,
                    msi,
                    store,
                    Map.of(
                            "CPU", "Intel Core i9",
                            "GPU", "RTX 4090",
                            "RAM", "32GB")));
    }
}
}
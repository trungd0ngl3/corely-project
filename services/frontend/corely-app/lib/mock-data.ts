import { Cpu, Gpu, HardDrive, Laptop, Monitor, Mouse, Keyboard, Smartphone } from "lucide-react";

export const CATEGORIES = [
    { name: "CPU", icon: Cpu, href: "/category/cpu" },
    { name: "GPU", icon: Gpu, href: "/category/gpu" },
    { name: "RAM", icon: Smartphone, href: "/category/ram" },
    { name: "SSD", icon: HardDrive, href: "/category/ssd" },
    { name: "Laptop", icon: Laptop, href: "/category/laptop" },
    { name: "Monitor", icon: Monitor, href: "/category/monitor" },
    { name: "Keyboard", icon: Keyboard, href: "/category/keyboard" },
    { name: "Mouse", icon: Mouse, href: "/category/mouse" },
];

export const FLASH_SALE_PRODUCTS = [
    {
        id: "fs-1",
        name: "ASUS ROG Strix GeForce RTX 5080 OC Edition 16GB GDDR7",
        price: 1199.99,
        originalPrice: 1299.99,
        image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop",
        brand: "ASUS",
        isFlashSale: true,
        soldPercentage: 68,
    },
    {
        id: "fs-2",
        name: "Intel Core i9-14900K Processor 24-Core up to 6.0 GHz",
        price: 549.99,
        originalPrice: 589.99,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1000&auto=format&fit=crop",
        brand: "Intel",
        isFlashSale: true,
        soldPercentage: 45,
    },
    {
        id: "fs-3",
        name: "Samsung 990 PRO SSD 2TB PCIe 4.0 NVMe",
        price: 169.99,
        originalPrice: 199.99,
        image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=1000&auto=format&fit=crop",
        brand: "Samsung",
        isFlashSale: true,
        soldPercentage: 82,
    },
    {
        id: "fs-4",
        name: "Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz",
        price: 124.99,
        originalPrice: 149.99,
        image: "https://images.unsplash.com/photo-1562976540-1502c2145186?q=80&w=1000&auto=format&fit=crop",
        brand: "Corsair",
        isFlashSale: true,
        soldPercentage: 30,
    },
];

export const FEATURED_PRODUCTS = [
    {
        id: "fp-1",
        name: "ASUS ROG Zephyrus G14 (2024) GA403",
        price: 1599.99,
        image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?q=80&w=1000&auto=format&fit=crop",
        brand: "ASUS",
        rating: 4.8,
        category: "Laptop",
    },
    {
        id: "fp-2",
        name: "MSI MPG Z790 CARBON WIFI Motherboard",
        price: 349.99,
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1000&auto=format&fit=crop",
        brand: "MSI",
        rating: 4.7,
        category: "Gaming",
    },
    {
        id: "fp-3",
        name: "Logitech G Pro X Superlight 2 Wireless",
        price: 159.00,
        image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?q=80&w=1000&auto=format&fit=crop",
        brand: "Logitech",
        rating: 4.9,
        category: "Accessories",
    },
    {
        id: "fp-4",
        name: "AMD Ryzen 9 7950X3D 16-Core Processor",
        price: 699.00,
        image: "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?q=80&w=1000&auto=format&fit=crop",
        brand: "AMD",
        rating: 4.9,
        category: "Workstation",
    },
];

export const BRANDS = [
    { name: "ASUS", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2e/ASUS_Logo.svg" },
    { name: "MSI", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a6/MSI_Logo.svg" },
    { name: "Gigabyte", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Gigabyte_Technology_logo.svg" },
    { name: "Intel", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c9/Intel-logo.svg" },
    { name: "AMD", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/AMD_Logo.svg" },
    { name: "Corsair", logo: "https://upload.wikimedia.org/wikipedia/commons/1/1c/Corsair_Logo.svg" },
    { name: "Samsung", logo: "https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg" },
    { name: "Logitech", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Logitech_logo.svg" },
];
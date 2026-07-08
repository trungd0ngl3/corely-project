export interface ProductImage {
    id: string;
    url: string;
    alt: string;
}

export interface SpecGroup {
    title: string;
    specs: { label: string; value: string }[];
}

export interface Review {
    id: string;
    author: string;
    rating: number;
    comment: string;
    date: string;
    verified: boolean;
}

export interface Question {
    id: string;
    question: string;
    answer: string;
    author: string;
    date: string;
}

export interface BenchmarkEntry {
    game: string;
    resolution: string;
    fps: number;
}

export interface RelatedProduct {
    id: string;
    name: string;
    price: number;
    image: string;
    brand: string;
    rating: number;
    slug: string;
}

export interface BundleItem {
    id: string;
    name: string;
    price: number;
    image: string;
}

export interface ProductDetail {
    id: string;
    slug: string;
    name: string;
    brand: string;
    price: number;
    originalPrice: number;
    stock: number;
    rating: number;
    reviewCount: number;
    images: ProductImage[];
    features: string[];
    specifications: SpecGroup[];
    compatibility: string[];
    reviews: Review[];
    ratingDistribution: number[];
    questions: Question[];
    relatedProducts: RelatedProduct[];
    bundle: {
        items: BundleItem[];
        bundlePrice: number;
    };
    benchmarks: BenchmarkEntry[];
}

export const MOCK_PRODUCT: ProductDetail = {
    id: "1",
    slug: "asus-rtx-5070-ti-tuf-gaming",
    name: "ASUS TUF Gaming RTX 5070 Ti OC Edition 16GB GDDR7",
    brand: "ASUS",
    price: 24990000,
    originalPrice: 27990000,
    stock: 8,
    rating: 4.8,
    reviewCount: 124,
    images: [
        {
            id: "img-1",
            url: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop",
            alt: "RTX 5070 Ti front view",
        },
        {
            id: "img-2",
            url: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=1000&auto=format&fit=crop",
            alt: "RTX 5070 Ti angle view",
        },
        {
            id: "img-3",
            url: "https://images.unsplash.com/photo-1555618254-5e06212e7592?q=80&w=1000&auto=format&fit=crop",
            alt: "RTX 5070 Ti ports",
        },
        {
            id: "img-4",
            url: "https://images.unsplash.com/photo-1625225233840-695456021cde?q=80&w=1000&auto=format&fit=crop",
            alt: "RTX 5070 Ti in case",
        },
    ],
    features: [
        "NVIDIA Blackwell Architecture",
        "16GB GDDR7",
        "DLSS 4",
        "Ray Tracing",
        "Triple Fan Cooling",
        "PCIe 5.0",
    ],
    specifications: [
        {
            title: "General",
            specs: [
                { label: "Brand", value: "ASUS" },
                { label: "Model", value: "TUF Gaming OC Edition" },
                { label: "Chipset", value: "NVIDIA GeForce RTX 5070 Ti" },
                { label: "Architecture", value: "Blackwell" },
            ],
        },
        {
            title: "Memory",
            specs: [
                { label: "Memory Size", value: "16GB" },
                { label: "Memory Type", value: "GDDR7" },
                { label: "Memory Bus", value: "256-bit" },
                { label: "Memory Speed", value: "28 Gbps" },
            ],
        },
        {
            title: "Performance",
            specs: [
                { label: "Boost Clock", value: "2760 MHz" },
                { label: "CUDA Cores", value: "8960" },
                { label: "RT Cores", value: "3rd Gen" },
                { label: "Tensor Cores", value: "5th Gen" },
            ],
        },
        {
            title: "Power",
            specs: [
                { label: "TDP", value: "300W" },
                { label: "Recommended PSU", value: "750W" },
                { label: "Power Connector", value: "16-pin" },
            ],
        },
        {
            title: "Connectivity",
            specs: [
                { label: "HDMI", value: "2x HDMI 2.1" },
                { label: "DisplayPort", value: "3x DP 2.1" },
                { label: "Max Resolution", value: "7680x4320" },
            ],
        },
        {
            title: "Physical",
            specs: [
                { label: "Length", value: "305 mm" },
                { label: "Width", value: "137 mm" },
                { label: "Slot Size", value: "2.7 Slot" },
                { label: "Weight", value: "1.47 kg" },
            ],
        },
    ],
    compatibility: [
        "Intel Z790 Motherboards",
        "AMD X870 Motherboards",
        "PCIe 5.0 x16 Slot",
        "ATX / E-ATX Cases (305mm+ GPU clearance)",
        "750W+ PSU Required",
    ],
    ratingDistribution: [80, 15, 3, 1, 1],
    reviews: [
        {
            id: "r-1",
            author: "John D.",
            rating: 5,
            comment: "Excellent cooling and performance. Runs Cyberpunk 2077 at 4K with RT on smoothly. Fan noise is minimal under load.",
            date: "June 2026",
            verified: true,
        },
        {
            id: "r-2",
            author: "Minh T.",
            rating: 5,
            comment: "Upgraded from RTX 3080. DLSS 4 is a game changer. Build quality feels premium.",
            date: "May 2026",
            verified: true,
        },
        {
            id: "r-3",
            author: "Sarah K.",
            rating: 4,
            comment: "Great card overall. Only minor complaint is the size — make sure your case can fit it. Performance is top notch.",
            date: "May 2026",
            verified: true,
        },
        {
            id: "r-4",
            author: "Alex N.",
            rating: 5,
            comment: "Perfect for 1440p gaming. Overkill even. DLSS 4 makes everything butter smooth.",
            date: "April 2026",
            verified: false,
        },
    ],
    questions: [
        {
            id: "q-1",
            question: "Can this GPU fit in NZXT H5 Flow?",
            answer: "Yes, the NZXT H5 Flow supports GPUs up to 365mm. This card is 305mm so it fits with room to spare.",
            author: "Corely Staff",
            date: "June 2026",
        },
        {
            id: "q-2",
            question: "Is a 650W PSU enough?",
            answer: "NVIDIA recommends a 750W PSU minimum. A 650W may work but is not recommended for stable operation under full load.",
            author: "Corely Staff",
            date: "May 2026",
        },
        {
            id: "q-3",
            question: "Does this support AV1 encoding?",
            answer: "Yes, the RTX 5070 Ti supports dual AV1 encoders for streaming and video editing.",
            author: "Corely Staff",
            date: "May 2026",
        },
    ],
    relatedProducts: [
        {
            id: "rp-1",
            name: "ASUS TUF Gaming RTX 5070 OC 12GB",
            price: 18990000,
            image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=1000&auto=format&fit=crop",
            brand: "ASUS",
            rating: 4.7,
            slug: "asus-rtx-5070-tuf-gaming",
        },
        {
            id: "rp-2",
            name: "MSI Gaming X Slim RTX 5080 16GB",
            price: 32990000,
            image: "https://images.unsplash.com/photo-1591488320449-011701bb6704?q=80&w=1000&auto=format&fit=crop",
            brand: "MSI",
            rating: 4.9,
            slug: "msi-rtx-5080-gaming-x-slim",
        },
        {
            id: "rp-3",
            name: "Gigabyte AORUS RTX 5070 Ti Master",
            price: 26990000,
            image: "https://images.unsplash.com/photo-1555618254-5e06212e7592?q=80&w=1000&auto=format&fit=crop",
            brand: "Gigabyte",
            rating: 4.6,
            slug: "gigabyte-rtx-5070-ti-aorus-master",
        },
        {
            id: "rp-4",
            name: "AMD Radeon RX 8800 XT 16GB",
            price: 22990000,
            image: "https://images.unsplash.com/photo-1625225233840-695456021cde?q=80&w=1000&auto=format&fit=crop",
            brand: "AMD",
            rating: 4.5,
            slug: "amd-rx-8800-xt",
        },
    ],
    bundle: {
        items: [
            {
                id: "b-1",
                name: "ASUS TUF Gaming RTX 5070 Ti",
                price: 24990000,
                image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=400&auto=format&fit=crop",
            },
            {
                id: "b-2",
                name: "Corsair RM750x 750W 80+ Gold PSU",
                price: 3490000,
                image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=400&auto=format&fit=crop",
            },
            {
                id: "b-3",
                name: "NZXT H5 Flow ATX Mid Tower Case",
                price: 2990000,
                image: "https://images.unsplash.com/photo-1587831990711-23ca6441447b?q=80&w=400&auto=format&fit=crop",
            },
        ],
        bundlePrice: 29990000,
    },
    benchmarks: [
        { game: "Cyberpunk 2077", resolution: "1440p Ultra + RT", fps: 92 },
        { game: "Cyberpunk 2077", resolution: "4K Ultra + RT", fps: 58 },
        { game: "Valorant", resolution: "1440p High", fps: 410 },
        { game: "CS2", resolution: "1440p High", fps: 320 },
        { game: "Elden Ring", resolution: "1440p Max", fps: 60 },
        { game: "Black Myth: Wukong", resolution: "1440p Ultra", fps: 78 },
    ],
};
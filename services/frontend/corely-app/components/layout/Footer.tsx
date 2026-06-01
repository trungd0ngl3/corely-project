const footerLinks = {
    "Sản phẩm": ["CPU / Bộ xử lý", "GPU / Card đồ họa", "RAM", "SSD / Ổ cứng", "Mainboard", "Nguồn / PSU", "Case / Vỏ máy", "PC Build sẵn"],
    "Hỗ trợ": ["Trung tâm trợ giúp", "Chính sách bảo hành", "Đổi trả & Hoàn tiền", "Hướng dẫn mua hàng", "Thanh toán & Vận chuyển"],
    "Về Corely": ["Giới thiệu", "Tuyển dụng", "Blog công nghệ", "Liên hệ"],
};

export default function Footer() {
    return (
        <footer className="bg-surface border-t border-border mt-16">
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <a href="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">C</span>
                            </div>
                            <span className="text-xl font-bold text-foreground">
                                Core<span className="text-primary">ly</span>
                            </span>
                        </a>
                        <p className="text-sm text-muted leading-relaxed">
                            Chuyên cung cấp linh kiện máy tính chính hãng và PC build sẵn chất lượng cao với giá tốt nhất.
                        </p>
                        <div className="flex gap-3">
                            {["Facebook", "YouTube", "TikTok"].map((social) => (
                                <a
                                    key={social}
                                    href="#"
                                    className="w-9 h-9 rounded-lg bg-background border border-border flex items-center justify-center text-muted hover:text-primary hover:border-primary transition-colors"
                                >
                                    <span className="text-xs font-bold">{social[0]}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="font-semibold text-foreground mb-4">{title}</h4>
                            <ul className="space-y-2">
                                {links.map((link) => (
                                    <li key={link}>
                                        <a href="#" className="text-sm text-muted hover:text-primary transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted">© 2026 Corely. All rights reserved.</p>
                    <div className="flex gap-4 text-sm text-muted">
                        <a href="#" className="hover:text-primary transition-colors">Điều khoản</a>
                        <a href="#" className="hover:text-primary transition-colors">Bảo mật</a>
                        <a href="#" className="hover:text-primary transition-colors">Cookie</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
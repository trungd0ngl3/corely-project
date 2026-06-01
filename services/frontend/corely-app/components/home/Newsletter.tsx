"use client";

import Button from "../ui/Button";

export default function Newsletter() {
    return (
        <section className="max-w-7xl mx-auto px-4 py-12">
            <div className="bg-gradient-to-r from-primary/20 to-secondary/20 rounded-2xl border border-primary/20 p-8 md:p-12 text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                    Đừng bỏ lỡ ưu đãi hot! 🔔
                </h2>
                <p className="text-muted mb-6 max-w-lg mx-auto">
                    Đăng ký nhận thông báo khuyến mãi, sản phẩm mới và deal độc quyền từ Corely.
                </p>
                <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                    <input
                        type="email"
                        placeholder="Email của bạn..."
                        className="flex-1 bg-background border border-border rounded-lg px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:border-primary transition-colors"
                    />
                    <Button type="submit" size="lg">
                        Đăng ký
                    </Button>
                </form>
                <p className="text-xs text-muted mt-3">Miễn phí, hủy bất cứ lúc nào. Không spam.</p>
            </div>
        </section>
    );
}
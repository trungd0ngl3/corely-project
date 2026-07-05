import Link from "next/link";

export default function SellerDashboard() {
    // số liệu tĩnh, không backend
    const stats = {
        products: 3,
        inventory: 15,
        coupons: 2,
    };
    return (
        <main>
            <h1>Seller Dashboard</h1>
            <nav>
                <ul>
                    <li>
                        <Link href="/(store)/product-management">Quản lý sản phẩm</Link>
                    </li>
                    <li>
                        <Link href="/(store)/coupon-management">Quản lý mã giảm giá</Link>
                    </li>
                    <li>
                        <Link href="/(store)/inventory">Quản lý tồn kho</Link>
                    </li>
                </ul>
            </nav>
            <section>
                <h2>Thống kê</h2>
                <ul>
                    <li>Sản phẩm: {stats.products}</li>
                    <li>Tổng tồn kho: {stats.inventory}</li>
                    <li>Mã giảm giá: {stats.coupons}</li>
                </ul>
                <p>Chọn chức năng để quản lý cửa hàng.</p>
            </section>
        </main>
    );
}

// → skipped: auth, role check, responsive nav. Add when needed.

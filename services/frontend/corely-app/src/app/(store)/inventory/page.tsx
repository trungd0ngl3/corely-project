import React from "react";

export default function InventoryPage() {
    const inventory = [
        { id: 1, name: "Áo thun", stock: 10 },
        { id: 2, name: "Quần jeans", stock: 5 },
        { id: 3, name: "Áo sơ mi", stock: 0 },
    ];
    return (
        <main>
            <h1>Quản lý tồn kho</h1>
            <table>
                <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Tồn kho</th>
                        <th>Trạng thái</th>
                    </tr>
                </thead>
                <tbody>
                    {inventory.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.stock}</td>
                            <td>
                                {item.stock > 0 ? "Còn hàng" : "Hết hàng"}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
}

// → skipped: backend integration, CRUD, filter/search. Add when API ready or needed.

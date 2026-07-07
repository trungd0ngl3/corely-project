"use client";
import React, { useState } from "react";

export default function ProductManagementPage() {
    // ponytail: static list, no backend yet
    const [products, setProducts] = useState([
        { id: 1, name: "Áo thun", price: 120000, stock: 10 },
        { id: 2, name: "Quần jeans", price: 350000, stock: 5 },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [editIdx, setEditIdx] = useState<number | null>(null);
    const [form, setForm] = useState({ name: "", price: "", stock: "" });
    const [error, setError] = useState("");

    function openAdd() {
        setForm({ name: "", price: "", stock: "" });
        setEditIdx(null);
        setError("");
        setShowModal(true);
    }
    function openEdit(idx: number) {
        setForm({
            name: products[idx].name,
            price: products[idx].price.toString(),
            stock: products[idx].stock.toString(),
        });
        setEditIdx(idx);
        setError("");
        setShowModal(true);
    }
    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!form.name.trim()) return setError("Tên sản phẩm không được để trống");
        if (!/^\d+$/.test(form.price) || +form.price <= 0) return setError("Giá phải là số dương");
        if (!/^\d+$/.test(form.stock) || +form.stock < 0) return setError("Tồn kho phải là số không âm");
        if (editIdx === null) {
            setProducts([
                ...products,
                {
                    id: products.length ? Math.max(...products.map(p => p.id)) + 1 : 1,
                    name: form.name,
                    price: +form.price,
                    stock: +form.stock,
                },
            ]);
        } else {
            const copy = [...products];
            copy[editIdx] = {
                ...copy[editIdx],
                name: form.name,
                price: +form.price,
                stock: +form.stock,
            };
            setProducts(copy);
        }
        setShowModal(false);
    }
    function handleDelete(idx: number) {
        if (window.confirm("Xóa sản phẩm này?")) {
            setProducts(products.filter((_, i) => i !== idx));
        }
    }

    return (
        <main>
            <h1>Quản lý sản phẩm</h1>
            <table>
                <thead>
                    <tr>
                        <th>Tên sản phẩm</th>
                        <th>Giá</th>
                        <th>Tồn kho</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p, idx) => (
                        <tr key={p.id}>
                            <td>{p.name}</td>
                            <td>{p.price.toLocaleString("vi-VN")}₫</td>
                            <td>{p.stock}</td>
                            <td>
                                <button onClick={() => openEdit(idx)}>Sửa</button>
                                <button onClick={() => handleDelete(idx)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={openAdd}>Thêm sản phẩm</button>
            {showModal && (
                <div style={{
                    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                    background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                    <form style={{ background: "#fff", padding: 20, minWidth: 300 }} onSubmit={handleSubmit}>
                        <h2>{editIdx === null ? "Thêm sản phẩm" : "Sửa sản phẩm"}</h2>
                        <div>
                            <label>
                                Tên sản phẩm:
                                <input name="name" value={form.name} onChange={handleChange} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Giá:
                                <input name="price" value={form.price} onChange={handleChange} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Tồn kho:
                                <input name="stock" value={form.stock} onChange={handleChange} />
                            </label>
                        </div>
                        {error && <div style={{ color: "red" }}>{error}</div>}
                        <button type="submit">Lưu</button>
                        <button type="button" onClick={() => setShowModal(false)}>Hủy</button>
                    </form>
                </div>
            )}
        </main>
    );
}

// → skipped: backend integration, pagination, search. Add when API ready or needed.

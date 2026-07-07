"use client";
import React, { useState } from "react";

export default function CouponManagementPage() {
    const [coupons, setCoupons] = useState([
        { id: 1, code: "SALE10", discount: 10, quantity: 100 },
        { id: 2, code: "FREESHIP", discount: 0, quantity: 50 },
    ]);
    const [showModal, setShowModal] = useState(false);
    const [editIdx, setEditIdx] = useState<number | null>(null);
    const [form, setForm] = useState({ code: "", discount: "", quantity: "" });
    const [error, setError] = useState("");

    function openAdd() {
        setForm({ code: "", discount: "", quantity: "" });
        setEditIdx(null);
        setError("");
        setShowModal(true);
    }
    function openEdit(idx: number) {
        setForm({
            code: coupons[idx].code,
            discount: coupons[idx].discount.toString(),
            quantity: coupons[idx].quantity.toString(),
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
        if (!form.code.trim()) return setError("Mã không được để trống");
        if (!/^\d+$/.test(form.discount) || +form.discount < 0) return setError("Giảm giá phải >= 0");
        if (!/^\d+$/.test(form.quantity) || +form.quantity < 0) return setError("Số lượng phải >= 0");
        if (editIdx === null) {
            setCoupons([
                ...coupons,
                {
                    id: coupons.length ? Math.max(...coupons.map(c => c.id)) + 1 : 1,
                    code: form.code,
                    discount: +form.discount,
                    quantity: +form.quantity,
                },
            ]);
        } else {
            const copy = [...coupons];
            copy[editIdx] = {
                ...copy[editIdx],
                code: form.code,
                discount: +form.discount,
                quantity: +form.quantity,
            };
            setCoupons(copy);
        }
        setShowModal(false);
    }
    function handleDelete(idx: number) {
        if (window.confirm("Xóa mã này?")) {
            setCoupons(coupons.filter((_, i) => i !== idx));
        }
    }

    return (
        <main>
            <h1>Quản lý mã giảm giá</h1>
            <table>
                <thead>
                    <tr>
                        <th>Mã</th>
                        <th>Giảm giá (%)</th>
                        <th>Số lượng</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {coupons.map((c, idx) => (
                        <tr key={c.id}>
                            <td>{c.code}</td>
                            <td>{c.discount}</td>
                            <td>{c.quantity}</td>
                            <td>
                                <button onClick={() => openEdit(idx)}>Sửa</button>
                                <button onClick={() => handleDelete(idx)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={openAdd}>Thêm mã</button>
            {showModal && (
                <div style={{
                    position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
                    background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center"
                }}>
                    <form style={{ background: "#fff", padding: 20, minWidth: 300 }} onSubmit={handleSubmit}>
                        <h2>{editIdx === null ? "Thêm mã" : "Sửa mã"}</h2>
                        <div>
                            <label>
                                Mã:
                                <input name="code" value={form.code} onChange={handleChange} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Giảm giá (%):
                                <input name="discount" value={form.discount} onChange={handleChange} />
                            </label>
                        </div>
                        <div>
                            <label>
                                Số lượng:
                                <input name="quantity" value={form.quantity} onChange={handleChange} />
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

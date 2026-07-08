"use client";
import { useState } from "react";

const MOCK_REVIEWS = [
    {
        id: 1,
        product: "Intel Core i9-14900K",
        rating: 5,
        comment: "CPU mạnh, chạy mát, hài lòng.",
        date: "2026-06-20"
    },
    {
        id: 2,
        product: "Samsung 990 Pro 2TB",
        rating: 4,
        comment: "SSD nhanh, giá ổn.",
        date: "2026-05-25"
    }
];

export default function ReviewsPage() {
    const [reviews, setReviews] = useState(MOCK_REVIEWS);
    const [editId, setEditId] = useState<number | null>(null);
    const [form, setForm] = useState({ rating: 5, comment: "" });

    function handleEdit(r: typeof MOCK_REVIEWS[0]) {
        setEditId(r.id);
        setForm({ rating: r.rating, comment: r.comment });
    }

    function handleSave(id: number) {
        setReviews(reviews.map(r => r.id === id ? { ...r, rating: form.rating, comment: form.comment } : r));
        setEditId(null);
    }

    function handleDelete(id: number) {
        setReviews(reviews.filter(r => r.id !== id));
    }

    return (
        <div className="max-w-2xl mx-auto py-12">
            <h1 className="headline-lg mb-4">My Reviews</h1>
            <div className="space-y-4">
                {reviews.map(r => (
                    <div key={r.id} className="bg-surface-container-lowest rounded-xl p-6 border border-outline-variant">
                        <div className="flex justify-between items-center mb-2">
                            <div>
                                <div className="font-bold">{r.product}</div>
                                <div className="text-xs text-on-surface-variant">{r.date}</div>
                            </div>
                            <div>
                                {editId === r.id ? (
                                    <input
                                        type="number"
                                        min={1}
                                        max={5}
                                        className="w-12 rounded border px-2 py-1"
                                        value={form.rating}
                                        onChange={e => setForm({ ...form, rating: Number(e.target.value) })}
                                    />
                                ) : (
                                    <span className="font-bold text-primary">{r.rating}★</span>
                                )}
                            </div>
                        </div>
                        {editId === r.id ? (
                            <div>
                                <textarea
                                    className="w-full rounded border px-3 py-2 mb-2"
                                    value={form.comment}
                                    onChange={e => setForm({ ...form, comment: e.target.value })}
                                />
                                <div className="flex gap-2">
                                    <button className="btn-primary" onClick={() => handleSave(r.id)}>Save</button>
                                    <button className="btn-secondary" onClick={() => setEditId(null)}>Cancel</button>
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div className="mb-2">{r.comment}</div>
                                <div className="flex gap-2">
                                    <button className="btn-primary" onClick={() => handleEdit(r)}>Edit</button>
                                    <button className="btn-secondary" onClick={() => handleDelete(r.id)}>Delete</button>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
                {reviews.length === 0 && (
                    <div className="text-center text-on-surface-variant">No reviews yet.</div>
                )}
            </div>
        </div>
    );
}
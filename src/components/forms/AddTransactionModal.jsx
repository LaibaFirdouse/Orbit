import React, { useEffect, useRef, useState } from "react";

const EMPTY = {
    title: "",
    amount: "",
    category: "",
    type: "expense",
    date: "",
};

export default function AddTransactionModal({ isOpen, onClose, onSubmit, initialData }) {
    const [form, setForm] = useState({ ...EMPTY });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const firstRef = useRef(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setForm({ ...EMPTY, ...(initialData || {}) });
            setErrors({});
            setTouched({});
            // small delay to allow mount animation
            requestAnimationFrame(() => setMounted(true));
            // autofocus
            setTimeout(() => firstRef.current?.focus(), 50);
        } else {
            setMounted(false);
        }
    }, [isOpen, initialData]);

    const validate = (f) => {
        const e = {};
        if (!f.title || f.title.trim().length < 3) e.title = "Title is required (min 3 chars).";
        if (!f.amount || Number(f.amount) <= 0) e.amount = "Amount must be greater than 0.";
        if (!f.category || f.category.trim() === "") e.category = "Category is required.";
        if (!f.type) e.type = "Type is required.";
        if (!f.date) e.date = "Date is required.";
        return e;
    };

    useEffect(() => {
        setErrors(validate(form));
    }, [form]);

    const isValid = Object.keys(errors).length === 0;

    const handleChange = (k, v) => setForm((s) => ({ ...s, [k]: v }));

    const handleSubmit = () => {
        const e = validate(form);
        setErrors(e);
        if (Object.keys(e).length) return;

        const payload = {
            ...form,
            amount: Number(form.amount),
            id: form.id || Date.now(),
        };

        onSubmit(payload);
        // close + reset
        setMounted(false);
        onClose();
        setForm({ ...EMPTY });
    };

    const handleCancel = () => {
        setForm({ ...EMPTY });
        setErrors({});
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-40 flex items-center justify-center">
            <div className={`absolute inset-0 bg-black/50 transition-opacity ${mounted ? "opacity-100" : "opacity-0"}`} />

            <div
                role="dialog"
                aria-modal="true"
                className={`relative z-50 w-full max-w-md mx-4 ${mounted ? "scale-100 opacity-100" : "scale-95 opacity-0"} transform transition-all duration-200`}
            >
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-xl border border-gray-800">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{initialData ? "Edit Transaction" : "Add Transaction"}</h2>

                    <div className="mt-4 space-y-3">
                        <div>
                            <input
                                ref={firstRef}
                                placeholder="Title"
                                value={form.title}
                                onChange={(e) => handleChange("title", e.target.value)}
                                onBlur={() => setTouched((p) => ({ ...p, title: true }))}
                                className={`w-full px-3 py-2 rounded-md bg-gray-800 border ${touched.title && errors.title ? "border-red-500" : "border-gray-700"} text-gray-200 focus:ring-2 focus:ring-purple-500`}
                            />
                            {touched.title && errors.title && <p className="text-sm text-red-400 mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <input
                                placeholder="Amount"
                                type="number"
                                value={form.amount}
                                onChange={(e) => handleChange("amount", e.target.value)}
                                onBlur={() => setTouched((p) => ({ ...p, amount: true }))}
                                className={`w-full px-3 py-2 rounded-md bg-gray-800 border ${touched.amount && errors.amount ? "border-red-500" : "border-gray-700"} text-gray-200 focus:ring-2 focus:ring-purple-500`}
                            />
                            {touched.amount && errors.amount && <p className="text-sm text-red-400 mt-1">{errors.amount}</p>}
                        </div>

                        <div>
                            <input
                                placeholder="Category"
                                value={form.category}
                                onChange={(e) => handleChange("category", e.target.value)}
                                onBlur={() => setTouched((p) => ({ ...p, category: true }))}
                                className={`w-full px-3 py-2 rounded-md bg-gray-800 border ${touched.category && errors.category ? "border-red-500" : "border-gray-700"} text-gray-200 focus:ring-2 focus:ring-purple-500`}
                            />
                            {touched.category && errors.category && <p className="text-sm text-red-400 mt-1">{errors.category}</p>}
                        </div>

                        <div>
                            <select
                                value={form.type}
                                onChange={(e) => handleChange("type", e.target.value)}
                                onBlur={() => setTouched((p) => ({ ...p, type: true }))}
                                className={`w-full px-3 py-2 rounded-md bg-gray-800 border ${touched.type && errors.type ? "border-red-500" : "border-gray-700"} text-gray-200 focus:ring-2 focus:ring-purple-500`}
                            >
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                            {touched.type && errors.type && <p className="text-sm text-red-400 mt-1">{errors.type}</p>}
                        </div>

                        <div>
                            <input
                                type="date"
                                value={form.date}
                                onChange={(e) => handleChange("date", e.target.value)}
                                onBlur={() => setTouched((p) => ({ ...p, date: true }))}
                                className={`w-full px-3 py-2 rounded-md bg-gray-800 border ${touched.date && errors.date ? "border-red-500" : "border-gray-700"} text-gray-200 focus:ring-2 focus:ring-purple-500`}
                            />
                            {touched.date && errors.date && <p className="text-sm text-red-400 mt-1">{errors.date}</p>}
                        </div>
                    </div>

                    <div className="mt-6 flex justify-end gap-3">
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-600 text-gray-100 transition-colors duration-150"
                        >
                            Cancel
                        </button>

                        <button
                            onClick={handleSubmit}
                            disabled={!isValid}
                            className={`px-4 py-2 rounded-md text-white transition-colors duration-150 ${isValid ? "bg-purple-600 hover:bg-purple-700 active:scale-95" : "bg-purple-600/60 cursor-not-allowed"}`}
                        >
                            {initialData ? "Save" : "Add"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
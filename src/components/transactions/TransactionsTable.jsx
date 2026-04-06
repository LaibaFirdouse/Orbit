import React from "react";
import { Pencil, Trash2 } from "lucide-react";

function formatDate(iso) {
    const d = new Date(iso);
    if (isNaN(d)) return "";
    const day = String(d.getDate()).padStart(2, "0");
    const month = d.toLocaleString(undefined, { month: "short" });
    const year = d.getFullYear();
    return `${day} ${month} ${year}`;
}

function formatTime(iso) {
    const d = new Date(iso);
    if (isNaN(d)) return "";
    let hours = d.getHours();
    const minutes = String(d.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
}

const categoryEmoji = (cat) => {
    if (!cat) return "🔔";
    const c = cat.toLowerCase();
    if (c.includes("grocer") || c.includes("food")) return "🛒";
    if (c.includes("salary") || c.includes("pay")) return "💼";
    if (c.includes("electric")) return "💡";
    if (c.includes("freelance") || c.includes("service")) return "🧑‍💻";
    return "🔔";
};

const currency = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
});

export default function TransactionsTable({
    transactions,
    onEdit,
    onDelete,
    role,
}) {
    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-800 shadow-md overflow-hidden transition hover:scale-[1.01]">

            {/* EMPTY STATE */}
            {transactions.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                    <p className="text-lg font-medium">No transactions found</p>
                    <p className="text-sm">Try adjusting filters or add new data</p>
                </div>
            ) : (
                <div className="w-full">

                    {/* HEADER */}
                    <div className="grid grid-cols-[auto_2fr_1fr_1fr_1fr_auto] items-center px-4 py-3 border-b border-gray-200 dark:border-gray-800 text-xs uppercase tracking-wide text-gray-400">
                        <div></div>
                        <div>Activity</div>
                        <div>Date</div>
                        <div>Time</div>
                        <div>Amount</div>
                        <div className="text-right">Actions</div>
                    </div>

                    {/* ROWS */}
                    <div>
                        {transactions.map((t) => (
                            <div
                                key={t.id}
                                className="group grid grid-cols-[auto_2fr_1fr_1fr_1fr_auto] items-center px-4 py-3 border-b border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/60 transition-all duration-200"
                            >
                                {/* Checkbox */}
                                <div>
                                    <input type="checkbox" />
                                </div>

                                {/* Activity */}
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-sm">
                                        {categoryEmoji(t.category)}
                                    </div>

                                    <div>
                                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                            {t.title}
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            {t.category}
                                        </div>
                                    </div>
                                </div>

                                {/* Date */}
                                <div className="text-gray-700 dark:text-gray-300 text-sm">
                                    {formatDate(t.date)}
                                </div>

                                {/* Time */}
                                <div className="text-gray-500 dark:text-gray-400 text-sm">
                                    {formatTime(t.date)}
                                </div>

                                {/* Amount */}
                                <div
                                    className={`font-semibold text-sm ${t.type === "income"
                                        ? "text-green-600"
                                        : "text-red-500"
                                        }`}
                                >
                                    ₹{currency.format(t.amount)}
                                </div>

                                {/* ACTIONS */}
                                <div className="flex justify-end gap-2 opacity-70 group-hover:opacity-100 transition">

                                    {role === "admin" && (
                                        <>
                                            <button
                                                onClick={() => onEdit(t)}
                                                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md"
                                                title="Edit"
                                            >
                                                <Pencil size={16} className="text-gray-700 dark:text-gray-100" />
                                            </button>

                                            <button
                                                onClick={() => onDelete(t.id)}
                                                className="p-2 hover:bg-red-50 dark:hover:bg-red-700/10 rounded-md"
                                                title="Delete"
                                            >
                                                <Trash2
                                                    size={16}
                                                    className="text-red-500"
                                                />
                                            </button>
                                        </>
                                    )}

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
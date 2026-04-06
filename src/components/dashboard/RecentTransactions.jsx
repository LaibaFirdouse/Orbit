import React, { useEffect, useState } from "react";

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

const currency = new Intl.NumberFormat(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 });

export default function RecentTransactions({ transactions = [] }) {
    // Keep logic consistent with TransactionsTable: use provided `transactions` prop as-is
    const baseRecent = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    // displayed list can be locally sorted by bulk actions — does not modify props or global state
    const [displayed, setDisplayed] = useState(baseRecent);
    const [selected, setSelected] = useState(new Set());
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        setDisplayed(baseRecent);
        setSelected(new Set());
    }, [transactions]);

    const toggleSelect = (id) => {
        const s = new Set(selected);
        if (s.has(id)) s.delete(id);
        else s.add(id);
        setSelected(s);
    };

    const selectedIds = Array.from(selected);

    const bulkSortByAmountDesc = () => {
        // local sort: put selected items at top sorted by amount desc, keep others after
        const selSet = new Set(selectedIds);
        const sel = displayed.filter((d) => selSet.has(d.id)).sort((a, b) => b.amount - a.amount);
        const other = displayed.filter((d) => !selSet.has(d.id));
        setDisplayed([...sel, ...other]);
        setMenuOpen(false);
    };

    const bulkSortByDateDesc = () => {
        const selSet = new Set(selectedIds);
        const sel = displayed.filter((d) => selSet.has(d.id)).sort((a, b) => new Date(b.date) - new Date(a.date));
        const other = displayed.filter((d) => !selSet.has(d.id));
        setDisplayed([...sel, ...other]);
        setMenuOpen(false);
    };

    const bulkExport = () => {
        const sel = displayed.filter((d) => selected.has(d.id));
        console.log("Export selected:", sel);
        setMenuOpen(false);
    };

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md overflow-hidden transition hover:scale-[1.01]">
            <div className="p-6">
                <div className="flex items-start justify-between">
                    <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-4">Recent Transactions</h3>

                    <div className="relative">
                        <button onClick={() => setMenuOpen((v) => !v)} className="px-3 py-2 bg-transparent rounded text-gray-500 hover:text-gray-700">⋯</button>
                        {menuOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow z-10 py-1">
                                <button onClick={bulkSortByAmountDesc} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Sort Selected by Amount</button>
                                <button onClick={bulkSortByDateDesc} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Sort Selected by Date</button>
                                <button onClick={bulkExport} className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700">Export Selected (console)</button>
                            </div>
                        )}
                    </div>
                </div>

                {displayed.length === 0 ? (
                    <div className="py-8 text-center">
                        <p className="text-sm text-gray-500">No transactions found</p>
                        <p className="text-sm text-gray-500">Try adjusting filters or add a new transaction</p>
                    </div>
                ) : (
                    <div className="w-full">
                        {/* Header */}
                        <div className="grid grid-cols-[auto_3fr_2fr_2fr_2fr_2fr_auto] items-center px-4 py-3 bg-transparent">
                            <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400"> </div>
                            <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Activity</div>
                            <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Date</div>
                            <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Time</div>
                            <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Amount</div>
                            {/* <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400">Status</div> */}
                            <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400"> </div>
                        </div>

                        <div>
                            {displayed.map((t) => (
                                <div
                                    key={t.id}
                                    className="grid grid-cols-[auto_3fr_2fr_2fr_2fr_2fr_auto] items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
                                >
                                    <div>
                                        <input type="checkbox" checked={selected.has(t.id)} onChange={() => toggleSelect(t.id)} />
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm">
                                            {categoryEmoji(t.category)}
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-gray-800 dark:text-gray-100">{t.title}</div>
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{t.category}</div>
                                        </div>
                                    </div>

                                    <div className="text-gray-700 dark:text-gray-200">{formatDate(t.date)}</div>

                                    <div className="text-gray-700 dark:text-gray-200">{formatTime(t.date)}</div>

                                    <div className={`font-medium ${t.type === "income" ? "text-green-600" : "text-red-500"}`}>₹{currency.format(t.amount)}</div>

                                    {/* <div>
                                        {t.type === "income" ? (
                                            <span className="bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300 px-2 py-1 rounded-full text-xs">Success</span>
                                        ) : (
                                            <span className="bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-300 px-2 py-1 rounded-full text-xs">Pending</span>
                                        )}
                                    </div> */}

                                    {/* <div className="text-right">
                                        <button className="text-gray-500 hover:text-gray-700">⋯</button>
                                    </div> */}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
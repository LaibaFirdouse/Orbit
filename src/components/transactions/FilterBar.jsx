import React from "react";

export default function FilterBar({ filters, setFilters }) {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-100 flex flex-wrap gap-4 items-center transition hover:scale-[1.01]">

            {/* Search */}
            <input
                type="text"
                placeholder="Search transactions..."
                value={filters.search}
                onChange={(e) =>
                    setFilters({ ...filters, search: e.target.value })
                }
                className="border px-3 py-2 rounded text-sm w-full md:w-64"
            />

            {/* Category Filter */}
            <select
                value={filters.category}
                onChange={(e) =>
                    setFilters({ ...filters, category: e.target.value })
                }
                className="border px-3 py-2 rounded text-sm"
            >
                <option value="">All Categories</option>
                <option value="groceries">Groceries</option>
                <option value="electricity">Electricity</option>
                <option value="salary">Salary</option>
                <option value="freelance">Freelance</option>
            </select>

            {/* Type Filter */}
            <select
                value={filters.type}
                onChange={(e) =>
                    setFilters({ ...filters, type: e.target.value })
                }
                className="border px-3 py-2 rounded text-sm"
            >
                <option value="">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
            </select>

            {/* Month Filter */}
            <select
                value={filters.month}
                onChange={(e) =>
                    setFilters({ ...filters, month: e.target.value })
                }
                className="border px-3 py-2 rounded text-sm"
            >
                <option value="">All Months</option>
                {months.map((m, idx) => (
                    <option key={m} value={String(idx)}>
                        {m}
                    </option>
                ))}
            </select>

        </div>
    );
}
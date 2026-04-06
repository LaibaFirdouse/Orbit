import React, { useState } from "react";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
    ReferenceLine,
} from "recharts";

export default function BalanceChart({ transactions }) {
    // keep same data logic (income positive, expense negative)
    const data = transactions.map((t) => ({
        date: t.date,
        amount: t.type === "income" ? t.amount : -t.amount,
    }));

    const [activeX, setActiveX] = useState(null);

    const handleMouseMove = (state) => {
        if (state && state.activeLabel) setActiveX(state.activeLabel);
    };
    const handleMouseLeave = () => setActiveX(null);

    const currency = (v) => `₹${v}`;

    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload || !payload.length) return null;
        const val = payload[0].value;
        return (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-3 py-2 text-sm">
                <div className="text-xs text-gray-500">Value</div>
                <div className="font-medium text-gray-800 dark:text-gray-100">{currency(val)}</div>
                <div className="text-xs text-gray-500 mt-1">{label}</div>
            </div>
        );
    };

    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 hover:scale-[1.02] transition-transform duration-150">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Balance Trend</h3>
                <select className="px-2 py-1 text-xs rounded bg-gray-100 dark:bg-gray-800 dark:text-gray-200">
                    <option>Monthly</option>
                    <option>Weekly</option>
                </select>
            </div>

            <div style={{ height: 260 }}>
                <ResponsiveContainer>
                    <AreaChart data={data} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
                        <defs>
                            <linearGradient id="balanceGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.9} />
                                <stop offset="100%" stopColor="#7c3aed" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>

                        <CartesianGrid stroke="rgba(226,232,240,0.6)" vertical={false} />
                        <XAxis dataKey="date" tick={{ fontSize: 12 }} axisLine={false} />
                        <YAxis tickFormatter={(v) => `${v}`} tick={{ fontSize: 12 }} axisLine={false} />

                        {activeX && <ReferenceLine x={activeX} stroke="#94a3b8" strokeDasharray="4 4" />}

                        <Tooltip content={<CustomTooltip />} />

                        <Area
                            type="monotone"
                            dataKey="amount"
                            stroke="#7c3aed"
                            strokeWidth={3}
                            fill="url(#balanceGradient)"
                            dot={{ r: 4, stroke: '#fff', strokeWidth: 2 }}
                            activeDot={{ r: 6 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}
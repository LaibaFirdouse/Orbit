// import React, { useMemo, useState } from "react";


// const numberFormatter = new Intl.NumberFormat(undefined, {
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2,
// });

// function dayStart(d) {
//     const x = new Date(d);
//     x.setHours(0, 0, 0, 0);
//     return x;
// }

// function parseDate(d) {
//     return new Date(d);
// }

// function pctChange(curr, prev) {
//     if (prev === 0) return curr === 0 ? 0 : 100;
//     return ((curr - prev) / Math.abs(prev)) * 100;
// }

// const CHART_COLORS = {
//     shopping: "#6D28D9",
//     transport: "#7C3AED",
//     "rent & bills": "#A5B4FC",
//     "food & dining": "#8B5CF6",
//     entertainment: "#D1D5DB",
//     default: "#9CA3AF",
// };

// function paletteDot(category) {
//     if (!category) return CHART_COLORS.default;
//     const c = category.toLowerCase();
//     if (c.includes("shop") || c.includes("grocery") || c.includes("grocer")) return CHART_COLORS.shopping;
//     if (c.includes("transport") || c.includes("taxi") || c.includes("uber")) return CHART_COLORS.transport;
//     if (c.includes("rent") || c.includes("bill")) return CHART_COLORS["rent & bills"];
//     if (c.includes("food") || c.includes("dine") || c.includes("restaurant")) return CHART_COLORS["food & dining"];
//     if (c.includes("enter") || c.includes("movie") || c.includes("game") || c.includes("concert")) return CHART_COLORS.entertainment;
//     return CHART_COLORS.default;
// }
// import { useRef, useEffect } from "react";

// function Chart({ transactions }) {
//     const svgRef = useRef();
//     const incomeRef = useRef();
//     const expenseRef = useRef();

//     const [hover, setHover] = useState(null);

//     const data = useMemo(() => {
//         const map = {};

//         transactions.forEach((t) => {
//             const d = t.date;
//             const amt = Number(t.amount);

//             if (!map[d]) map[d] = { income: 0, expense: 0 };

//             if (t.type === "income") map[d].income += amt;
//             else map[d].expense += amt;
//         });

//         return Object.entries(map)
//             .sort(([a], [b]) => new Date(a) - new Date(b))
//             .slice(-7)
//             .map(([date, val]) => ({
//                 date,
//                 income: val.income,
//                 expense: val.expense,
//             }));
//     }, [transactions]);

//     const generatePath = (key) => {
//         if (!data.length) return "";

//         const max = Math.max(...data.map(d => Math.max(d.income, d.expense)), 1);

//         return data.map((d, i) => {
//             const x = (i / (data.length - 1)) * 300;
//             const y = 80 - (d[key] / max) * 60;
//             return `${i === 0 ? "M" : "L"}${x},${y}`;
//         }).join(" ");
//     };

//     const incomePath = generatePath("income");
//     const expensePath = generatePath("expense");

//     useEffect(() => {
//         [incomeRef, expenseRef].forEach(ref => {
//             if (ref.current) {
//                 const length = ref.current.getTotalLength();
//                 ref.current.style.strokeDasharray = length;
//                 ref.current.style.strokeDashoffset = length;
//                 ref.current.style.animation = "drawLine 1.5s ease-out forwards";
//             }
//         });
//     }, [data]);

//     return (
//         <div className="relative bg-gray-50 dark:bg-gray-800 rounded-xl p-4">

//             <svg viewBox="0 0 300 100" className="w-full h-40">

//                 {/* income */}
//                 <path
//                     ref={incomeRef}
//                     d={incomePath}
//                     fill="none"
//                     stroke="#22c55e"
//                     strokeWidth="3"
//                 />

//                 {/* expense */}
//                 <path
//                     ref={expenseRef}
//                     d={expensePath}
//                     fill="none"
//                     stroke="#ef4444"
//                     strokeWidth="3"
//                 />

//                 {/* hover dots */}
//                 {data.map((d, i) => {
//                     const max = Math.max(...data.map(x => Math.max(x.income, x.expense)), 1);
//                     const x = (i / (data.length - 1)) * 300;

//                     const yIncome = 80 - (d.income / max) * 60;
//                     const yExpense = 80 - (d.expense / max) * 60;

//                     return (
//                         <g key={i}>
//                             <circle
//                                 cx={x}
//                                 cy={yIncome}
//                                 r="4"
//                                 fill="#22c55e"
//                                 onMouseEnter={() => setHover({ x, y: yIncome, value: d.income, type: "Income" })}
//                                 onMouseLeave={() => setHover(null)}
//                             />
//                             <circle
//                                 cx={x}
//                                 cy={yExpense}
//                                 r="4"
//                                 fill="#ef4444"
//                                 onMouseEnter={() => setHover({ x, y: yExpense, value: d.expense, type: "Expense" })}
//                                 onMouseLeave={() => setHover(null)}
//                             />
//                         </g>
//                     );
//                 })}

//             </svg>

//             {/* tooltip */}
//             {hover && (
//                 <div
//                     className="absolute bg-black text-white text-xs px-2 py-1 rounded"
//                     style={{
//                         left: `${hover.x}px`,
//                         top: `${hover.y}px`,
//                         transform: "translate(-50%, -120%)"
//                     }}
//                 >
//                     {hover.type}: ₹{hover.value}
//                 </div>
//             )}

//         </div>
//     );
// }

// export default function Insights({ transactions = [] }) {
//     const [period, setPeriod] = useState("Monthly"); // Weekly or Monthly

//     const now = new Date();

//     const { currentExpensesByCategory, totalIncome, totalExpense, prevTotalExpense, topCategories } = useMemo(() => {
//         // Filter incomes/expenses according to period
//         const tx = transactions || [];

//         let currentStart, currentEnd, prevStart, prevEnd;

//         if (period === "Weekly") {
//             // last 7 days (inclusive)
//             currentEnd = dayStart(now);
//             currentEnd.setHours(23, 59, 59, 999);
//             currentStart = new Date(currentEnd);
//             currentStart.setDate(currentStart.getDate() - 6);

//             prevEnd = new Date(currentStart);
//             prevEnd.setDate(prevEnd.getDate() - 1);
//             prevEnd.setHours(23, 59, 59, 999);
//             prevStart = new Date(prevEnd);
//             prevStart.setDate(prevStart.getDate() - 6);
//             prevStart = dayStart(prevStart);
//         } else {
//             // Monthly → current month
//             currentStart = new Date(now.getFullYear(), now.getMonth(), 1);
//             currentEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);

//             const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
//             prevStart = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), 1);
//             prevEnd = new Date(prevMonth.getFullYear(), prevMonth.getMonth() + 1, 0, 23, 59, 59, 999);
//         }

//         let totalIncomeAcc = 0;
//         let totalExpenseAcc = 0;
//         let prevExpenseAcc = 0;
//         const catMap = {};

//         tx.forEach((t) => {
//             const amt = Number(t?.amount) || 0;
//             const type = t?.type;
//             const d = parseDate(t?.date);
//             if (type === "income") {
//                 totalIncomeAcc += amt;
//             }

//             if (type === "expense") {
//                 // current period
//                 if (d >= currentStart && d <= currentEnd) {
//                     totalExpenseAcc += amt;
//                     const k = t.category || "Uncategorized";
//                     catMap[k] = (catMap[k] || 0) + amt;
//                 }

//                 // prev period
//                 if (d >= prevStart && d <= prevEnd) {
//                     prevExpenseAcc += amt;
//                 }
//             }
//         });

//         const topCats = Object.entries(catMap).sort((a, b) => b[1] - a[1]).slice(0, 3);

//         return {
//             currentExpensesByCategory: catMap,
//             totalIncome: totalIncomeAcc,
//             totalExpense: totalExpenseAcc,
//             prevTotalExpense: prevExpenseAcc,
//             topCategories: topCats,
//         };
//     }, [transactions, period, now]);

//     const hasData = Object.keys(currentExpensesByCategory || {}).length > 0;

//     if (!hasData) {
//         return (
//             <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm p-6 space-y-6">
//                 <div className="flex justify-between items-center">
//                     <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Insights</h3>
//                     <select value={period} onChange={(e) => setPeriod(e.target.value)} className="px-3 py-1 text-xs rounded bg-gray-100 dark:bg-gray-800">
//                         <option>Weekly</option>
//                         <option>Monthly</option>
//                     </select>
//                 </div>

//                 <div className="text-sm text-gray-500">No insights available</div>
//             </div>
//         );
//     }

//     // Top categories already sorted
//     const maxVal = Math.max(...topCategories.map(([_, val]) => val), 1);

//     const comparisonPct = pctChange(totalExpense, prevTotalExpense);

//     const trendData = useMemo(() => {
//         const map = {};

//         transactions.forEach((t) => {
//             const date = t.date;
//             const amt = Number(t.amount);

//             if (!map[date]) {
//                 map[date] = { income: 0, expense: 0 };
//             }

//             if (t.type === "income") {
//                 map[date].income += amt;
//             } else {
//                 map[date].expense += amt;
//             }
//         });

//         const sorted = Object.entries(map)
//             .sort(([a], [b]) => new Date(a) - new Date(b))
//             .slice(-7); // last 7 days

//         return sorted.map(([date, val]) => ({
//             date,
//             value: val.income - val.expense, // net
//         }));
//     }, [transactions]);
//     const generatePath = (data) => {
//         if (!data.length) return "";

//         const max = Math.max(...data.map(d => d.value), 1);
//         const min = Math.min(...data.map(d => d.value), 0);

//         const range = max - min || 1;

//         return data
//             .map((d, i) => {
//                 const x = (i / (data.length - 1)) * 300;
//                 const y = 80 - ((d.value - min) / range) * 60;
//                 return `${i === 0 ? "M" : "L"}${x},${y}`;
//             })
//             .join(" ");
//     };
//     const pathData = generatePath(trendData);

//     return (
//         <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-md p-6 space-y-6">

//             {/* Header */}
//             <div className="flex justify-between items-center">
//                 <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//                     Insights
//                 </h3>

//                 <select
//                     value={period}
//                     onChange={(e) => setPeriod(e.target.value)}
//                     className="px-3 py-1 text-xs rounded-md bg-gray-100 dark:text-black-300"

//                 >
//                     <option>Weekly</option>
//                     <option>Monthly</option>
//                 </select>
//             </div>

//             {/* 🔥 SUMMARY CARDS */}
//             <div className="grid grid-cols-2 gap-4">

//                 <div className="rounded-xl p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:scale-[1.02] transition">
//                     <p className="text-xs text-gray-500">Total Income</p>
//                     <h2 className="text-2xl font-bold text-green-500">
//                         ₹{numberFormatter.format(totalIncome)}
//                     </h2>
//                 </div>

//                 <div className="rounded-xl p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:scale-[1.02] transition">
//                     <p className="text-xs text-gray-500">Total Expenses</p>
//                     <div className="flex items-center justify-between">
//                         <h2 className="text-2xl font-bold text-red-500">
//                             ₹{numberFormatter.format(totalExpense)}
//                         </h2>

//                         <span className={`text-sm font-medium ${comparisonPct >= 0 ? "text-green-500" : "text-red-500"}`}>
//                             {comparisonPct >= 0 ? "↑" : "↓"} {Math.abs(Math.round(comparisonPct))}%
//                         </span>
//                     </div>
//                 </div>

//             </div>
//             <div className="mt-6">

//                 <Chart transactions={transactions} />

//             </div>



//             {/* 🔥 TOP CATEGORIES (CLEAN) */}
//             <div className="space-y-3">

//                 <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200">
//                     Top Spending
//                 </h4>

//                 {topCategories.map(([cat, amt]) => (
//                     <div key={cat} className="flex justify-between items-center text-sm">

//                         <div className="flex items-center gap-2">
//                             <span
//                                 className="w-2 h-2 rounded-full"
//                                 style={{ background: paletteDot(cat) }}
//                             />
//                             <span className="capitalize text-gray-700 dark:text-gray-200">
//                                 {cat}
//                             </span>
//                         </div>

//                         <span className="font-semibold text-gray-800 dark:text-gray-100">
//                             ₹{numberFormatter.format(amt)}
//                         </span>
//                     </div>
//                 ))}

//             </div>

//         </div>
//     );
// }
import React, { useMemo, useState, useRef, useEffect } from "react";

const numberFormatter = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
});

function dayStart(d) {
    const x = new Date(d);
    x.setHours(0, 0, 0, 0);
    return x;
}

function parseDate(d) {
    return new Date(d);
}

function pctChange(curr, prev) {
    if (prev === 0) return curr === 0 ? 0 : 100;
    return ((curr - prev) / Math.abs(prev)) * 100;
}

const CHART_COLORS = {
    shopping: "#6D28D9",
    transport: "#7C3AED",
    "rent & bills": "#A5B4FC",
    "food & dining": "#8B5CF6",
    entertainment: "#D1D5DB",
    default: "#9CA3AF",
};

function paletteDot(category) {
    if (!category) return CHART_COLORS.default;
    const c = category.toLowerCase();
    if (c.includes("shop") || c.includes("grocery")) return CHART_COLORS.shopping;
    if (c.includes("transport")) return CHART_COLORS.transport;
    if (c.includes("rent") || c.includes("bill")) return CHART_COLORS["rent & bills"];
    if (c.includes("food") || c.includes("dine")) return CHART_COLORS["food & dining"];
    return CHART_COLORS.default;
}

/* 🔥 CHART COMPONENT (UPDATED) */
function Chart({ transactions }) {
    const incomeRef = useRef();
    const expenseRef = useRef();
    const [hover, setHover] = useState(null);

    const data = useMemo(() => {
        const map = {};

        transactions.forEach((t) => {
            const d = t.date;
            const amt = Number(t.amount);

            if (!map[d]) map[d] = { income: 0, expense: 0 };

            if (t.type === "income") map[d].income += amt;
            else map[d].expense += amt;
        });

        return Object.entries(map)
            .sort(([a], [b]) => new Date(a) - new Date(b))
            .slice(-7)
            .map(([date, val]) => ({
                date,
                income: val.income,
                expense: val.expense,
            }));
    }, [transactions]);

    const max = Math.max(...data.map(d => Math.max(d.income, d.expense)), 1);

    const generatePath = (key) =>
        data.map((d, i) => {
            const x = (i / (data.length - 1)) * 300;
            const y = 80 - (d[key] / max) * 60;
            return `${i === 0 ? "M" : "L"}${x},${y}`;
        }).join(" ");

    const incomePath = generatePath("income");
    const expensePath = generatePath("expense");

    const areaPath = (path) => path + " L300,100 L0,100 Z";

    useEffect(() => {
        [incomeRef, expenseRef].forEach(ref => {
            if (ref.current) {
                const len = ref.current.getTotalLength();
                ref.current.style.strokeDasharray = len;
                ref.current.style.strokeDashoffset = len;
                ref.current.style.animation = "drawLine 1.5s ease-out forwards";
            }
        });
    }, [data]);

    return (
        <div className="relative bg-gray-50 dark:bg-gray-800 rounded-xl p-4">

            <svg viewBox="0 0 300 100" className="w-full h-44">

                <defs>
                    <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#22c55e" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
                    </linearGradient>

                    <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                    </linearGradient>
                </defs>

                {/* Area */}
                <path d={areaPath(incomePath)} fill="url(#incomeGrad)" />
                <path d={areaPath(expensePath)} fill="url(#expenseGrad)" />

                {/* Lines */}
                <path
                    ref={incomeRef}
                    d={incomePath}
                    stroke="#22c55e"
                    strokeWidth="3"
                    fill="none"
                    style={{ filter: "drop-shadow(0 0 6px rgba(34,197,94,0.5))" }}
                />

                <path
                    ref={expenseRef}
                    d={expensePath}
                    stroke="#ef4444"
                    strokeWidth="3"
                    fill="none"
                    style={{ filter: "drop-shadow(0 0 6px rgba(239,68,68,0.5))" }}
                />

                {/* Dots */}
                {data.map((d, i) => {
                    const x = (i / (data.length - 1)) * 300;
                    const y1 = 80 - (d.income / max) * 60;
                    const y2 = 80 - (d.expense / max) * 60;

                    return (
                        <g key={i}>
                            <circle cx={x} cy={y1} r="4" fill="#22c55e"
                                onMouseEnter={() => setHover({ x, y: y1, val: d.income, type: "Income" })}
                                onMouseLeave={() => setHover(null)}
                            />
                            <circle cx={x} cy={y2} r="4" fill="#ef4444"
                                onMouseEnter={() => setHover({ x, y: y2, val: d.expense, type: "Expense" })}
                                onMouseLeave={() => setHover(null)}
                            />
                        </g>
                    );
                })}

            </svg>

            {/* Tooltip */}
            {hover && (
                <div
                    className="absolute bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 text-xs px-3 py-1.5 rounded-md shadow-lg"
                    style={{
                        left: hover.x,
                        top: hover.y,
                        transform: "translate(-50%, -130%)"
                    }}
                >
                    <b>{hover.type}</b><br />
                    ₹{hover.val}
                </div>
            )}

            {/* Legend */}
            <div className="flex gap-4 mt-3 text-xs text-gray-500">
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-green-500 rounded-full"></span> Income
                </div>
                <div className="flex items-center gap-1">
                    <span className="w-2 h-2 bg-red-500 rounded-full"></span> Expense
                </div>
            </div>

        </div>
    );
}

export default function Insights({ transactions = [] }) {
    const [period, setPeriod] = useState("Monthly");

    const now = new Date();

    const { totalIncome, totalExpense, prevTotalExpense, topCategories } = useMemo(() => {
        const tx = transactions || [];

        let totalIncomeAcc = 0;
        let totalExpenseAcc = 0;
        let prevExpenseAcc = 0;
        const catMap = {};

        tx.forEach((t) => {
            const amt = Number(t.amount) || 0;
            const d = parseDate(t.date);

            if (t.type === "income") totalIncomeAcc += amt;

            if (t.type === "expense") {
                totalExpenseAcc += amt;
                catMap[t.category] = (catMap[t.category] || 0) + amt;
            }
        });

        const topCats = Object.entries(catMap).sort((a, b) => b[1] - a[1]).slice(0, 3);

        return {
            totalIncome: totalIncomeAcc,
            totalExpense: totalExpenseAcc,
            prevTotalExpense: prevExpenseAcc,
            topCategories: topCats,
        };
    }, [transactions]);

    const comparisonPct = pctChange(totalExpense, prevTotalExpense);

    return (
        <div className="bg-white dark:bg-gray-900 rounded-2xl border shadow-md p-6 space-y-6">

            {/* Header */}
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Insights</h3>
                <select value={period} onChange={(e) => setPeriod(e.target.value)} className="px-3 py-1 text-xs rounded-md bg-gray-100 dark:text-black-300">
                    <option>Weekly</option>
                    <option>Monthly</option>
                </select>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <p className="text-xs">Income</p>
                    <h2 className="text-2xl text-green-500">₹{numberFormatter.format(totalIncome)}</h2>
                </div>

                <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <p className="text-xs">Expenses</p>
                    <h2 className="text-2xl text-red-500">₹{numberFormatter.format(totalExpense)}</h2>
                </div>
            </div>

            {/* Chart */}
            <Chart transactions={transactions} />

            {/* Top Spending */}
            <div>
                {topCategories.map(([cat, amt]) => (
                    <div key={cat} className="flex justify-between text-sm">
                        <span>{cat}</span>
                        <span>₹{amt}</span>
                    </div>
                ))}
            </div>

        </div>
    );
}
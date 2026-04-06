import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

function CustomTooltip({ active, payload }) {
    if (!active || !payload || !payload.length) return null;
    const item = payload[0].payload;
    return (
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-3 py-2 text-sm">
            <div className="font-medium text-gray-800 dark:text-gray-100">{item.name}</div>
            <div className="text-gray-600 dark:text-gray-300">₹{item.value}</div>
        </div>
    );
}

export default function CategoryChart({ transactions }) {
    // ✅ Only expense transactions
    const categoryMap = {};

    transactions.forEach((t) => {
        if (t.type === "expense") {
            categoryMap[t.category] = (categoryMap[t.category] || 0) + Number(t.amount);
        }
    });

    const data = Object.keys(categoryMap).map((key) => ({
        name: key,
        value: categoryMap[key],
    }));

    // 🎨 COLOR PALETTE (same family shades)
    const PALETTE = {
        shopping: ["#1E1B4B", "#2B235F"],
        transport: ["#6D28D9", "#7C3AED"],
        "rent & bills": ["#A5B4FC", "#C7D2FE"],
        "food & dining": ["#6366F1", "#8B5CF6"],
        entertainment: ["#D1D5DB", "#E5E7EB"],
        default: ["#9CA3AF", "#B3B8BD"],
    };

    // 🧠 Map category → group
    const groupFor = (cat) => {
        if (!cat) return "default";
        const c = cat.toLowerCase();

        if (c.includes("shop") || c.includes("grocery") || c.includes("grocer")) return "shopping";
        if (c.includes("transport") || c.includes("uber") || c.includes("bus")) return "transport";
        if (c.includes("rent") || c.includes("bill")) return "rent & bills";
        if (c.includes("food") || c.includes("dine") || c.includes("restaurant")) return "food & dining";
        if (c.includes("movie") || c.includes("game") || c.includes("entertainment")) return "entertainment";

        return "default";
    };

    // 🎯 Assign colors properly
    const groupIndex = {};
    const dataWithColor = data.map((d) => {
        const group = groupFor(d.name);
        groupIndex[group] = (groupIndex[group] || 0) + 1;

        const palette = PALETTE[group] || PALETTE.default;
        const color = palette[(groupIndex[group] - 1) % palette.length];

        return { ...d, color };
    });

    return (
        <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 transition hover:scale-[1.01]">
            <h3 className="text-sm font-semibold mb-3 text-gray-700 dark:text-gray-300">
                Spending by Category
            </h3>

            {data.length === 0 ? (
                <div className="flex items-center justify-center h-56">
                    <p className="text-sm text-gray-500">No expense data</p>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <div className="w-full max-w-[360px]" style={{ height: 220 }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie
                                    data={dataWithColor}
                                    dataKey="value"
                                    innerRadius={60}
                                    outerRadius={100}
                                    paddingAngle={4}
                                    cornerRadius={10}
                                    stroke="none"
                                >
                                    {dataWithColor.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.color}   // ✅ FIXED
                                            stroke="none"
                                        />
                                    ))}
                                </Pie>

                                <Tooltip content={<CustomTooltip />} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* ✅ Legend */}
                    <div className="flex flex-wrap gap-3 mt-4 justify-center">
                        {dataWithColor.map((d) => (
                            <div
                                key={d.name}
                                className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400"
                            >
                                <span
                                    className="w-3 h-3 rounded-full"
                                    style={{ background: d.color }} // ✅ FIXED
                                />
                                {d.name}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
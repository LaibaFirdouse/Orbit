import React from 'react';

export default function SummaryCard({ title, value, color = 'dark:text-gray-100' }) {
    const isTotal = title === 'Total Balance';

    const containerClasses = isTotal
        ? 'p-6 rounded-2xl shadow-md border border-transparent bg-gradient-to-r from-indigo-500 to-purple-500 text-white transform hover:scale-[1.02] transition-transform duration-150'
        : 'bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 hover:scale-[1.02] transition-transform duration-150';

    const titleClasses = 'text-sm text-gray-500 dark:text-gray-400';
    const valueClasses = `text-2xl font-semibold ${isTotal ? 'text-white' : color}`;

    return (
        <div className={`${containerClasses} flex flex-col gap-2`}>
            <p className={titleClasses}>{title}</p>

            <h3 className={valueClasses}>{value}</h3>
        </div>
    );
}
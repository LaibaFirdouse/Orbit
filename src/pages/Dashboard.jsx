import React from 'react';
import SummaryCard from '../components/dashboard/SummaryCard';
// import transactions from "../data/transactions";
import { getTotalIncome, getTotalExpenses, getBalance } from "../utils/calculations";
import BalanceChart from "../components/dashboard/BalanceChart";
import CategoryChart from "../components/dashboard/CategoryChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import Insights from "../components/dashboard/Insights";

export default function Dashboard({ transactions }) {
    const income = getTotalIncome(transactions);
    const expenses = getTotalExpenses(transactions);
    const balance = getBalance(transactions);
    return (
        <div className="bg-gray-50 dark:bg-[#0f172a] min-h-screen p-6 space-y-6">

            {/* Overview Section */}
            <section className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    Welcome back, User!
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                    Track your income, expenses, and overall balance.
                </p>
            </section>

            {/* Summary Cards */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <SummaryCard title="Total Balance" value={`₹${balance}`} />
                </div>

                <div>
                    <SummaryCard title="Total Income" value={`₹${income}`} color="text-green-600" />
                </div>

                <div>
                    <SummaryCard title="Total Expenses" value={`₹${expenses}`} color="text-red-500" />
                </div>
            </section>

            {/* Charts */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                    <BalanceChart transactions={transactions} />
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                    <CategoryChart transactions={transactions} />
                </div>
            </section>

            {/* Lower Sections */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                    <RecentTransactions transactions={transactions} />
                </div>
                <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border dark:border-gray-700">
                    <Insights transactions={transactions} />
                </div>
            </section>

        </div>
    );
}
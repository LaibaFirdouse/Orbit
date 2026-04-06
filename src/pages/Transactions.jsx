import React, { useState } from "react";
import TransactionsTable from "../components/transactions/TransactionsTable";
import FilterBar from "../components/transactions/FilterBar";
import { applyFilters } from "../utils/filters";

// modal is provided globally from App

export default function Transactions({
    transactions,
    setTransactions,
    role,
    isModalOpen,
    setIsModalOpen,
    editingTx,
    setEditingTx,
}) {
    const [filters, setFilters] = useState({
        search: "",
        category: "",
        type: "",
        month: "",
    });

    const filteredTransactions = applyFilters(transactions, filters);

    // 🔥 DELETE
    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Delete this transaction?");
        if (!confirmDelete) return;

        setTransactions((prev) => prev.filter((tx) => tx.id !== id));
    };

    // 🔥 EDIT
    const handleEdit = (tx) => {
        // set editing transaction (lifted to App) and open global modal
        setEditingTx(tx);
        setIsModalOpen(true);
    };

    // 🔥 ADD NEW
    const handleAdd = () => {
        setEditingTx(null);
        setIsModalOpen(true);
    };

    // 🔥 SAVE (ADD + EDIT)
    const handleSubmit = (data) => {
        if (editingTx) {
            // EDIT
            setTransactions((prev) =>
                prev.map((tx) =>
                    tx.id === editingTx.id ? { ...data, id: tx.id } : tx
                )
            );
        } else {
            // ADD
            setTransactions((prev) => [
                ...prev,
                { ...data, id: Date.now() },
            ]);
        }

        setIsModalOpen(false);
        setEditingTx(null);
    };

    // EMPTY STATE: if filters produce no results, show a friendly empty state
    if (filteredTransactions.length === 0) {
        return (
            <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-950 min-h-screen">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Transactions</h2>
                    {role === "admin" && (
                        <button
                            onClick={handleAdd}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-2xl text-sm transition hover:scale-[1.01]"
                        >
                            Add Transaction
                        </button>
                    )}
                </div>

                <FilterBar filters={filters} setFilters={setFilters} />

                <div className="text-center py-20">
                    <p className="text-gray-400">No transactions found</p>
                    {role === "admin" && (
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="mt-4 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-2xl"
                        >
                            Add Transaction
                        </button>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 space-y-6 bg-gray-50 dark:bg-gray-950 min-h-screen">

            {/* HEADER */}
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Transactions</h2>

                {role === "admin" && (
                    <button
                        onClick={handleAdd}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-2xl text-sm transition hover:scale-[1.01]"
                    >
                        Add Transaction
                    </button>
                )}
            </div>

            {/* FILTER BAR */}
            <FilterBar filters={filters} setFilters={setFilters} />

            <TransactionsTable
                transactions={filteredTransactions}
                onEdit={handleEdit}
                onDelete={handleDelete}
                role={role}
            />

            {/* NO FILTER RESULTS */}
            {transactions.length > 0 && filteredTransactions.length === 0 && (
                <div className="text-center text-gray-400 text-sm">
                    No results found for applied filters
                </div>
            )}

        </div>
    );
}
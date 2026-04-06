export const getTotalIncome = (transactions) => {
    return transactions
        .filter(t => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
};

export const getTotalExpenses = (transactions) => {
    return transactions
        .filter(t => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
};

export const getBalance = (transactions) => {
    const income = getTotalIncome(transactions);
    const expenses = getTotalExpenses(transactions);
    return income - expenses;
};
export const applyFilters = (transactions, filters) => {
    return transactions.filter((t) => {
        const matchesSearch = t.title
            .toLowerCase()
            .includes(filters.search.toLowerCase());

        const matchesCategory = filters.category
            ? t.category === filters.category
            : true;

        const matchesType = filters.type
            ? t.type === filters.type
            : true;

        const matchesMonth = (function () {
            if (!filters.month && filters.month !== 0) return true;
            // filters.month stored as string index '0'..'11'
            const txDate = new Date(t.date);
            if (isNaN(txDate)) return true;
            return txDate.getMonth() === Number(filters.month);
        })();

        return matchesSearch && matchesCategory && matchesType && matchesMonth;
    });
};
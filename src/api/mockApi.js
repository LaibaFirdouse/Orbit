export const fetchTransactions = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const data = JSON.parse(localStorage.getItem("transactions")) || [];
            resolve(data);
        }, 500);
    });
};
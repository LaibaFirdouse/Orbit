// import { useState, useEffect } from "react";
// import AppLayout from "./components/layout/AppLayout";
// import Dashboard from "./pages/Dashboard";
// import Transactions from "./pages/Transactions";
// import { fetchTransactions } from "./api/mockApi";
// import AddTransactionModal from "./components/forms/AddTransactionModal";
// import initialTransactions from "./data/transactions";

// function App() {
//   const [activePage, setActivePage] = useState("dashboard");
//   const [role, setRole] = useState("admin");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [editingTx, setEditingTx] = useState(null);
//   const [transactions, setTransactions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);


//   // 🌙 Dark Mode
//   const [darkMode, setDarkMode] = useState(false);

//   useEffect(() => {
//     if (darkMode) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [darkMode]);

//   // 📦 API State

//   // 🚀 Fetch from API
//   useEffect(() => {
//     fetchTransactions()
//       .then((data) => {
//         setTransactions(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err);
//         setLoading(false);
//       });
//   }, []);

//   // 💾 Persist to localStorage
//   useEffect(() => {
//     if (transactions.length > 0) {
//       localStorage.setItem("transactions", JSON.stringify(transactions));
//     }
//   }, [transactions]);

//   // ⏳ Loading UI
//   if (loading) {
//     return (
//       <div className="h-screen flex items-center justify-center text-gray-500 dark:text-gray-300">
//         Loading data...
//       </div>
//     );
//   }

//   // ❌ Error UI
//   if (error) {
//     return (
//       <div className="h-screen flex items-center justify-center text-red-500">
//         {error}
//       </div>
//     );
//   }

//   // Global modal state for Add Transaction


//   const handleGlobalSubmit = (data) => {
//     // Add or update logic: if id exists, replace, else add
//     setTransactions((prev) => {
//       const exists = prev.some((t) => t.id === data.id);
//       if (exists) return prev.map((t) => (t.id === data.id ? data : t));
//       return [...prev, { ...data, id: data.id || Date.now() }];
//     });
//     setEditingTx(null);
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
//       <AppLayout
//         activePage={activePage}
//         setActivePage={setActivePage}
//         role={role}
//         setRole={setRole}
//         darkMode={darkMode}
//         setDarkMode={setDarkMode}
//         setTransactions={setTransactions}
//         onAddClick={() => setIsModalOpen(true)}
//         isModalOpen={isModalOpen}
//         setIsModalOpen={setIsModalOpen}
//       >
//         {activePage === "dashboard" && (
//           <Dashboard transactions={transactions} />
//         )}

//         {activePage === "transactions" && (
//           <Transactions
//             transactions={transactions}
//             setTransactions={setTransactions}
//             role={role}
//             isModalOpen={isModalOpen}
//             setIsModalOpen={setIsModalOpen}
//             editingTx={editingTx}
//             setEditingTx={setEditingTx}
//           />
//         )}
//       </AppLayout>

//       {/* Global modal rendered at top-level so all entry points use same form */}
//       {isModalOpen && (
//         <AddTransactionModal
//           isOpen={isModalOpen}
//           onClose={() => {
//             setIsModalOpen(false);
//             setEditingTx(null);
//           }}
//           onSubmit={(d) => {
//             handleGlobalSubmit(d);
//             setIsModalOpen(false);
//           }}
//           initialData={editingTx}
//         />
//       )}
//     </div>
//   );
// }

// export default App;
import { useState, useEffect } from "react";
import AppLayout from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import { fetchTransactions } from "./api/mockApi";
import AddTransactionModal from "./components/forms/AddTransactionModal";
import initialTransactions from "./data/transactions"; // ✅ fallback data

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [role, setRole] = useState("admin");

  // 🌙 Dark Mode
  const [darkMode, setDarkMode] = useState(false);

  // 📦 Global modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);

  // 📊 Data
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 🌙 Dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  // 🚀 DATA SOURCE LOGIC (FIXED PROPERLY)
  useEffect(() => {
    const saved = localStorage.getItem("transactions");

    // ✅ 1. Use localStorage first
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) {
          setTransactions(parsed);
          setLoading(false);
          return;
        }
      } catch (e) {
        console.error("Invalid localStorage data");
      }
    }

    // ✅ 2. Fetch from API
    fetchTransactions()
      .then((data) => {
        if (data && data.length > 0) {
          setTransactions(data);
        } else {
          // ✅ 3. fallback demo data
          setTransactions(initialTransactions);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load data");
        setTransactions(initialTransactions); // still show UI
        setLoading(false);
      });
  }, []);

  // 💾 ALWAYS persist
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // ➕ ADD / ✏️ EDIT
  const handleGlobalSubmit = (data) => {
    setTransactions((prev) => {
      const exists = prev.some((t) => t.id === data.id);

      if (exists) {
        return prev.map((t) => (t.id === data.id ? data : t));
      }

      return [...prev, { ...data, id: Date.now() }];
    });

    setEditingTx(null);
  };

  // ⏳ Loading UI
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-gray-500 dark:text-gray-300">
        Loading data...
      </div>
    );
  }

  // ❌ Error UI (but still usable)
  if (error) {
    console.warn(error);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <AppLayout
        activePage={activePage}
        setActivePage={setActivePage}
        role={role}
        setRole={setRole}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onAddClick={() => setIsModalOpen(true)} // ✅ global add
      >
        {activePage === "dashboard" && (
          <Dashboard transactions={transactions} />
        )}

        {activePage === "transactions" && (
          <Transactions
            transactions={transactions}
            setTransactions={setTransactions}
            role={role}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            editingTx={editingTx}
            setEditingTx={setEditingTx}
          />
        )}
      </AppLayout>

      {/* ✅ SINGLE GLOBAL MODAL */}
      {isModalOpen && (
        <AddTransactionModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingTx(null);
          }}
          onSubmit={(data) => {
            handleGlobalSubmit(data);
            setIsModalOpen(false);
          }}
          initialData={editingTx}
        />
      )}
    </div>
  );
}

export default App;

// import React from 'react';
// import { useState, useEffect } from "react";

// export default function Topbar({ role, setRole, onAddClick, darkMode, setDarkMode }) {
//     const [time, setTime] = useState(new Date());

//     useEffect(() => {
//         const interval = setInterval(() => {
//             setTime(new Date());
//         }, 1000);

//         return () => clearInterval(interval);
//     }, []);
//     return (
//         <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 flex items-center px-6 justify-between">

//             {/* Left: Title */}
//             <h1 className="text-lg font-semibold dark:text-gray-100">
//                 Finance Dashboard
//             </h1>

//             {/* Right: Actions */}
//             <div className="flex items-center gap-4">

//                 {/* Role Switch */}
//                 <select
//                     value={role}
//                     onChange={(e) => setRole(e.target.value)}
//                     className="border rounded px-2 py-1 text-sm"
//                 >
//                     <option value="admin">Admin</option>
//                     <option value="viewer">Viewer</option>
//                 </select>


//                 {role === "admin" && (<button
//                     onClick={onAddClick}
//                     className="text-sm px-3 py-1 bg-blue-600 text-white rounded"
//                 >
//                     Add Transaction
//                 </button>)}
//                 <button onClick={() => setDarkMode(prev => !prev)}>
//                     🌙
//                 </button>
//                 {time.toLocaleDateString()} | {time.toLocaleTimeString()}

//             </div>
//         </header>
//     );
// }
import React, { useState, useEffect } from "react";

export default function Topbar({ role, setRole, onAddClick, darkMode, setDarkMode }) {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const formattedTime = time.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">

            <h1 className="text-3xl font-extrabold text-gray-800 dark:text-gray-100">
                Orbit
            </h1>


            <div className="flex items-center gap-4">

                <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="border border-gray-200 dark:border-gray-700 rounded-md px-3 py-1 text-sm bg-white dark:bg-gray-800 text-gray-700 dark:text-white transition"
                >
                    <option value="admin">Admin</option>
                    <option value="viewer">Viewer</option>
                </select>

                {role === "admin" && (
                    <button
                        onClick={onAddClick}
                        className="text-sm px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition"
                    >
                        Add Transaction
                    </button>
                )}

                <button
                    onClick={() => setDarkMode(prev => !prev)}
                    className="bg-gray-200 dark:bg-gray-700 rounded px-2 py-1 transition"
                    aria-label="Toggle dark mode"
                >
                    {darkMode ? "☀️" : "🌙"}
                </button>

                <span className="text-xs text-gray-500 dark:text-gray-400">
                    {formattedTime}
                </span>

            </div>
        </header>
    );
}
// import React from 'react';

// export default function Sidebar() {
//     return (
//         <aside className="w-64 bg-gray-800 dark:bg-black text-gray-100 flex-shrink-0">
//             <div className="h-full flex flex-col p-4">
//                 <div className="mb-6 text-lg font-semibold">Finance</div>
//                 <nav className="flex-1">
//                     <ul className="space-y-2 text-sm">
//                         <li>
//                             <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">Dashboard</a>
//                         </li>
//                         <li>
//                             <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">Transactions</a>
//                         </li>
//                         <li>
//                             <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">Categories</a>
//                         </li>
//                         <li>
//                             <a href="#" className="block px-3 py-2 rounded hover:bg-gray-700">Reports</a>
//                         </li>
//                     </ul>
//                 </nav>
//                 <div className="mt-4 text-xs text-gray-400">v1.0</div>
//             </div>
//         </aside>
//     );
// }
import React from 'react';
import { LayoutDashboard, List, BarChart } from 'lucide-react';

export default function Sidebar({ activePage, setActivePage }) {
    const mainItems = [
        { id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboard },
        { id: 'transactions', label: 'Transactions', Icon: List },
    ];

    const analyticsItems = [
        { id: 'insights', label: 'Insights', Icon: BarChart },
    ];

    const ItemButton = ({ item }) => {
        const active = activePage === item.id;
        return (
            <li>
                <button
                    onClick={() => setActivePage(item.id)}
                    className={`w-full text-left px-3 py-2 rounded-md transition-all flex items-center gap-2 text-sm font-medium ${active ? 'bg-gray-700' : 'hover:bg-gray-700'
                        }`}
                    aria-current={active ? 'page' : undefined}
                >
                    <item.Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                </button>
            </li>
        );
    };

    return (
        <aside className="w-64 bg-gray-800 dark:bg-black text-gray-100 flex-shrink-0">
            <div className="h-full flex flex-col p-4 space-y-4">

                {/* Logo / Title */}
                <div className="mb-2 flex items-center gap-2">
                    <LayoutDashboard className="w-6 h-6 text-indigo-400" />
                    <div className="text-lg font-semibold">Finance</div>
                </div>

                {/* Navigation - Main */}
                <nav className="flex-1">
                    <div className="space-y-2">
                        <div className="text-xs text-gray-400 uppercase px-3">Main</div>
                        <ul className="space-y-2 mt-1">
                            {mainItems.map((item) => (
                                <ItemButton key={item.id} item={item} />
                            ))}
                        </ul>

                        <div className="mt-4 text-xs text-gray-400 uppercase px-3">Analytics</div>
                        <ul className="space-y-2 mt-1">
                            {analyticsItems.map((item) => (
                                <ItemButton key={item.id} item={item} />
                            ))}
                        </ul>
                    </div>
                </nav>

                {/* Footer */}
                <div className="mt-4 text-xs text-gray-400">v1.0</div>

            </div>
        </aside>
    );
}
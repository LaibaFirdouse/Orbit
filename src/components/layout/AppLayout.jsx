// import React from 'react';
// import Sidebar from './Sidebar';
// import Topbar from './Topbar';

// export default function AppLayout({ children, title }) {
// 	return (
// 		<div className="min-h-screen h-screen flex bg-gray-50">
// 			<Sidebar />

// 			<div className="flex-1 flex flex-col">
// 				<Topbar title={title} />

// 				<main className="flex-1 overflow-auto p-6">
// 					{children}
// 				</main>
// 			</div>
// 		</div>
// 	);
// }
import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

export default function AppLayout({ children, activePage, setActivePage, role, setRole, setTransactions, darkMode, setDarkMode, onAddClick }) {
    return (
        <div className="min-h-screen flex bg-gray-50 dark:bg-gray-950">
            {/* Sidebar */}
            <Sidebar
                activePage={activePage}
                setActivePage={setActivePage}
            />

            {/* Main Section */}
            <div className="flex-1 flex flex-col">

                {/* Topbar */}
                <Topbar
                    role={role}
                    setRole={setRole}
                    onAddClick={onAddClick}
                    darkMode={darkMode}
                    setDarkMode={setDarkMode}
                />


                {/* Page Content */}
                <main className="flex-1 overflow-auto p-6">
                    {children}
                </main>

            </div>
        </div>
    );
}
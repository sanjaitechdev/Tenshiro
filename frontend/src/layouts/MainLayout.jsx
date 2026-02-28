import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ChatBotEnhanced from '../components/ChatBotEnhanced';

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="app-container">
            <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <div className="main-content">
                <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
                <div className="page-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default MainLayout;

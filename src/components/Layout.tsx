import Sidebar from './SidebarComponent'
import Header from './Header';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export default function Layout() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
      <div className="flex-1 flex flex-col">
        <Header isCollapsed={isCollapsed} toggleSidebar={toggleSidebar} />
        {/* Main content area */}
        <main className='flex-1 overflow-y-auto bg-gray-50'>
        <div className="max-w-full h-full">
          <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

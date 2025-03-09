
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/admin/Sidebar';

const AdminLayout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <main className={`flex-grow p-6 overflow-auto transition-all duration-300 ${isOpen ? 'md:ml-64' : ''}`}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

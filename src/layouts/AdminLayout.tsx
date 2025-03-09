
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '@/components/admin/Sidebar';

const AdminLayout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isOpen} />
      <main className="flex-grow p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;

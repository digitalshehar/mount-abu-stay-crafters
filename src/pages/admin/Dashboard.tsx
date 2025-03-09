
import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/admin/dashboard/AdminSidebar";
import MobileHeader from "@/components/admin/dashboard/MobileHeader";
import DashboardLayout from "@/components/admin/dashboard/DashboardLayout";
import { adminNavItems } from "@/components/admin/dashboard/AdminNavItems";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex overflow-hidden">
      <MobileHeader sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <AdminSidebar 
        sidebarOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
        navItems={adminNavItems} 
      />
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </div>
  );
};

export default AdminDashboard;

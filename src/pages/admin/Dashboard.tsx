
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "@/components/admin/dashboard/AdminSidebar";
import MobileHeader from "@/components/admin/dashboard/MobileHeader";
import DashboardLayout from "@/components/admin/dashboard/DashboardLayout";
import { adminNavItems } from "@/components/admin/dashboard/AdminNavItems";
import { useNotifications } from "@/hooks/useNotifications";
import { useAuth } from "@/context/AuthContext";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar on mobile when navigating
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    console.log("Dashboard component rendering");
  }, []);

  return (
    <motion.div 
      className="min-h-screen bg-stone-50 flex overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <MobileHeader sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <AdminSidebar 
        sidebarOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
        navItems={adminNavItems} 
        notifications={notifications}
        unreadCount={unreadCount}
        markAsRead={markAsRead}
        markAllAsRead={markAllAsRead}
      />
      <DashboardLayout>
        <Outlet />
      </DashboardLayout>
    </motion.div>
  );
};

export default Dashboard;

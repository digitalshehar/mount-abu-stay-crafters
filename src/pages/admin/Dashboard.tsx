
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/admin/Sidebar";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardStats from "@/components/admin/DashboardStats";
import DashboardCharts from "@/components/admin/DashboardCharts";
import RecentRecords from "@/components/admin/RecentRecords";

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { signOut } = useAuth();

  // Close sidebar when navigating on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  const toggleSidebarOpen = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of the admin dashboard",
      });
      navigate("/auth");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error logging out",
        description: "There was a problem logging you out",
        variant: "destructive"
      });
    }
  };

  // Determine if we're on the main dashboard route or a sub-route
  const isMainDashboard = location.pathname === "/admin/dashboard";

  return (
    <div className="min-h-screen bg-stone-50 flex overflow-hidden">
      {/* Sidebar for mobile - shown conditionally */}
      <div className="md:hidden">
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/20 z-30"
            onClick={toggleSidebarOpen}
          ></div>
        )}
        
        <div className={cn(
          "fixed inset-y-0 left-0 z-40 transition-transform duration-300 transform",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <Sidebar />
        </div>
      </div>
      
      {/* Sidebar for desktop - always visible */}
      <div className="hidden md:block">
        <Sidebar />
      </div>
      
      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <DashboardHeader 
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebarOpen}
          handleLogout={handleLogout}
        />
        
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto pt-16 md:pt-6 ml-0 md:ml-64">
          {isMainDashboard ? (
            <div className="space-y-6">
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              <DashboardStats />
              <DashboardCharts />
              <RecentRecords />
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

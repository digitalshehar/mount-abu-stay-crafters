
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";

const AdminDashboard = () => {
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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of the admin dashboard",
      });
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error logging out",
        description: "There was a problem logging you out",
        variant: "destructive"
      });
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path || 
          (path !== '/admin' && location.pathname.startsWith(path));
  };

  return (
    <div className="min-h-screen bg-stone-50 flex overflow-hidden">
      <DashboardHeader 
        sidebarOpen={sidebarOpen} 
        toggleSidebar={toggleSidebar} 
      />
      
      <DashboardSidebar
        sidebarOpen={sidebarOpen}
        isActive={isActive}
        handleLogout={handleLogout}
        toggleSidebar={toggleSidebar}
      />

      {/* Main content */}
      <main className={cn(
        "flex-1 p-4 sm:p-6 transition-all duration-300 pt-16 md:pt-6 overflow-y-auto",
        "md:ml-[280px]"
      )}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;

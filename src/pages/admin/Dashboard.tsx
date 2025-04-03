
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/admin/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
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

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen bg-stone-50 overflow-hidden">
      {/* Dashboard Sidebar */}
      <DashboardSidebar 
        sidebarOpen={sidebarOpen}
        isActive={isActive}
        handleLogout={handleLogout}
        toggleSidebar={toggleSidebarOpen}
      />
      
      {/* Main content */}
      <div className={cn(
        "flex flex-col flex-1 transition-all duration-300",
        sidebarOpen ? "md:ml-[280px]" : "md:ml-0"
      )}>
        <DashboardHeader 
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebarOpen}
          handleLogout={handleLogout}
        />
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 bg-stone-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

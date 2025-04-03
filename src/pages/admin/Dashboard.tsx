
import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/context/AuthContext";
import Sidebar from "@/components/admin/Sidebar";
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
    <div className="min-h-screen bg-stone-50 flex">
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
          <Sidebar 
            isActive={isActive}
            handleLogout={handleLogout}
            toggleSidebar={toggleSidebarOpen}
            sidebarOpen={sidebarOpen}
          />
        </div>
      </div>
      
      {/* Sidebar for desktop - always visible */}
      <div className="hidden md:block">
        <Sidebar 
          isActive={isActive}
          handleLogout={handleLogout}
          toggleSidebar={toggleSidebarOpen}
          sidebarOpen={true}
        />
      </div>
      
      {/* Main content */}
      <div className="flex flex-col flex-grow overflow-hidden">
        <DashboardHeader 
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebarOpen}
          handleLogout={handleLogout}
        />
        
        <main className="flex-grow p-4 sm:p-6 overflow-y-auto pt-16 md:pt-6 ml-0 md:ml-64">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

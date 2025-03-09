
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Hotel, 
  FileText, 
  Car, 
  Bike, 
  Map, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  PlusSquare,
  Globe,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { NavItem } from "./AdminNavItems";

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  navItems: NavItem[];
}

const AdminSidebar: React.FC<SidebarProps> = ({ 
  sidebarOpen, 
  toggleSidebar,
  navItems 
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (window.innerWidth < 768) {
      toggleSidebar();
    }
  }, [location.pathname, toggleSidebar]);

  const isActive = (path: string) => {
    return location.pathname === path || 
          (path !== '/admin' && location.pathname.startsWith(path));
  };

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin dashboard",
    });
    navigate('/');
  };

  return (
    <>
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside 
        className={cn(
          "bg-white text-stone-800 w-[280px] fixed inset-y-0 left-0 z-40 transition-transform duration-300 shadow-md flex flex-col",
          !sidebarOpen && "-translate-x-full md:translate-x-0",
          sidebarOpen && "translate-x-0"
        )}
      >
        <div className="p-4 sm:p-6 border-b border-stone-200 flex-shrink-0">
          <Link to="/admin" className="flex items-center gap-2">
            <span className="bg-primary text-white text-xl p-2 rounded font-bold">HM</span>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </Link>
        </div>
        
        <nav className="p-4 overflow-y-auto flex-grow">
          <div className="mb-2 px-4 py-2 text-xs uppercase text-stone-500 font-semibold">Content Management</div>
          <ul className="space-y-1 mb-6">
            {navItems.slice(0, 6).map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={cn(
                    "flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive(item.path)
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-stone-600 hover:bg-stone-100"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </div>
                  {isActive(item.path) && <ChevronRight size={16} />}
                </Link>
              </li>
            ))}
          </ul>
          
          <Separator className="my-4" />
          
          <div className="mb-2 px-4 py-2 text-xs uppercase text-stone-500 font-semibold">Website Controls</div>
          <ul className="space-y-1 mb-6">
            {navItems.slice(6).map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={cn(
                    "flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive(item.path)
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-stone-600 hover:bg-stone-100"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </div>
                  {isActive(item.path) && <ChevronRight size={16} />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-stone-200 mt-auto">
          <Link 
            to="/" 
            className="block w-full px-4 py-2 text-sm text-center text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors mb-3"
          >
            View Website
          </Link>
          
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm text-stone-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;

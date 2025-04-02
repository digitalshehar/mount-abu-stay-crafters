
import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home, Hotel, Bike, Car, BookOpen, Users, 
  Calendar, Settings, ChevronLeft, LogOut 
} from "lucide-react";
import Logo from "@/components/Logo";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar = ({ collapsed, onToggleCollapse }: SidebarProps) => {
  const location = useLocation();
  
  // Navigation items with their respective paths and icons
  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: Home },
    { name: 'Hotels', path: '/admin/hotels', icon: Hotel },
    { name: 'Bike Rentals', path: '/admin/bikes', icon: Bike },
    { name: 'Car Rentals', path: '/admin/cars', icon: Car },
    { name: 'Blog', path: '/admin/blog', icon: BookOpen },
    { name: 'Bookings', path: '/admin/bookings', icon: Calendar },
    { name: 'Users', path: '/admin/users', icon: Users },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];
  
  // Helper function to check if a path is active
  const isActive = (path: string) => {
    if (path === '/admin/dashboard') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };
  
  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-white border-r border-gray-200 dark:bg-stone-900 dark:border-stone-800 transition-all duration-300",
        collapsed ? "w-[70px]" : "w-64"
      )}
    >
      {/* Sidebar Header with Logo */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-stone-800">
        <div className="flex items-center">
          <Logo className="h-8 w-8" />
          {!collapsed && (
            <span className="ml-2 text-xl font-semibold">Admin</span>
          )}
        </div>
        {onToggleCollapse && (
          <button
            onClick={onToggleCollapse}
            className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-stone-400 dark:hover:text-stone-200 dark:hover:bg-stone-800"
          >
            <ChevronLeft
              className={cn(
                "h-5 w-5 transition-transform",
                collapsed ? "rotate-180" : ""
              )}
            />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-2 px-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    "flex items-center py-2 px-3 rounded-md transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary dark:bg-primary/20"
                      : "text-gray-700 hover:bg-gray-100 dark:text-stone-300 dark:hover:bg-stone-800",
                    collapsed ? "justify-center" : ""
                  )
                }
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="ml-3 text-sm font-medium">{item.name}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom section */}
      <div className="p-4 border-t border-gray-200 dark:border-stone-800">
        <div
          className={cn(
            "flex items-center",
            collapsed ? "justify-center" : ""
          )}
        >
          <LogOut className="h-5 w-5 text-gray-500 dark:text-stone-400" />
          {!collapsed && (
            <span className="ml-3 text-sm font-medium text-gray-700 dark:text-stone-300">
              Logout
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

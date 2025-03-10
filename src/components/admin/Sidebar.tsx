
import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  BookOpenText,
  HotelIcon,
  Settings,
  ShoppingBag,
  Bike,
  Car,
  Map,
  CalendarClock,
  Users,
  UserCircle,
  LogOut,
  FileEdit,
  Gauge,
  PanelTop,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse }) => {
  const { signOut } = useAuth();
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const handleSignOut = async () => {
    await signOut();
    // Navigation is handled in the signOut function
  };

  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 h-screen transition-all duration-300 flex flex-col",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <Link to="/admin/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
            <PanelTop className="text-white h-5 w-5" />
          </div>
          {!collapsed && (
            <span className="font-bold text-xl">Admin</span>
          )}
        </Link>
      </div>
      
      <div className="py-4 flex-1 overflow-y-auto">
        <nav className="px-2 space-y-1">
          <NavItem
            to="/admin/dashboard"
            icon={<Gauge className="h-5 w-5" />}
            text="Dashboard"
            active={isActive("/admin/dashboard")}
            collapsed={collapsed}
          />
          
          <NavItem
            to="/admin/hotels"
            icon={<HotelIcon className="h-5 w-5" />}
            text="Hotels"
            active={isActive("/admin/hotels")}
            collapsed={collapsed}
          />
          
          <NavItem
            to="/admin/bookings"
            icon={<CalendarClock className="h-5 w-5" />}
            text="Bookings"
            active={isActive("/admin/bookings")}
            collapsed={collapsed}
          />
          
          <NavItem
            to="/admin/adventures"
            icon={<Map className="h-5 w-5" />}
            text="Adventures"
            active={isActive("/admin/adventures")}
            collapsed={collapsed}
          />
          
          <NavItem
            to="/admin/cars"
            icon={<Car className="h-5 w-5" />}
            text="Car Rentals"
            active={isActive("/admin/cars")}
            collapsed={collapsed}
          />
          
          <NavItem
            to="/admin/bikes"
            icon={<Bike className="h-5 w-5" />}
            text="Bike Rentals"
            active={isActive("/admin/bikes")}
            collapsed={collapsed}
          />
          
          <NavItem
            to="/admin/products"
            icon={<ShoppingBag className="h-5 w-5" />}
            text="Products"
            active={isActive("/admin/products")}
            collapsed={collapsed}
          />
          
          <NavItem
            to="/admin/blog"
            icon={<BookOpenText className="h-5 w-5" />}
            text="Blog Posts"
            active={isActive("/admin/blog")}
            collapsed={collapsed}
          />
          
          <NavItem
            to="/admin/analytics"
            icon={<BarChart3 className="h-5 w-5" />}
            text="Analytics"
            active={isActive("/admin/analytics")}
            collapsed={collapsed}
          />
          
          <NavItem
            to="/admin/users"
            icon={<Users className="h-5 w-5" />}
            text="Users"
            active={isActive("/admin/users")}
            collapsed={collapsed}
          />
          
          <NavItem
            to="/admin/page-builder"
            icon={<FileEdit className="h-5 w-5" />}
            text="Page Builder"
            active={isActive("/admin/page-builder")}
            collapsed={collapsed}
          />
          
          <NavItem
            to="/admin/settings"
            icon={<Settings className="h-5 w-5" />}
            text="Settings"
            active={isActive("/admin/settings")}
            collapsed={collapsed}
          />
        </nav>
      </div>
      
      <div className="p-4 border-t">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UserCircle className="h-8 w-8 text-gray-400" />
            {!collapsed && (
              <div>
                <h3 className="text-sm font-medium">Admin User</h3>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            )}
          </div>
          
          <button 
            onClick={handleSignOut}
            className="text-gray-500 hover:text-gray-700"
            title="Sign Out"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  active: boolean;
  collapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ to, icon, text, active, collapsed }) => {
  return (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
        active 
          ? "bg-primary text-white" 
          : "text-gray-600 hover:bg-gray-100"
      )}
    >
      <div>{icon}</div>
      {!collapsed && <span>{text}</span>}
    </Link>
  );
};

export default Sidebar;

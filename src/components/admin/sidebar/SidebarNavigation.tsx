
import React from "react";
import { useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Hotel,
  CalendarClock,
  FileText,
  Settings,
  ShoppingBag,
  Bike,
  Car,
  Map,
  Users,
  FileEdit,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";
import SidebarItem from "./SidebarItem";

interface SidebarNavigationProps {
  collapsed: boolean;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ collapsed }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const contentNavItems = [
    { icon: <LayoutDashboard className="h-5 w-5" />, text: "Dashboard", to: "/admin" },
    { icon: <Hotel className="h-5 w-5" />, text: "Hotels", to: "/admin/hotels" },
    { icon: <CalendarClock className="h-5 w-5" />, text: "Bookings", to: "/admin/bookings", badge: "5" },
    { icon: <FileText className="h-5 w-5" />, text: "Blog", to: "/admin/blog" },
    { icon: <Car className="h-5 w-5" />, text: "Car Rentals", to: "/admin/rentals/car" },
    { icon: <Bike className="h-5 w-5" />, text: "Bike Rentals", to: "/admin/bikes" }
  ];

  const controlNavItems = [
    { icon: <Map className="h-5 w-5" />, text: "Adventures", to: "/admin/adventures" },
    { icon: <FileEdit className="h-5 w-5" />, text: "Page Builder", to: "/admin/page-builder" },
    { icon: <Globe className="h-5 w-5" />, text: "Website Settings", to: "/admin/website-settings" },
    { icon: <Users className="h-5 w-5" />, text: "Users", to: "/admin/users" },
    { icon: <Settings className="h-5 w-5" />, text: "Admin Settings", to: "/admin/settings" }
  ];

  return (
    <div className="px-2 space-y-6">
      <div>
        <h3 className={cn(
          "px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider",
          collapsed && "sr-only"
        )}>
          Content
        </h3>
        <nav className="space-y-1">
          {contentNavItems.map((item) => (
            <SidebarItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              text={item.text}
              active={isActive(item.to)}
              collapsed={collapsed}
              badge={item.badge}
            />
          ))}
        </nav>
      </div>

      <div>
        <h3 className={cn(
          "px-3 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider",
          collapsed && "sr-only"
        )}>
          Control
        </h3>
        <nav className="space-y-1">
          {controlNavItems.map((item) => (
            <SidebarItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              text={item.text}
              active={isActive(item.to)}
              collapsed={collapsed}
              />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default SidebarNavigation;

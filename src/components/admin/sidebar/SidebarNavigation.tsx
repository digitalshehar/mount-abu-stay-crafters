
import React from "react";
import { useLocation } from "react-router-dom";
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
  FileEdit,
  Gauge,
} from "lucide-react";
import SidebarItem from "./SidebarItem";

interface SidebarNavigationProps {
  collapsed: boolean;
}

const SidebarNavigation: React.FC<SidebarNavigationProps> = ({ collapsed }) => {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const navItems = [
    { icon: <Gauge className="h-5 w-5" />, text: "Dashboard", to: "/admin/dashboard" },
    { icon: <HotelIcon className="h-5 w-5" />, text: "Hotels", to: "/admin/hotels" },
    { icon: <CalendarClock className="h-5 w-5" />, text: "Bookings", to: "/admin/bookings" },
    { icon: <Map className="h-5 w-5" />, text: "Adventures", to: "/admin/adventures" },
    { icon: <Car className="h-5 w-5" />, text: "Car Rentals", to: "/admin/cars" },
    { icon: <Bike className="h-5 w-5" />, text: "Bike Rentals", to: "/admin/bikes" },
    { icon: <ShoppingBag className="h-5 w-5" />, text: "Products", to: "/admin/products" },
    { icon: <BookOpenText className="h-5 w-5" />, text: "Blog Posts", to: "/admin/blog" },
    { icon: <BarChart3 className="h-5 w-5" />, text: "Analytics", to: "/admin/analytics" },
    { icon: <Users className="h-5 w-5" />, text: "Users", to: "/admin/users" },
    { icon: <FileEdit className="h-5 w-5" />, text: "Page Builder", to: "/admin/page-builder" },
    { icon: <Settings className="h-5 w-5" />, text: "Settings", to: "/admin/settings" },
  ];

  return (
    <nav className="px-2 space-y-1">
      {navItems.map((item) => (
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
  );
};

export default SidebarNavigation;

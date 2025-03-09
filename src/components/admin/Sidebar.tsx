
import React from "react";
import { NavLink } from "react-router-dom";
import {
  LucideHome,
  Hotel,
  Compass,
  Calendar,
  Settings as LucideSettings,
  LayoutDashboard,
  ListChecks,
  ShoppingCart,
  PenBox,
  Globe,
  SlidersHorizontal
} from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const getNavClass = ({ isActive }: { isActive: boolean }) => {
    return `flex items-center gap-3 rounded-md p-2 text-sm font-semibold transition-colors hover:bg-gray-100 dark:hover:bg-gray-700 ${
      isActive
        ? "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-50"
        : "text-gray-500 dark:text-gray-400"
    }`;
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-full w-64 flex-col border-r border-r-gray-200 bg-white px-3 py-5 transition-transform dark:border-r-gray-700 dark:bg-gray-800 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0`}
    >
      <div className="flex items-center justify-between">
        <LayoutDashboard className="mr-2 h-6 w-6 text-gray-500" />
        <span className="text-lg font-semibold dark:text-gray-50">Admin Panel</span>
      </div>

      {/* Main navigation */}
      <div className="space-y-1">
        <NavLink to="/admin/dashboard" className={getNavClass}>
          <LucideHome className="mr-3 h-5 w-5" />
          Dashboard
        </NavLink>
        <NavLink to="/admin/hotels" className={getNavClass}>
          <Hotel className="mr-3 h-5 w-5" />
          Hotels
        </NavLink>
        <NavLink to="/admin/booking-management" className={getNavClass}>
          <Calendar className="mr-3 h-5 w-5" />
          Booking Management
        </NavLink>
        <NavLink to="/admin/adventures" className={getNavClass}>
          <Compass className="mr-3 h-5 w-5" />
          Adventures
        </NavLink>
        <NavLink to="/admin/car-rentals" className={getNavClass}>
          <ShoppingCart className="mr-3 h-5 w-5" />
          Car Rentals
        </NavLink>
        <NavLink to="/admin/bike-rentals" className={getNavClass}>
          <PenBox className="mr-3 h-5 w-5" />
          Bike Rentals
        </NavLink>
        <NavLink to="/admin/blog" className={getNavClass}>
          <ListChecks className="mr-3 h-5 w-5" />
          Blog Posts
        </NavLink>
      </div>

      {/* Settings navigation */}
      <div className="mt-auto space-y-1">
        <h3 className="mb-1 px-3 text-sm font-medium text-gray-500 dark:text-gray-400">
          Settings
        </h3>
        <NavLink to="/admin/settings" className={getNavClass}>
          <LucideSettings className="mr-3 h-5 w-5" />
          General
        </NavLink>
        <NavLink to="/admin/website-settings" className={getNavClass}>
          <Globe className="mr-3 h-5 w-5" />
          Website
        </NavLink>
        <NavLink to="/admin/page-builder" className={getNavClass}>
          <SlidersHorizontal className="mr-3 h-5 w-5" />
          Page Builder
        </NavLink>
      </div>
    </aside>
  );
};

export default Sidebar;

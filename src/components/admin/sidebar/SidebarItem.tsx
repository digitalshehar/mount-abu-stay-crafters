
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  active: boolean;
  collapsed: boolean;
}

const SidebarItem: React.FC<NavItemProps> = ({ to, icon, text, active, collapsed }) => {
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

export default SidebarItem;

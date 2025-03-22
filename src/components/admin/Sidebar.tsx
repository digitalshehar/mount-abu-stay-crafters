
import React from "react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarNavigation from "./sidebar/SidebarNavigation";
import SidebarProfile from "./sidebar/SidebarProfile";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggleCollapse }) => {
  const { signOut } = useAuth();
  
  return (
    <div
      className={cn(
        "bg-white border-r border-gray-200 h-screen transition-all duration-300 flex flex-col",
        collapsed ? "w-[70px]" : "w-[250px]"
      )}
    >
      <SidebarHeader collapsed={collapsed} />
      
      <div className="py-4 flex-1 overflow-y-auto">
        <SidebarNavigation collapsed={collapsed} />
      </div>
      
      <SidebarProfile signOut={signOut} collapsed={collapsed} />
    </div>
  );
};

export default Sidebar;

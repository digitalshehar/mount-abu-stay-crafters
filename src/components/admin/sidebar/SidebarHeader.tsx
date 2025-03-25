
import React from "react";
import { Link } from "react-router-dom";
import { PanelTop } from "lucide-react";

interface SidebarHeaderProps {
  collapsed: boolean;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed }) => {
  return (
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
  );
};

export default SidebarHeader;

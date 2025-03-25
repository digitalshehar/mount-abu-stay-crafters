
import React from "react";
import { Link } from "react-router-dom";
import { PanelTop, ChevronLeft, ChevronRight } from "lucide-react";

interface SidebarHeaderProps {
  collapsed: boolean;
  onToggleCollapse?: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({ collapsed, onToggleCollapse }) => {
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
      
      {onToggleCollapse && (
        <button 
          onClick={onToggleCollapse}
          className="text-gray-500 hover:text-gray-700 transition-colors p-1 rounded-md hover:bg-gray-100"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      )}
    </div>
  );
};

export default SidebarHeader;

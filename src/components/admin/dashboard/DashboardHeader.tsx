
import React from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

interface DashboardHeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ 
  sidebarOpen, 
  toggleSidebar 
}) => {
  return (
    <div className="fixed top-4 left-4 z-50 md:hidden">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={toggleSidebar}
        className="bg-white shadow-md"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </Button>
    </div>
  );
};

export default DashboardHeader;

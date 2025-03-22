
import React from "react";
import { Link } from "react-router-dom";
import { Menu, Bell, Search, User } from "lucide-react";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DashboardHeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  handleLogout: () => Promise<void>;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  sidebarOpen,
  toggleSidebar,
  handleLogout
}) => {
  return (
    <header className="bg-white border-b border-gray-200 py-2 px-4 fixed top-0 right-0 left-0 md:static z-20">
      <div className="flex items-center justify-between h-14">
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            className="inline-flex items-center justify-center p-2 rounded-md text-gray-500 hover:bg-gray-100 md:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div className="md:hidden ml-2 font-semibold">Admin Dashboard</div>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Global search */}
          <div className="relative max-w-xs hidden sm:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-10 pr-4 text-sm text-gray-700 bg-gray-100 border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          {/* Notifications */}
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="p-1.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full">
                <User className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Admin User</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/admin/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/">View Website</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleLogout()} className="text-red-600">
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

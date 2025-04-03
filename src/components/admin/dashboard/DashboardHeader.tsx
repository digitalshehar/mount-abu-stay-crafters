
import React from "react";
import { Menu, Bell, Sun, Moon, User } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";

interface DashboardHeaderProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  handleLogout: () => Promise<void>;
}

const DashboardHeader = ({ sidebarOpen, toggleSidebar, handleLogout }: DashboardHeaderProps) => {
  const { setTheme, theme } = useTheme();
  const { user } = useAuth();
  
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-white dark:bg-stone-900 border-b border-gray-200 dark:border-stone-800 px-4 h-16 shadow-sm">
      <div className="flex items-center">
        {/* Mobile sidebar toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          <Menu className="h-5 w-5" />
        </Button>
        
        <div className="ml-4 md:ml-0 text-lg font-semibold">Admin Dashboard</div>
      </div>
      
      <div className="flex items-center space-x-2">
        {/* Theme toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>
        
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-4">
              <p className="text-sm font-medium mb-1">Notifications</p>
              <p className="text-sm text-muted-foreground">No new notifications</p>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        
        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <User className="h-5 w-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="p-2 text-sm font-medium">
              {user?.email || "Admin User"}
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => window.location.href = "/admin/profile"}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => window.location.href = "/admin/settings"}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleLogout()}>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default DashboardHeader;

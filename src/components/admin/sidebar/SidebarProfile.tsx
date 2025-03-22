
import React from "react";
import { LogOut, UserCircle, ChevronDown } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface SidebarProfileProps {
  signOut: () => Promise<void>;
  collapsed: boolean;
}

const SidebarProfile: React.FC<SidebarProfileProps> = ({ signOut, collapsed }) => {
  const handleSignOut = async () => {
    await signOut();
  };

  if (collapsed) {
    return (
      <div className="p-2 border-t">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center justify-center p-2 rounded-md hover:bg-gray-100">
              <UserCircle className="h-6 w-6 text-gray-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Admin User</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/admin/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    );
  }

  return (
    <div className="p-4 border-t">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center justify-between w-full rounded-md p-2 hover:bg-gray-100 transition-colors">
            <div className="flex items-center gap-2">
              <UserCircle className="h-8 w-8 text-gray-400" />
              <div>
                <h3 className="text-sm font-medium text-left">Admin User</h3>
                <p className="text-xs text-gray-500">Admin</p>
              </div>
            </div>
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem asChild>
            <Link to="/admin/profile">View Profile</Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/admin/settings">Settings</Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="text-red-600">
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign Out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SidebarProfile;

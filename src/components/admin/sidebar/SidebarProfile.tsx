
import React from "react";
import { LogOut, UserCircle } from "lucide-react";

interface SidebarProfileProps {
  signOut: () => Promise<void>;
  collapsed: boolean;
}

const SidebarProfile: React.FC<SidebarProfileProps> = ({ signOut, collapsed }) => {
  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="p-4 border-t">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserCircle className="h-8 w-8 text-gray-400" />
          {!collapsed && (
            <div>
              <h3 className="text-sm font-medium">Admin User</h3>
              <p className="text-xs text-gray-500">Admin</p>
            </div>
          )}
        </div>
        
        <button 
          onClick={handleSignOut}
          className="text-gray-500 hover:text-gray-700"
          title="Sign Out"
        >
          <LogOut className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default SidebarProfile;

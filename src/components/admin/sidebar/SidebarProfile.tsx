
import React from "react";
import { Link } from "react-router-dom";
import { UserCircle, LogOut, ExternalLink } from "lucide-react";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface SidebarProfileProps {
  signOut: () => Promise<void>;
  collapsed: boolean;
}

const SidebarProfile: React.FC<SidebarProfileProps> = ({ signOut, collapsed }) => {
  const profileContent = (
    <div className={cn(
      "p-4 border-t flex items-center gap-3",
      collapsed ? "justify-center" : "justify-between"
    )}>
      <div className="flex items-center gap-3 min-w-0">
        <UserCircle className="h-8 w-8 text-gray-500 flex-shrink-0" />
        
        {!collapsed && (
          <div className="flex flex-col min-w-0">
            <span className="font-medium text-sm truncate">Admin User</span>
            <span className="text-xs text-gray-500 truncate">admin@example.com</span>
          </div>
        )}
      </div>
      
      {!collapsed && (
        <div className="flex items-center gap-2">
          <Link 
            to="/" 
            className="p-1.5 text-gray-500 hover:text-primary hover:bg-gray-100 rounded-md transition-colors"
            title="View Site"
          >
            <ExternalLink size={18} />
          </Link>
          
          <button
            onClick={() => signOut()}
            className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
            title="Sign Out"
          >
            <LogOut size={18} />
          </button>
        </div>
      )}
      
      {collapsed && (
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={() => signOut()}
                className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                <LogOut size={18} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>Sign Out</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );

  return profileContent;
};

export default SidebarProfile;

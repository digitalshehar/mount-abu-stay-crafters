
import React from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  text: string;
  active: boolean;
  collapsed: boolean;
  badge?: string | number;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ 
  to, 
  icon, 
  text, 
  active, 
  collapsed,
  badge 
}) => {
  const linkContent = (
    <Link
      to={to}
      className={cn(
        "flex items-center gap-3 px-3 py-2 rounded-md transition-colors relative",
        active 
          ? "bg-primary text-white font-medium" 
          : "text-gray-600 hover:bg-gray-100"
      )}
    >
      <div className="flex-shrink-0">{icon}</div>
      {!collapsed && <span className="truncate">{text}</span>}
      
      {badge && !collapsed && (
        <span className={cn(
          "ml-auto text-xs rounded-full px-2 py-0.5 font-medium",
          active ? "bg-white/20 text-white" : "bg-gray-200 text-gray-700"
        )}>
          {badge}
        </span>
      )}
    </Link>
  );

  if (collapsed) {
    return (
      <TooltipProvider delayDuration={300}>
        <Tooltip>
          <TooltipTrigger asChild>
            {linkContent}
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{text}</p>
            {badge && (
              <span className="ml-1 text-xs rounded-full px-1.5 py-0.5 bg-gray-200 text-gray-700">
                {badge}
              </span>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return linkContent;
};

export default SidebarItem;

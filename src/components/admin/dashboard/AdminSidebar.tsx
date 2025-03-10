
import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { NavItem } from "./AdminNavItems";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Notification } from "@/context/NotificationContext";
import NotificationsPanel from "@/components/admin/NotificationsPanel";
import { User, LogOut, Bell, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  navItems: NavItem[];
  notifications?: Notification[];
  unreadCount?: number;
  markAsRead?: (id: string) => void;
  markAllAsRead?: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  sidebarOpen,
  toggleSidebar,
  navItems,
  notifications = [],
  unreadCount = 0,
  markAsRead = () => {},
  markAllAsRead = () => {},
}) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [activeItem, setActiveItem] = useState("");
  
  useEffect(() => {
    const currentPath = location.pathname;
    const activeNavItem = navItems.find((item) =>
      currentPath.startsWith(item.path)
    );
    setActiveItem(activeNavItem?.path || "");
  }, [location.pathname, navItems]);

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        className={cn(
          "fixed top-0 left-0 z-40 h-screen bg-white border-r border-stone-200 shadow-sm",
          "w-[280px] transition-transform duration-300 transform",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
        initial={false}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <div className="flex items-center">
            <span className="ml-2 text-xl font-semibold">Mount Abu</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleSidebar}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-col h-[calc(100vh-64px)]">
          <ScrollArea className="flex-1 py-2">
            <nav className="px-2 space-y-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center px-3 py-2.5 text-sm font-medium rounded-md",
                      "transition-colors duration-200",
                      isActive
                        ? "bg-stone-100 text-stone-900"
                        : "text-stone-600 hover:bg-stone-100 hover:text-stone-900"
                    )
                  }
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      toggleSidebar();
                    }
                  }}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              ))}
            </nav>
          </ScrollArea>

          <div className="p-4 border-t border-stone-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.image || ""} alt={user?.email || ""} />
                  <AvatarFallback>
                    {user?.email?.[0]?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="ml-2">
                  <p className="text-sm font-medium">{user?.email}</p>
                  <p className="text-xs text-stone-500">Admin</p>
                </div>
              </div>

              <div className="flex space-x-1">
                <NotificationsPanel
                  notifications={notifications}
                  unreadCount={unreadCount}
                  markAsRead={markAsRead}
                  markAllAsRead={markAllAsRead}
                />
                
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => signOut?.()}
                  className="text-stone-500 hover:text-stone-900"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;

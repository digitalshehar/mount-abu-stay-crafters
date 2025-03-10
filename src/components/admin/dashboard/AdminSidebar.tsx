
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X, Bell } from "lucide-react";
import { cn } from "@/lib/utils";
import NotificationsPanel from "@/components/admin/NotificationsPanel";
import { useAuth } from "@/context/AuthContext";
import { NavItem } from "./AdminNavItems";
import { Notification } from "@/context/NotificationContext";

interface AdminSidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  navItems: NavItem[];
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  sidebarOpen,
  toggleSidebar,
  navItems,
  notifications,
  unreadCount,
  markAsRead,
  markAllAsRead,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // Animations for sidebar
  const sidebarVariants = {
    open: { x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
    closed: { x: "-100%", transition: { type: "spring", stiffness: 300, damping: 24 } },
  };

  // Animation for notification panel
  const notificationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        className={cn(
          "fixed left-0 top-0 bottom-0 w-[280px] bg-white border-r border-stone-200 z-50",
          "flex flex-col shadow-sm",
          "md:translate-x-0 transform",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
        variants={sidebarVariants}
        initial={false}
        animate={sidebarOpen ? "open" : "closed"}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-4 border-b border-stone-200">
          <Link to="/admin/dashboard" className="flex items-center gap-2">
            <div className="font-bold text-lg text-stone-900">Mount Abu Admin</div>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* User Profile */}
        {user && (
          <div className="p-4 border-b border-stone-200">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-stone-200 overflow-hidden">
                {user.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={user.user_metadata?.full_name || "User"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center bg-stone-300 text-stone-600 font-medium">
                    {user.email ? user.email.charAt(0).toUpperCase() : "U"}
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">
                  {user.user_metadata?.full_name || user.email || "User"}
                </div>
                <div className="text-xs text-stone-500 truncate">
                  {user.email}
                </div>
              </div>
              <div className="relative">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="relative"
                        onClick={() => setShowNotifications(!showNotifications)}
                      >
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                          <Badge
                            variant="destructive"
                            className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
                          >
                            {unreadCount}
                          </Badge>
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Notifications</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <AnimatePresence>
                  {showNotifications && (
                    <motion.div
                      className="absolute top-full right-0 mt-2 z-50"
                      variants={notificationVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                    >
                      <NotificationsPanel
                        notifications={notifications}
                        markAsRead={markAsRead}
                        markAllAsRead={markAllAsRead}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-2">
            {navItems.map((item, index) => (
              <React.Fragment key={item.href}>
                {item.section && (
                  <li className="px-3 py-2">
                    <div className="text-xs font-medium text-stone-500 uppercase tracking-wider">
                      {item.section}
                    </div>
                  </li>
                )}
                <li>
                  <Link
                    to={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      location.pathname === item.href
                        ? "bg-stone-100 text-stone-900"
                        : "text-stone-600 hover:bg-stone-100"
                    )}
                  >
                    {item.icon && <item.icon className="h-5 w-5" />}
                    <span>{item.label}</span>
                  </Link>
                </li>
                {index < navItems.length - 1 && item.section && <Separator className="my-2" />}
              </React.Fragment>
            ))}
          </ul>
        </nav>

        {/* Sidebar Footer */}
        <div className="mt-auto p-4 border-t border-stone-200">
          <Button variant="outline" className="w-full" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </motion.aside>
    </>
  );
};

export default AdminSidebar;

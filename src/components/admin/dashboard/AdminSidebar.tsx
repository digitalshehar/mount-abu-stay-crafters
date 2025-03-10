
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOut, ChevronRight, X, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import { NavItem } from "./AdminNavItems";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  type: string;
}

interface SidebarProps {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  navItems: NavItem[];
  notifications?: Notification[];
  unreadCount?: number;
  markAsRead?: (id: string) => void;
  markAllAsRead?: () => void;
}

const AdminSidebar: React.FC<SidebarProps> = ({ 
  sidebarOpen, 
  toggleSidebar,
  navItems,
  notifications = [],
  unreadCount = 0,
  markAsRead,
  markAllAsRead
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();

  const isActive = (path: string) => {
    return location.pathname === path || 
          (path !== '/admin' && location.pathname.startsWith(path));
  };

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin dashboard",
    });
    navigate('/');
  };

  return (
    <>
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      <aside 
        className={cn(
          "bg-white text-stone-800 w-[280px] fixed inset-y-0 left-0 z-40 transition-transform duration-300 shadow-md flex flex-col",
          !sidebarOpen && "-translate-x-full md:translate-x-0",
          sidebarOpen && "translate-x-0"
        )}
      >
        <div className="p-4 sm:p-6 border-b border-stone-200 flex-shrink-0 flex items-center justify-between">
          <Link to="/admin" className="flex items-center gap-2">
            <span className="bg-primary text-white text-xl p-2 rounded font-bold">SC</span>
            <h1 className="text-xl font-bold">Stay Crafters</h1>
          </Link>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell size={18} />
                  {unreadCount > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                      {unreadCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <div className="flex items-center justify-between p-2 border-b">
                  <h3 className="font-semibold">Notifications</h3>
                  {unreadCount > 0 && markAllAsRead && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={markAllAsRead}
                      className="text-xs"
                    >
                      Mark all as read
                    </Button>
                  )}
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <DropdownMenuItem 
                        key={notification.id}
                        className={cn(
                          "p-3 cursor-default",
                          !notification.read && "bg-primary/5"
                        )}
                        onClick={() => markAsRead && markAsRead(notification.id)}
                      >
                        <div className="w-full">
                          <div className="flex justify-between items-start mb-1">
                            <p className="font-medium text-sm">{notification.title}</p>
                            <small className="text-xs text-gray-500">
                              {new Date(notification.createdAt).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </small>
                          </div>
                          <p className="text-xs text-gray-600">{notification.message}</p>
                        </div>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="p-4 text-center text-sm text-gray-500">
                      No notifications
                    </div>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleSidebar}
              className="md:hidden"
            >
              <X size={18} />
            </Button>
          </div>
        </div>
        
        <nav className="p-4 overflow-y-auto flex-grow">
          <div className="mb-2 px-4 py-2 text-xs uppercase text-stone-500 font-semibold">Content Management</div>
          <ul className="space-y-1 mb-6">
            {navItems.slice(0, 6).map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={cn(
                    "flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive(item.path)
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-stone-600 hover:bg-stone-100"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </div>
                  {isActive(item.path) && <ChevronRight size={16} />}
                </Link>
              </li>
            ))}
          </ul>
          
          <Separator className="my-4" />
          
          <div className="mb-2 px-4 py-2 text-xs uppercase text-stone-500 font-semibold">Website Controls</div>
          <ul className="space-y-1 mb-6">
            {navItems.slice(6).map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={cn(
                    "flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive(item.path)
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-stone-600 hover:bg-stone-100"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </div>
                  {isActive(item.path) && <ChevronRight size={16} />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        
        <div className="p-4 border-t border-stone-200 mt-auto">
          <Link 
            to="/" 
            className="block w-full px-4 py-2 text-sm text-center text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors mb-3"
          >
            View Website
          </Link>
          
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm text-stone-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;

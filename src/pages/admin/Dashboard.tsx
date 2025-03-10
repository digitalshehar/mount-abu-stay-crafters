
import React, { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Hotel, 
  FileText, 
  Car, 
  Bike, 
  Map, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  PlusSquare,
  Globe,
  ChevronRight,
  Sun,
  Moon,
  Bell,
  Calendar,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/hooks/useNotifications";
import { useTheme } from "@/hooks/useTheme";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { unreadCount, markAllAsRead } = useNotifications();
  const { theme, setTheme } = useTheme();
  const [notificationPanelOpen, setNotificationPanelOpen] = useState(false);

  // Close sidebar when navigating on mobile
  useEffect(() => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin dashboard",
    });
    // In a real app, you would implement actual logout functionality here
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path || 
          (path !== '/admin' && location.pathname.startsWith(path));
  };

  const navItems = [
    { 
      icon: LayoutDashboard, 
      label: "Overview", 
      path: "/admin" 
    },
    { 
      icon: Hotel, 
      label: "Hotels", 
      path: "/admin/hotels" 
    },
    { 
      icon: Calendar, 
      label: "Bookings", 
      path: "/admin/bookings" 
    },
    { 
      icon: FileText, 
      label: "Blog", 
      path: "/admin/blog" 
    },
    { 
      icon: Car, 
      label: "Car Rentals", 
      path: "/admin/cars" 
    },
    { 
      icon: Bike, 
      label: "Bike Rentals", 
      path: "/admin/bikes" 
    },
    { 
      icon: Map, 
      label: "Adventures", 
      path: "/admin/adventures" 
    },
    { 
      icon: Users, 
      label: "Users", 
      path: "/admin/users" 
    },
    { 
      icon: PlusSquare, 
      label: "Page Builder", 
      path: "/admin/page-builder" 
    },
    { 
      icon: Globe, 
      label: "Website Settings", 
      path: "/admin/website-settings" 
    },
    { 
      icon: Settings, 
      label: "Admin Settings", 
      path: "/admin/settings" 
    },
  ];

  return (
    <div className={`min-h-screen flex overflow-hidden ${theme === 'dark' ? 'dark' : ''}`}>
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleSidebar}
          className="bg-background shadow-md"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden dark:bg-black/50"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-background text-foreground w-[280px] fixed inset-y-0 left-0 z-40 transition-transform duration-300 shadow-md flex flex-col border-r",
          !sidebarOpen && "-translate-x-full md:translate-x-0",
          sidebarOpen && "translate-x-0"
        )}
      >
        <div className="p-4 sm:p-6 border-b flex-shrink-0">
          <Link to="/admin" className="flex items-center gap-2">
            <span className="bg-primary text-primary-foreground text-xl p-2 rounded font-bold">HM</span>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </Link>
        </div>
        
        <nav className="p-4 overflow-y-auto flex-grow">
          <div className="mb-2 px-4 py-2 text-xs uppercase text-muted-foreground font-semibold">Content Management</div>
          <ul className="space-y-1 mb-6">
            {navItems.slice(0, 8).map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={cn(
                    "flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive(item.path)
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-foreground hover:bg-accent/50"
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
          
          <div className="mb-2 px-4 py-2 text-xs uppercase text-muted-foreground font-semibold">Website Controls</div>
          <ul className="space-y-1 mb-6">
            {navItems.slice(8).map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className={cn(
                    "flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors",
                    isActive(item.path)
                      ? "bg-primary/10 text-primary font-medium"
                      : "text-foreground hover:bg-accent/50"
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
        
        <div className="p-4 border-t mt-auto">
          <Link 
            to="/" 
            className="block w-full px-4 py-2 text-sm text-center text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors mb-3"
          >
            View Website
          </Link>
          
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm text-destructive hover:bg-destructive/10 hover:text-destructive rounded-lg transition-colors"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className={cn(
        "flex-1 transition-all duration-300 pt-16 md:pt-6 overflow-y-auto bg-background text-foreground",
        "md:ml-[280px]"
      )}>
        {/* Header with theme toggle and notifications */}
        <div className="fixed top-0 right-0 flex items-center gap-2 p-4 z-40 md:relative">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={() => setNotificationPanelOpen(!notificationPanelOpen)}
            className="rounded-full relative"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                {unreadCount > 9 ? '9+' : unreadCount}
              </Badge>
            )}
          </Button>
        </div>

        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;


import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
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
  Globe
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { Separator } from "@/components/ui/separator";

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of the admin dashboard",
    });
    // In a real app, you would implement actual logout functionality here
    navigate('/');
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
      icon: FileText, 
      label: "Blog", 
      path: "/admin/blog" 
    },
    { 
      icon: Car, 
      label: "Car Rentals", 
      path: "/admin/rentals/car" 
    },
    { 
      icon: Bike, 
      label: "Bike Rentals", 
      path: "/admin/rentals/bike" 
    },
    { 
      icon: Map, 
      label: "Adventures", 
      path: "/admin/adventures" 
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
    <div className="min-h-screen bg-stone-50 flex">
      {/* Mobile sidebar toggle */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleSidebar}
          className="bg-white shadow-md"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
      </div>

      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white text-stone-800 w-64 fixed inset-y-0 left-0 z-40 transition-transform duration-300 shadow-md",
          !sidebarOpen && "-translate-x-full md:translate-x-0",
          sidebarOpen && "translate-x-0"
        )}
      >
        <div className="p-6 border-b border-stone-200">
          <Link to="/admin" className="flex items-center gap-2">
            <span className="bg-primary text-white text-xl p-2 rounded font-bold">HM</span>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </Link>
        </div>
        
        <nav className="p-4">
          <div className="mb-2 px-4 py-2 text-xs uppercase text-stone-500 font-semibold">Content Management</div>
          <ul className="space-y-1 mb-6">
            {navItems.slice(0, 6).map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path}
                  className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
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
                  className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-stone-100 rounded-lg transition-colors"
                >
                  <item.icon size={18} />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="px-4 mt-8">
            <Link to="/" className="block w-full px-4 py-2 text-sm text-center text-primary border border-primary rounded-lg hover:bg-primary/5 transition-colors mb-3">
              View Website
            </Link>
          </div>
          
          <div className="border-t border-stone-200 mt-6 pt-6">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-4 py-3 text-stone-600 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors w-full"
            >
              <LogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </nav>
      </aside>

      {/* Main content */}
      <main className={cn(
        "flex-1 p-6 transition-all duration-300",
        sidebarOpen ? "md:ml-64" : "ml-0"
      )}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;

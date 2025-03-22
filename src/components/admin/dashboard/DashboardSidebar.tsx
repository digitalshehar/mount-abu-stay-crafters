
import React from "react";
import { Link } from "react-router-dom";
import { 
  LayoutDashboard, 
  Hotel, 
  FileText, 
  Car, 
  Bike, 
  Map, 
  Settings, 
  LogOut, 
  PlusSquare,
  Globe,
  ChevronRight,
  CalendarClock
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface NavItemProps {
  path: string;
  label: string;
  icon: React.ElementRef<any>;
  isActive: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ path, label, icon: Icon, isActive }) => (
  <li>
    <Link 
      to={path}
      className={cn(
        "flex items-center justify-between gap-3 px-4 py-3 rounded-lg transition-colors",
        isActive
          ? "bg-primary/10 text-primary font-medium"
          : "text-stone-600 hover:bg-stone-100"
      )}
    >
      <div className="flex items-center gap-3">
        <Icon size={18} />
        <span>{label}</span>
      </div>
      {isActive && <ChevronRight size={16} />}
    </Link>
  </li>
);

interface DashboardSidebarProps {
  sidebarOpen: boolean;
  isActive: (path: string) => boolean;
  handleLogout: () => Promise<void>;
  toggleSidebar: () => void;
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = ({ 
  sidebarOpen, 
  isActive, 
  handleLogout,
  toggleSidebar 
}) => {
  const contentNavItems = [
    { icon: LayoutDashboard, label: "Overview", path: "/admin" },
    { icon: Hotel, label: "Hotels", path: "/admin/hotels" },
    { icon: CalendarClock, label: "Bookings", path: "/admin/bookings" },
    { icon: FileText, label: "Blog", path: "/admin/blog" },
    { icon: Car, label: "Car Rentals", path: "/admin/rentals/car" },
    { icon: Bike, label: "Bike Rentals", path: "/admin/rentals/bike" }
  ];

  const controlNavItems = [
    { icon: Map, label: "Adventures", path: "/admin/adventures" },
    { icon: PlusSquare, label: "Page Builder", path: "/admin/page-builder" },
    { icon: Globe, label: "Website Settings", path: "/admin/website-settings" },
    { icon: Settings, label: "Admin Settings", path: "/admin/settings" }
  ];

  return (
    <>
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside 
        className={cn(
          "bg-white text-stone-800 w-[280px] fixed inset-y-0 left-0 z-40 transition-transform duration-300 shadow-md flex flex-col",
          !sidebarOpen && "-translate-x-full md:translate-x-0",
          sidebarOpen && "translate-x-0"
        )}
      >
        <div className="p-4 sm:p-6 border-b border-stone-200 flex-shrink-0">
          <Link to="/admin" className="flex items-center gap-2">
            <span className="bg-primary text-white text-xl p-2 rounded font-bold">HM</span>
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </Link>
        </div>
        
        <nav className="p-4 overflow-y-auto flex-grow">
          <div className="mb-2 px-4 py-2 text-xs uppercase text-stone-500 font-semibold">
            Content Management
          </div>
          <ul className="space-y-1 mb-6">
            {contentNavItems.map((item) => (
              <NavItem 
                key={item.path}
                path={item.path}
                label={item.label}
                icon={item.icon}
                isActive={isActive(item.path)}
              />
            ))}
          </ul>
          
          <Separator className="my-4" />
          
          <div className="mb-2 px-4 py-2 text-xs uppercase text-stone-500 font-semibold">
            Website Controls
          </div>
          <ul className="space-y-1 mb-6">
            {controlNavItems.map((item) => (
              <NavItem 
                key={item.path}
                path={item.path}
                label={item.label}
                icon={item.icon}
                isActive={isActive(item.path)}
              />
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

export default DashboardSidebar;

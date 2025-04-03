
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
  CalendarClock,
  Users
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface NavItemProps {
  path: string;
  label: string;
  icon: React.ElementType;
  isActive: boolean;
  badge?: string | number;
}

const NavItem: React.FC<NavItemProps> = ({ path, label, icon: Icon, isActive, badge }) => (
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
      <div className="flex items-center">
        {badge && (
          <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full mr-2">
            {badge}
          </span>
        )}
        {isActive && <ChevronRight size={16} />}
      </div>
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
    { icon: CalendarClock, label: "Bookings", path: "/admin/bookings", badge: "5" },
    { icon: FileText, label: "Blog", path: "/admin/blog" },
    { icon: Car, label: "Car Rentals", path: "/admin/cars" },
    { icon: Bike, label: "Bike Rentals", path: "/admin/bikes" }
  ];

  const controlNavItems = [
    { icon: Map, label: "Adventures", path: "/admin/adventures" },
    { icon: PlusSquare, label: "Page Builder", path: "/admin/page-builder" },
    { icon: Globe, label: "Website", path: "/admin/website-settings" },
    { icon: Users, label: "Users", path: "/admin/users" },
    { icon: Settings, label: "Settings", path: "/admin/settings" }
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
          "bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 w-[280px] fixed inset-y-0 left-0 z-40 transition-transform duration-300 shadow-md flex flex-col",
          !sidebarOpen && "-translate-x-full md:translate-x-0",
          sidebarOpen && "translate-x-0"
        )}
      >
        <div className="p-4 sm:p-6 border-b border-stone-200 dark:border-stone-700 flex-shrink-0">
          <Link to="/admin" className="flex items-center gap-2">
            <span className="bg-primary text-white text-xl p-2 rounded font-bold">HM</span>
            <h1 className="text-xl font-bold dark:text-white">Admin Dashboard</h1>
          </Link>
        </div>
        
        <nav className="p-4 overflow-y-auto flex-grow">
          <div className="mb-2 px-4 py-2 text-xs uppercase text-stone-500 dark:text-stone-400 font-semibold">
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
                badge={item.badge}
              />
            ))}
          </ul>
          
          <Separator className="my-4 dark:bg-stone-700" />
          
          <div className="mb-2 px-4 py-2 text-xs uppercase text-stone-500 dark:text-stone-400 font-semibold">
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
        
        <div className="p-4 border-t border-stone-200 dark:border-stone-700 mt-auto">
          <Link 
            to="/" 
            className="block w-full px-4 py-2 text-sm text-center text-primary dark:text-primary-foreground border border-primary rounded-lg hover:bg-primary/5 dark:hover:bg-primary/20 transition-colors mb-3"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Website
          </Link>
          
          <button 
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm text-stone-600 dark:text-stone-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors"
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

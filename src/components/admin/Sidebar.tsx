
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Hotel, 
  CalendarRange, 
  Users, 
  Settings, 
  FileText, 
  Car, 
  Bike, 
  Mountain,
  ChevronDown,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const currentPath = location.pathname;

  const [contentExpanded, setContentExpanded] = React.useState(true);
  const [controlExpanded, setControlExpanded] = React.useState(true);

  const isActive = (path: string) => {
    return currentPath === path || currentPath.startsWith(path);
  };

  const contentMenuItems = [
    { 
      name: 'Dashboard', 
      path: '/admin/dashboard', 
      icon: <LayoutDashboard className="h-5 w-5" /> 
    },
    { 
      name: 'Hotels', 
      path: '/admin/hotels', 
      icon: <Hotel className="h-5 w-5" /> 
    },
    { 
      name: 'Bookings', 
      path: '/admin/bookings', 
      icon: <CalendarRange className="h-5 w-5" />,
      badge: "5" 
    },
    { 
      name: 'Car Rentals', 
      path: '/admin/cars', 
      icon: <Car className="h-5 w-5" /> 
    },
    { 
      name: 'Bike Rentals', 
      path: '/admin/bikes', 
      icon: <Bike className="h-5 w-5" /> 
    },
  ];

  const controlMenuItems = [
    { 
      name: 'Adventures', 
      path: '/admin/adventures', 
      icon: <Mountain className="h-5 w-5" /> 
    },
    { 
      name: 'Blog', 
      path: '/admin/blog', 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      name: 'Page Builder', 
      path: '/admin/page-builder', 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      name: 'Users', 
      path: '/admin/users', 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      name: 'Settings', 
      path: '/admin/settings', 
      icon: <Settings className="h-5 w-5" /> 
    },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r border-stone-200 flex flex-col py-5 shadow-sm">
      <div className="px-6 mb-8">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      
      <nav className="flex-1 px-3 overflow-y-auto">
        {/* Content section */}
        <div className="mb-6">
          <button 
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-stone-700"
            onClick={() => setContentExpanded(!contentExpanded)}
          >
            <span>Content</span>
            {contentExpanded ? (
              <ChevronDown className="h-4 w-4 text-stone-500" />
            ) : (
              <ChevronRight className="h-4 w-4 text-stone-500" />
            )}
          </button>
          
          {contentExpanded && (
            <ul className="mt-1 space-y-1">
              {contentMenuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? "bg-primary text-primary-foreground"
                        : "text-stone-700 hover:bg-stone-100"
                    }`}
                  >
                    <span className="flex items-center">
                      <span className="mr-3">{item.icon}</span>
                      {item.name}
                    </span>
                    {item.badge && (
                      <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Control section */}
        <div className="mb-6">
          <button 
            className="w-full flex items-center justify-between px-3 py-2 text-sm font-medium text-stone-700"
            onClick={() => setControlExpanded(!controlExpanded)}
          >
            <span>Control</span>
            {controlExpanded ? (
              <ChevronDown className="h-4 w-4 text-stone-500" />
            ) : (
              <ChevronRight className="h-4 w-4 text-stone-500" />
            )}
          </button>
          
          {controlExpanded && (
            <ul className="mt-1 space-y-1">
              {controlMenuItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive(item.path)
                        ? "bg-primary text-primary-foreground"
                        : "text-stone-700 hover:bg-stone-100"
                    }`}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </nav>
      
      <div className="px-6 mt-auto pt-6 border-t border-stone-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
              {user?.email ? user.email.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium">{user?.email ? user.email.split('@')[0] : 'Admin User'}</p>
              <p className="text-xs text-stone-500">{user?.email || 'admin@example.com'}</p>
            </div>
          </div>
          <button 
            onClick={() => signOut()}
            className="text-stone-500 hover:text-red-500"
            title="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;


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
  Mountains 
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    return currentPath.startsWith(path);
  };

  const menuItems = [
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
      icon: <CalendarRange className="h-5 w-5" /> 
    },
    { 
      name: 'Car Rentals', 
      path: '/admin/car-rentals', 
      icon: <Car className="h-5 w-5" /> 
    },
    { 
      name: 'Bike Rentals', 
      path: '/admin/bike-rentals', 
      icon: <Bike className="h-5 w-5" /> 
    },
    { 
      name: 'Adventures', 
      path: '/admin/adventures', 
      icon: <Mountains className="h-5 w-5" /> 
    },
    { 
      name: 'Users', 
      path: '/admin/users', 
      icon: <Users className="h-5 w-5" /> 
    },
    { 
      name: 'Content', 
      path: '/admin/blog', 
      icon: <FileText className="h-5 w-5" /> 
    },
    { 
      name: 'Settings', 
      path: '/admin/settings', 
      icon: <Settings className="h-5 w-5" /> 
    },
  ];

  return (
    <div className="h-screen w-64 bg-white border-r border-stone-200 flex flex-col py-5">
      <div className="px-6 mb-8">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      
      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => (
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
      </nav>
      
      <div className="px-6 mt-auto pt-6 border-t border-stone-200">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
            A
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-stone-500">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

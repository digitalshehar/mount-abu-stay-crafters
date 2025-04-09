
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Hotel, Mountain, Bike, Car, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';

const MobileFooter: React.FC = () => {
  const location = useLocation();
  const { user } = useAuth();
  
  const navigationItems = [
    { icon: <Home size={20} />, label: 'Home', path: '/' },
    { icon: <Hotel size={20} />, label: 'Hotels', path: '/hotels' },
    { icon: <Mountain size={20} />, label: 'Adventures', path: '/adventures' },
    { icon: <Car size={20} />, label: 'Cars', path: '/rentals/car' },
    { icon: <Bike size={20} />, label: 'Bikes', path: '/bike-rentals' },
    { icon: <User size={20} />, label: 'Account', path: user ? '/account' : '/login' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t z-40 h-14">
      <div className="grid grid-cols-6 h-full">
        {navigationItems.map((item, index) => {
          const isActive = location.pathname === item.path || 
                        (item.path !== '/' && location.pathname.startsWith(item.path));
          
          return (
            <Link 
              key={index}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center",
                isActive ? "text-primary" : "text-stone-500"
              )}
            >
              {item.icon}
              <span className="text-[10px] mt-0.5">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default MobileFooter;

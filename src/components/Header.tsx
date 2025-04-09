
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import Logo from './Logo';
import { Search, User } from 'lucide-react';
import SearchButton from './search/SearchButton';
import DarkModeToggle from './theme/DarkModeToggle';

const Header: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const navigation = [
    { name: 'Hotels', href: '/hotels' },
    { name: 'Adventures', href: '/adventures' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Bike Rentals', href: '/bike-rentals' },
    { name: 'Car Rentals', href: '/rentals/car' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Blog', href: '/blog' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b z-40 h-16">
      <nav className="container-custom mx-auto h-full flex items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex-shrink-0">
            <Logo />
          </Link>
          
          <div className="hidden lg:flex space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm font-medium text-stone-700 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <SearchButton />
          
          <DarkModeToggle />
          
          {user ? (
            <Button 
              variant="ghost" 
              size="sm" 
              className="flex items-center"
              onClick={() => navigate('/account')}
            >
              <User className="h-5 w-5 mr-2" />
              Account
            </Button>
          ) : (
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => navigate('/login')}
            >
              Sign In
            </Button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Home, Map, Hotel, Mountain, Car, Bike, User, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import Logo from "@/components/Logo";
import SearchButton from "@/components/search/SearchButton";
import { GlobalSearch } from "@/components/search/GlobalSearch";

const MobileHeader: React.FC = () => {
  const { user, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const menuItems = [
    { icon: <Home size={18} />, label: "Home", path: "/" },
    { icon: <Map size={18} />, label: "Destinations", path: "/destinations" },
    { icon: <Hotel size={18} />, label: "Hotels", path: "/hotels" },
    { icon: <Mountain size={18} />, label: "Adventures", path: "/adventures" },
    { icon: <Car size={18} />, label: "Car Rental", path: "/rentals/car" },
    { icon: <Bike size={18} />, label: "Bike Rental", path: "/bike-rentals" },
  ];

  // Improved search handler for mobile
  const handleOpenSearch = () => {
    setSearchOpen(true);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b h-14 flex items-center px-4">
      <div className="w-full flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Search and Menu */}
        <div className="flex items-center gap-2">
          <button 
            onClick={handleOpenSearch}
            className="p-1.5 rounded-full hover:bg-stone-100 flex items-center"
          >
            <Search size={18} />
          </button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="p-1.5 rounded-full hover:bg-stone-100">
                <Menu size={22} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="p-0">
              <div className="flex flex-col h-full">
                <div className="p-4 border-b flex items-center justify-between">
                  <span className="font-semibold">Menu</span>
                  <button onClick={() => setIsOpen(false)}>
                    <X size={20} />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto py-2">
                  {menuItems.map((item, index) => (
                    <Link
                      key={index}
                      to={item.path}
                      className="flex items-center px-4 py-3 hover:bg-stone-50"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="w-8">{item.icon}</span>
                      <span>{item.label}</span>
                    </Link>
                  ))}
                  
                  <div className="border-t my-2"></div>
                  
                  {user ? (
                    <>
                      <Link
                        to="/account"
                        className="flex items-center px-4 py-3 hover:bg-stone-50"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="w-8"><User size={18} /></span>
                        <span>My Account</span>
                      </Link>
                      <Link
                        to="/admin/hotels"
                        className="flex items-center px-4 py-3 hover:bg-stone-50"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className="w-8"><Hotel size={18} /></span>
                        <span>Dashboard</span>
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          setIsOpen(false);
                        }}
                        className="flex items-center px-4 py-3 w-full text-left text-red-600 hover:bg-stone-50"
                      >
                        <span className="w-8">→</span>
                        <span>Logout</span>
                      </button>
                    </>
                  ) : (
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-2">
                        <Link
                          to="/login"
                          className="py-2 px-3 rounded-lg border border-stone-200 text-center"
                          onClick={() => setIsOpen(false)}
                        >
                          Login
                        </Link>
                        <Link
                          to="/register"
                          className="py-2 px-3 rounded-lg bg-primary text-white text-center"
                          onClick={() => setIsOpen(false)}
                        >
                          Register
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Global Search Component */}
      <GlobalSearch open={searchOpen} setOpen={setSearchOpen} />
    </header>
  );
};

export default MobileHeader;

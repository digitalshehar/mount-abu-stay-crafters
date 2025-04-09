
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "../Logo";
import { Button } from "@/components/ui/button";
import SearchButton from "../search/MobileSearchButton";

const MobileHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => {
    setIsOpen(false);
  };

  const handleNavigation = (path: string) => {
    console.log("Navigation to:", path);
    closeMenu();
    // Add a small timeout to ensure the menu closes before navigation
    setTimeout(() => {
      navigate(path);
    }, 10);
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-white z-50 border-b flex items-center px-4">
      <div className="flex items-center justify-between w-full">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>

        <div className="flex items-center gap-2">
          <SearchButton />
          
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-[350px] pt-12">
              <nav className="space-y-6">
                <button 
                  onClick={() => handleNavigation("/hotels")}
                  className="block w-full text-left py-2 text-lg font-medium hover:text-primary transition-colors"
                >
                  Hotels
                </button>
                <button 
                  onClick={() => handleNavigation("/hotels?type=apartment")}
                  className="block w-full text-left py-2 text-lg font-medium hover:text-primary transition-colors"
                >
                  Homes & Apartments
                </button>
                <button 
                  onClick={() => handleNavigation("/adventures")}
                  className="block w-full text-left py-2 text-lg font-medium hover:text-primary transition-colors"
                >
                  Adventures
                </button>
                <button 
                  onClick={() => handleNavigation("/destinations")}
                  className="block w-full text-left py-2 text-lg font-medium hover:text-primary transition-colors"
                >
                  Destinations
                </button>
                <button 
                  onClick={() => handleNavigation("/bike-rentals")}
                  className="block w-full text-left py-2 text-lg font-medium hover:text-primary transition-colors"
                >
                  Bike Rentals
                </button>
                <button 
                  onClick={() => handleNavigation("/rentals/car")}
                  className="block w-full text-left py-2 text-lg font-medium hover:text-primary transition-colors"
                >
                  Car Rentals
                </button>
              </nav>
              
              <div className="absolute top-4 right-4">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;

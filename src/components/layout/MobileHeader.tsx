
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Logo from "../Logo";
import { Button } from "@/components/ui/button";
import SearchButton from "../search/MobileSearchButton";

const MobileHeader: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => {
    setIsOpen(false);
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
                <Link 
                  to="/hotels" 
                  className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  Hotels
                </Link>
                <Link 
                  to="/hotels?type=apartment" 
                  className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  Homes & Apartments
                </Link>
                <Link 
                  to="/adventures" 
                  className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  Adventures
                </Link>
                <Link 
                  to="/destinations" 
                  className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  Destinations
                </Link>
                <Link 
                  to="/bike-rentals" 
                  className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  Bike Rentals
                </Link>
                <Link 
                  to="/rentals/car" 
                  className="block py-2 text-lg font-medium hover:text-primary transition-colors"
                  onClick={closeMenu}
                >
                  Car Rentals
                </Link>
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


import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Logo from "@/components/Logo";
import DarkModeToggle from "./theme/DarkModeToggle";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-sm dark:shadow-stone-900/30 transition-colors duration-300">
      <div className="container-custom py-3 md:py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-1 md:gap-2">
          <Logo />
          <span className="font-bold text-lg md:text-xl dark:text-white">Mount Abu</span>
        </Link>

        <nav className="hidden md:flex items-center gap-4 lg:gap-6">
          <Link to="/" className="text-sm lg:text-base text-stone-700 dark:text-stone-300 hover:text-primary dark:hover:text-white transition-colors">Home</Link>
          <Link to="/hotels" className="text-sm lg:text-base text-stone-700 dark:text-stone-300 hover:text-primary dark:hover:text-white transition-colors">Hotels</Link>
          <Link to="/destinations" className="text-sm lg:text-base text-stone-700 dark:text-stone-300 hover:text-primary dark:hover:text-white transition-colors">Destinations</Link>
          <Link to="/rentals/car" className="text-sm lg:text-base text-stone-700 dark:text-stone-300 hover:text-primary dark:hover:text-white transition-colors">Car Rentals</Link>
          <Link to="/rentals/bike" className="text-sm lg:text-base text-stone-700 dark:text-stone-300 hover:text-primary dark:hover:text-white transition-colors">Bike Rentals</Link>
          <Link to="/adventures" className="text-sm lg:text-base text-stone-700 dark:text-stone-300 hover:text-primary dark:hover:text-white transition-colors">Adventures</Link>
          <Link to="/blog" className="text-sm lg:text-base text-stone-700 dark:text-stone-300 hover:text-primary dark:hover:text-white transition-colors">Blog</Link>
          <DarkModeToggle />
        </nav>

        <div className="md:hidden flex items-center gap-2">
          <DarkModeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <button>
                <Menu className="dark:text-white" />
              </button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-xs dark:bg-stone-900 dark:text-white transition-colors duration-300">
              <SheetHeader>
                <SheetTitle className="dark:text-white">Menu</SheetTitle>
                <SheetDescription className="dark:text-stone-400">
                  Explore Mount Abu with our services.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-4 py-4">
                <Link to="/" className="text-stone-700 dark:text-stone-300 hover:text-primary dark:hover:text-white transition-colors">Home</Link>
                <Link to="/hotels" className="text-stone-700 dark:text-stone-300 hover:text-primary dark:hover:text-white transition-colors">Hotels</Link>
                <Link to="/destinations" className="text-stone-700 dark:text-stone-300 hover:text-primary dark:hover:text-white transition-colors">Destinations</Link>
                <Link to="/rentals/car" className="text-stone-700 dark:text-stone-300 hover:text-primary dark:hover:text-white transition-colors">Car Rentals</Link>
                <Link to="/rentals/bike" className="text-stone-700 dark:text-stone-300 hover:text-primary dark:hover:text-white transition-colors">Bike Rentals</Link>
                <Link to="/adventures" className="text-stone-700 dark:text-stone-300 hover:text-primary dark:hover:text-white transition-colors">Adventures</Link>
                <Link to="/blog" className="text-stone-700 dark:text-stone-300 hover:text-primary dark:hover:text-white transition-colors">Blog</Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;

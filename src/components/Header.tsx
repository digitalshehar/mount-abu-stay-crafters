
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

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container-custom py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Logo />
          <span className="font-bold text-xl">Mount Abu</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {/* Make sure car rentals link uses the correct path */}
          <Link to="/" className="text-stone-700 hover:text-primary transition-colors">Home</Link>
          <Link to="/hotels" className="text-stone-700 hover:text-primary transition-colors">Hotels</Link>
          <Link to="/destinations" className="text-stone-700 hover:text-primary transition-colors">Destinations</Link>
          <Link to="/rentals/car" className="text-stone-700 hover:text-primary transition-colors">Car Rentals</Link>
          <Link to="/rentals/bike" className="text-stone-700 hover:text-primary transition-colors">Bike Rentals</Link>
          <Link to="/adventures" className="text-stone-700 hover:text-primary transition-colors">Adventures</Link>
          <Link to="/blog" className="text-stone-700 hover:text-primary transition-colors">Blog</Link>
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden">
              <Menu />
            </button>
          </SheetTrigger>
          <SheetContent className="sm:max-w-xs">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
              <SheetDescription>
                Explore Mount Abu with our services.
              </SheetDescription>
            </SheetHeader>
            <div className="grid gap-4 py-4">
              <Link to="/" className="text-stone-700 hover:text-primary transition-colors">Home</Link>
              <Link to="/hotels" className="text-stone-700 hover:text-primary transition-colors">Hotels</Link>
              <Link to="/destinations" className="text-stone-700 hover:text-primary transition-colors">Destinations</Link>
              <Link to="/rentals/car" className="text-stone-700 hover:text-primary transition-colors">Car Rentals</Link>
              <Link to="/rentals/bike" className="text-stone-700 hover:text-primary transition-colors">Bike Rentals</Link>
              <Link to="/adventures" className="text-stone-700 hover:text-primary transition-colors">Adventures</Link>
              <Link to="/blog" className="text-stone-700 hover:text-primary transition-colors">Blog</Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Header;

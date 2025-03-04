
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isResourcesDropdownOpen, setIsResourcesDropdownOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <span
              className={cn(
                "text-2xl font-bold font-display transition-colors duration-300",
                isScrolled ? "text-primary" : "text-white"
              )}
            >
              HotelInMountAbu
            </span>
          </Link>

          <nav className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              className={cn(
                "px-4 py-2 rounded-md transition-colors",
                isScrolled
                  ? "text-stone-800 hover:bg-stone-100"
                  : "text-white hover:bg-white/10",
                isActive("/") && (isScrolled ? "bg-stone-100" : "bg-white/10")
              )}
            >
              Home
            </Link>
            <Link
              to="/hotels"
              className={cn(
                "px-4 py-2 rounded-md transition-colors",
                isScrolled
                  ? "text-stone-800 hover:bg-stone-100"
                  : "text-white hover:bg-white/10",
                isActive("/hotels") && (isScrolled ? "bg-stone-100" : "bg-white/10")
              )}
            >
              Hotels
            </Link>
            <Link
              to="/rentals/car"
              className={cn(
                "px-4 py-2 rounded-md transition-colors",
                isScrolled
                  ? "text-stone-800 hover:bg-stone-100"
                  : "text-white hover:bg-white/10",
                isActive("/rentals/car") && (isScrolled ? "bg-stone-100" : "bg-white/10")
              )}
            >
              Car Rentals
            </Link>
            <Link
              to="/rentals/bike"
              className={cn(
                "px-4 py-2 rounded-md transition-colors",
                isScrolled
                  ? "text-stone-800 hover:bg-stone-100"
                  : "text-white hover:bg-white/10",
                isActive("/rentals/bike") && (isScrolled ? "bg-stone-100" : "bg-white/10")
              )}
            >
              Bike Rentals
            </Link>
            <Link
              to="/adventures"
              className={cn(
                "px-4 py-2 rounded-md transition-colors",
                isScrolled
                  ? "text-stone-800 hover:bg-stone-100"
                  : "text-white hover:bg-white/10",
                isActive("/adventures") && (isScrolled ? "bg-stone-100" : "bg-white/10")
              )}
            >
              Adventures
            </Link>
            
            <div className="relative">
              <button
                className={cn(
                  "px-4 py-2 rounded-md transition-colors flex items-center",
                  isScrolled
                    ? "text-stone-800 hover:bg-stone-100"
                    : "text-white hover:bg-white/10",
                  (isActive("/about-us") || isActive("/contact") || isActive("/travel-guide") || 
                   isActive("/faqs") || isActive("/terms") || isActive("/privacy") || 
                   isActive("/cancellation-policy")) && 
                  (isScrolled ? "bg-stone-100" : "bg-white/10")
                )}
                onClick={() => setIsResourcesDropdownOpen(!isResourcesDropdownOpen)}
              >
                Resources <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              
              {isResourcesDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg py-2 w-48">
                  <Link
                    to="/about-us"
                    className="block px-4 py-2 text-stone-800 hover:bg-stone-100"
                    onClick={() => setIsResourcesDropdownOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link
                    to="/contact"
                    className="block px-4 py-2 text-stone-800 hover:bg-stone-100"
                    onClick={() => setIsResourcesDropdownOpen(false)}
                  >
                    Contact Us
                  </Link>
                  <Link
                    to="/travel-guide"
                    className="block px-4 py-2 text-stone-800 hover:bg-stone-100"
                    onClick={() => setIsResourcesDropdownOpen(false)}
                  >
                    Travel Guide
                  </Link>
                  <Link
                    to="/faqs"
                    className="block px-4 py-2 text-stone-800 hover:bg-stone-100"
                    onClick={() => setIsResourcesDropdownOpen(false)}
                  >
                    FAQs
                  </Link>
                  <Link
                    to="/terms"
                    className="block px-4 py-2 text-stone-800 hover:bg-stone-100"
                    onClick={() => setIsResourcesDropdownOpen(false)}
                  >
                    Terms & Conditions
                  </Link>
                  <Link
                    to="/privacy"
                    className="block px-4 py-2 text-stone-800 hover:bg-stone-100"
                    onClick={() => setIsResourcesDropdownOpen(false)}
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    to="/cancellation-policy"
                    className="block px-4 py-2 text-stone-800 hover:bg-stone-100"
                    onClick={() => setIsResourcesDropdownOpen(false)}
                  >
                    Cancellation Policy
                  </Link>
                </div>
              )}
            </div>
            
            <Link
              to="/blog"
              className={cn(
                "px-4 py-2 rounded-md transition-colors",
                isScrolled
                  ? "text-stone-800 hover:bg-stone-100"
                  : "text-white hover:bg-white/10",
                isActive("/blog") && (isScrolled ? "bg-stone-100" : "bg-white/10")
              )}
            >
              Blog
            </Link>
          </nav>

          <div className="hidden lg:flex items-center">
            <Link
              to="/contact"
              className={cn(
                "px-6 py-2 rounded-lg font-medium transition-all",
                isScrolled
                  ? "bg-primary text-white hover:bg-primary/90"
                  : "bg-white text-primary hover:bg-white/90"
              )}
            >
              Book Now
            </Link>
          </div>

          <button
            className="lg:hidden text-2xl"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X
                className={cn(
                  "h-6 w-6 transition-colors duration-300",
                  isScrolled ? "text-stone-800" : "text-white"
                )}
              />
            ) : (
              <Menu
                className={cn(
                  "h-6 w-6 transition-colors duration-300",
                  isScrolled ? "text-stone-800" : "text-white"
                )}
              />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-20 pb-6 px-6 lg:hidden overflow-y-auto">
          <nav className="flex flex-col space-y-4">
            <Link
              to="/"
              className="px-4 py-3 rounded-md hover:bg-stone-100 text-stone-800"
            >
              Home
            </Link>
            <Link
              to="/hotels"
              className="px-4 py-3 rounded-md hover:bg-stone-100 text-stone-800"
            >
              Hotels
            </Link>
            <Link
              to="/rentals/car"
              className="px-4 py-3 rounded-md hover:bg-stone-100 text-stone-800"
            >
              Car Rentals
            </Link>
            <Link
              to="/rentals/bike"
              className="px-4 py-3 rounded-md hover:bg-stone-100 text-stone-800"
            >
              Bike Rentals
            </Link>
            <Link
              to="/adventures"
              className="px-4 py-3 rounded-md hover:bg-stone-100 text-stone-800"
            >
              Adventures
            </Link>
            <Link
              to="/blog"
              className="px-4 py-3 rounded-md hover:bg-stone-100 text-stone-800"
            >
              Blog
            </Link>
            
            <div className="border-t border-stone-100 pt-2">
              <h3 className="px-4 py-2 text-sm text-stone-500 font-medium">Resources</h3>
              <Link
                to="/about-us"
                className="px-4 py-3 rounded-md hover:bg-stone-100 text-stone-800"
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="px-4 py-3 rounded-md hover:bg-stone-100 text-stone-800"
              >
                Contact Us
              </Link>
              <Link
                to="/travel-guide"
                className="px-4 py-3 rounded-md hover:bg-stone-100 text-stone-800"
              >
                Travel Guide
              </Link>
              <Link
                to="/faqs"
                className="px-4 py-3 rounded-md hover:bg-stone-100 text-stone-800"
              >
                FAQs
              </Link>
              <Link
                to="/terms"
                className="px-4 py-3 rounded-md hover:bg-stone-100 text-stone-800"
              >
                Terms & Conditions
              </Link>
              <Link
                to="/privacy"
                className="px-4 py-3 rounded-md hover:bg-stone-100 text-stone-800"
              >
                Privacy Policy
              </Link>
              <Link
                to="/cancellation-policy"
                className="px-4 py-3 rounded-md hover:bg-stone-100 text-stone-800"
              >
                Cancellation Policy
              </Link>
            </div>
            
            <div className="pt-4 mt-4 border-t border-stone-100">
              <Link
                to="/contact"
                className="block w-full px-4 py-3 bg-primary text-white text-center rounded-lg font-medium"
              >
                Book Now
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

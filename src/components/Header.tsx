
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md shadow-sm py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center space-x-2 transition-opacity duration-300 hover:opacity-80"
        >
          <span className="text-2xl font-display font-bold text-primary">
            HotelInMountAbu
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {[
            { name: "Home", path: "/" },
            {
              name: "Hotels",
              path: "/hotels",
              dropdown: true,
              items: [
                { name: "All Hotels", path: "/hotels" },
                { name: "Luxury Hotels", path: "/hotels?category=luxury" },
                { name: "Budget Stays", path: "/hotels?category=budget" },
              ],
            },
            {
              name: "Rentals",
              path: "/rentals",
              dropdown: true,
              items: [
                { name: "Car Rentals", path: "/rentals/car" },
                { name: "Bike Rentals", path: "/rentals/bike" },
              ],
            },
            {
              name: "Adventures",
              path: "/adventures",
              dropdown: true,
              items: [
                { name: "Trekking", path: "/adventures/trekking" },
                { name: "Camping", path: "/adventures/camping" },
                { name: "Sightseeing", path: "/adventures/sightseeing" },
              ],
            },
            { name: "About", path: "/about" },
            { name: "Contact", path: "/contact" },
          ].map((item, index) =>
            item.dropdown ? (
              <div key={index} className="relative group">
                <button className="flex items-center text-foreground/80 hover:text-primary transition-colors">
                  {item.name}
                  <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute left-0 mt-2 w-48 origin-top-left rounded-md glass-panel shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    {item.items?.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subItem.path}
                        className="block px-4 py-2 text-sm text-foreground hover:bg-secondary/50 transition-colors"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={index}
                to={item.path}
                className="text-foreground/80 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            )
          )}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/login"
            className="text-sm text-foreground/80 hover:text-primary transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/register"
            className="px-4 py-2 rounded-full bg-primary text-white text-sm font-medium shadow-sm transition-all hover:shadow-md hover:bg-primary/90"
          >
            Sign Up
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-white z-40 pt-20 animate-fade-in">
          <nav className="container-custom flex flex-col space-y-4 py-6">
            {[
              { name: "Home", path: "/" },
              { name: "Hotels", path: "/hotels" },
              { name: "Car Rentals", path: "/rentals/car" },
              { name: "Bike Rentals", path: "/rentals/bike" },
              { name: "Adventures", path: "/adventures" },
              { name: "About", path: "/about" },
              { name: "Contact", path: "/contact" },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.path}
                className="text-lg font-medium py-2 border-b border-border"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col space-y-4 pt-6">
              <Link
                to="/login"
                className="w-full py-3 text-center border border-primary rounded-full text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="w-full py-3 text-center bg-primary rounded-full text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

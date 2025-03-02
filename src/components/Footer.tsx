
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-stone-50 border-t border-stone-200">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <Link to="/" className="inline-block">
              <span className="text-2xl font-display font-bold text-primary">
                HotelInMountAbu
              </span>
            </Link>
            <p className="text-muted-foreground">
              Discover the best hotels, adventures, and experiences in Mount Abu.
              Your perfect getaway starts here.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-white flex items-center justify-center border border-stone-200 hover:bg-primary hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-white flex items-center justify-center border border-stone-200 hover:bg-primary hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="h-10 w-10 rounded-full bg-white flex items-center justify-center border border-stone-200 hover:bg-primary hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-display font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { name: "Home", path: "/" },
                { name: "About Us", path: "/about" },
                { name: "Hotels", path: "/hotels" },
                { name: "Car Rentals", path: "/rentals/car" },
                { name: "Bike Rentals", path: "/rentals/bike" },
                { name: "Adventures", path: "/adventures" },
                { name: "Contact", path: "/contact" },
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-display font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {[
                { name: "Travel Guide", path: "/travel-guide" },
                { name: "FAQs", path: "/faqs" },
                { name: "Blog", path: "/blog" },
                { name: "Terms & Conditions", path: "/terms" },
                { name: "Privacy Policy", path: "/privacy" },
                { name: "Cancellation Policy", path: "/cancellation" },
              ].map((item, index) => (
                <li key={index}>
                  <Link 
                    to={item.path}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-display font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <span className="text-muted-foreground">
                  123 Mount Abu Road, Rajasthan, India
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary mr-3" />
                <a 
                  href="tel:+919876543210" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  +91 9876 543 210
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary mr-3" />
                <a 
                  href="mailto:info@hotelinmountabu.com" 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  info@hotelinmountabu.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-stone-200 text-center text-muted-foreground text-sm">
          <p>&copy; {new Date().getFullYear()} HotelInMountAbu. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

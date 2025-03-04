
import React from "react";
import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Clock, Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-stone-900 text-white pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-display font-bold mb-6">HotelInMountAbu</h3>
            <p className="text-stone-300 mb-6">
              Your trusted partner for finding the perfect accommodations and experiences in beautiful Mount Abu.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-stone-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/about-us" className="text-stone-300 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/hotels" className="text-stone-300 hover:text-white transition-colors">Hotels</Link>
              </li>
              <li>
                <Link to="/rentals/car" className="text-stone-300 hover:text-white transition-colors">Car Rentals</Link>
              </li>
              <li>
                <Link to="/rentals/bike" className="text-stone-300 hover:text-white transition-colors">Bike Rentals</Link>
              </li>
              <li>
                <Link to="/adventures" className="text-stone-300 hover:text-white transition-colors">Adventures</Link>
              </li>
              <li>
                <Link to="/blog" className="text-stone-300 hover:text-white transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/contact" className="text-stone-300 hover:text-white transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/travel-guide" className="text-stone-300 hover:text-white transition-colors">Travel Guide</Link>
              </li>
              <li>
                <Link to="/faqs" className="text-stone-300 hover:text-white transition-colors">FAQs</Link>
              </li>
              <li>
                <Link to="/terms" className="text-stone-300 hover:text-white transition-colors">Terms & Conditions</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-stone-300 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/cancellation-policy" className="text-stone-300 hover:text-white transition-colors">Cancellation Policy</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-primary" />
                <span className="text-stone-300">123 Main Street, Mount Abu, Rajasthan 307501, India</span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 mr-3 text-primary" />
                <span className="text-stone-300">+91 98765 43210</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 mr-3 text-primary" />
                <span className="text-stone-300">info@hotelinmountabu.com</span>
              </li>
              <li className="flex items-start">
                <Clock className="h-5 w-5 mr-3 text-primary" />
                <span className="text-stone-300">Open 24/7</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8">
          <p className="text-center text-stone-400">
            &copy; {new Date().getFullYear()} HotelInMountAbu. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;


import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Home, CornerDownLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotFoundProps {
  title?: string;
  message?: string;
  image?: string;
  backButtonLabel?: string;
  homeButtonLabel?: string;
  type?: "default" | "hotel" | "destination" | "adventure" | "booking";
}

const NotFound: React.FC<NotFoundProps> = ({
  title = "Page Not Found",
  message = "The page you're looking for doesn't exist or has been moved.",
  image = "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
  backButtonLabel = "Go Back",
  homeButtonLabel = "Back to Home",
  type = "default"
}) => {
  const location = useLocation();

  // Log the 404 error
  React.useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Get suggestions based on the type of 404
  const getSuggestions = () => {
    switch (type) {
      case "hotel":
        return (
          <div className="mt-8 p-4 bg-white/80 backdrop-blur-sm rounded-lg">
            <h3 className="font-medium mb-2">Looking for a place to stay?</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><Link to="/hotels" className="text-primary hover:underline">Browse all hotels</Link></li>
              <li><Link to="/destinations" className="text-primary hover:underline">Explore destinations</Link></li>
              <li><Link to="/hotels?featured=true" className="text-primary hover:underline">View featured hotels</Link></li>
            </ul>
          </div>
        );
      
      case "destination":
        return (
          <div className="mt-8 p-4 bg-white/80 backdrop-blur-sm rounded-lg">
            <h3 className="font-medium mb-2">Explore Mount Abu</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><Link to="/destinations" className="text-primary hover:underline">All destinations</Link></li>
              <li><Link to="/adventures" className="text-primary hover:underline">Adventure activities</Link></li>
              <li><Link to="/travel-guide" className="text-primary hover:underline">Travel guide</Link></li>
            </ul>
          </div>
        );
      
      case "adventure":
        return (
          <div className="mt-8 p-4 bg-white/80 backdrop-blur-sm rounded-lg">
            <h3 className="font-medium mb-2">Looking for activities?</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><Link to="/adventures" className="text-primary hover:underline">All adventures</Link></li>
              <li><Link to="/rentals/car" className="text-primary hover:underline">Car rentals</Link></li>
              <li><Link to="/rentals/bike" className="text-primary hover:underline">Bike rentals</Link></li>
            </ul>
          </div>
        );
      
      case "booking":
        return (
          <div className="mt-8 p-4 bg-white/80 backdrop-blur-sm rounded-lg">
            <h3 className="font-medium mb-2">Manage your bookings</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><Link to="/profile" className="text-primary hover:underline">Go to your profile</Link></li>
              <li><Link to="/hotels" className="text-primary hover:underline">Browse hotels</Link></li>
              <li><Link to="/contact" className="text-primary hover:underline">Contact support</Link></li>
            </ul>
          </div>
        );
      
      default:
        return (
          <div className="mt-8 p-4 bg-white/80 backdrop-blur-sm rounded-lg">
            <h3 className="font-medium mb-2">You might be looking for</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li><Link to="/hotels" className="text-primary hover:underline">Hotels</Link></li>
              <li><Link to="/destinations" className="text-primary hover:underline">Destinations</Link></li>
              <li><Link to="/adventures" className="text-primary hover:underline">Adventures</Link></li>
              <li><Link to="/contact" className="text-primary hover:underline">Contact us</Link></li>
            </ul>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background overflow-hidden relative">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-10" />
        <img
          src={image}
          alt="Mount Abu landscape"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center p-8 glass-panel rounded-2xl shadow-lg max-w-md mx-auto animate-fade-in">
        <h1 className="text-6xl md:text-7xl text-primary font-bold mb-2">404</h1>
        <h2 className="text-xl md:text-2xl text-foreground mb-4 font-semibold">{title}</h2>
        <p className="text-white/90 mb-8">
          {message}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="default"
            className="flex items-center justify-center gap-2"
            asChild
          >
            <Link to="/">
              <Home size={18} />
              {homeButtonLabel}
            </Link>
          </Button>
          <Button
            variant="outline"
            className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white border-white/30"
            onClick={() => window.history.back()}
          >
            <ArrowLeft size={18} />
            {backButtonLabel}
          </Button>
        </div>
        
        {getSuggestions()}
        
        <div className="mt-6 text-xs text-white/60 flex items-center justify-center gap-1">
          <CornerDownLeft size={12} />
          <span>Return to the previous page or browse suggested links</span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;


import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import NotFoundComponent from "@/components/NotFound";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  // Determine the type of 404 based on the URL
  const getNotFoundType = () => {
    const path = location.pathname.toLowerCase();
    
    if (path.includes('/hotel/')) {
      return "hotel";
    } else if (path.includes('/destination/')) {
      return "destination";
    } else if (path.includes('/adventure/')) {
      return "adventure";
    } else if (path.includes('/booking/')) {
      return "booking";
    }
    
    return "default";
  };

  return (
    <NotFoundComponent 
      type={getNotFoundType()}
      image="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3"
    />
  );
};

export default NotFound;

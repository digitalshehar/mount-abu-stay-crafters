
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import NotFoundComponent from "@/components/NotFound";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Set document title
    document.title = "Page Not Found | Mount Abu";
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

  const getNotFoundImage = () => {
    const type = getNotFoundType();
    
    switch (type) {
      case "hotel":
        return "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3";
      case "destination":
        return "https://images.unsplash.com/photo-1455587734955-081b22074882?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3";
      case "adventure":
        return "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3";
      case "booking":
        return "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3";
      default:
        return "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3";
    }
  };

  return (
    <>
      <SEO 
        title="Page Not Found | Mount Abu" 
        description="Sorry, the page you're looking for cannot be found. Please check the URL or navigate back to continue exploring Mount Abu."
      />
      <NotFoundComponent 
        type={getNotFoundType()}
        image={getNotFoundImage()}
      />
    </>
  );
};

export default NotFound;

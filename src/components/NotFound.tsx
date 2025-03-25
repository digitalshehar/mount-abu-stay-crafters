
import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

interface NotFoundProps {
  title?: string;
  message?: string;
  type?: "default" | "hotel" | "destination" | "adventure" | "booking";
  image?: string;
  backButtonLabel?: string;
  homeButtonLabel?: string;
  showHeader?: boolean;
  showFooter?: boolean;
}

const NotFound = ({
  title = "Page Not Found",
  message = "The page you're looking for doesn't exist or has been removed.",
  type = "default",
  image = "https://images.unsplash.com/photo-1545972154-9bb223aac798?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
  backButtonLabel = "Go Back",
  homeButtonLabel = "Go to Homepage",
  showHeader = true,
  showFooter = true
}: NotFoundProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Generate appropriate back link based on type
  const getBackLink = () => {
    switch (type) {
      case "hotel":
        return "/hotels";
      case "destination":
        return "/destinations";
      case "adventure":
        return "/adventures";
      case "booking":
        return "/bookings";
      default:
        return -1; // Go back in history
    }
  };
  
  // Generate appropriate home link based on type
  const getHomeLink = () => {
    switch (type) {
      case "hotel":
        return "/hotels";
      case "destination":
        return "/destinations";
      case "adventure":
        return "/adventures";
      case "booking":
        return "/bookings";
      default:
        return "/";
    }
  };

  const handleBackClick = () => {
    const backLink = getBackLink();
    if (backLink === -1) {
      navigate(-1);
    } else {
      navigate(backLink);
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col w-full">
      {showHeader && <Header />}
      
      <div className="flex-1 flex items-center justify-center py-12 sm:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="order-2 lg:order-1">
              <div className="max-w-lg">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
                  {title}
                </h1>
                <p className="text-stone-600 text-lg mb-8">
                  {message}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleBackClick}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-stone-300 text-stone-800 font-medium rounded-lg hover:bg-stone-100 transition-colors"
                  >
                    <ArrowLeft className="h-5 w-5" />
                    <span>{backButtonLabel}</span>
                  </button>
                  <Link
                    to={getHomeLink()}
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-medium rounded-lg shadow hover:bg-primary/90 transition-colors"
                  >
                    <Home className="h-5 w-5" />
                    <span>{homeButtonLabel}</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden shadow-lg max-h-[500px]">
                <img
                  src={image}
                  alt="Not Found"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {showFooter && <Footer />}
    </div>
  );
};

export default NotFound;


import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft, Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background overflow-hidden relative">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/20 z-10" />
        <img
          src="https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3"
          alt="Mount Abu landscape"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center p-8 glass-panel rounded-2xl shadow-lg max-w-md mx-auto animate-fade-in">
        <h1 className="title-large text-primary mb-2">404</h1>
        <h2 className="title-small text-foreground mb-4">Page Not Found</h2>
        <p className="subtitle mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="flex items-center justify-center gap-2 bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Home size={18} />
            Back to Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 bg-secondary text-foreground py-3 px-6 rounded-lg hover:bg-secondary/80 transition-colors"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

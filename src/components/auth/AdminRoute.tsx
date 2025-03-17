
import React, { ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AdminRouteProps {
  children?: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isLoading, isAdmin, user } = useAuth();
  const location = useLocation();

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50 dark:bg-stone-900 transition-colors duration-300">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <p className="text-stone-600 dark:text-stone-300 font-medium">Verifying admin access...</p>
      </div>
    );
  }

  // If not logged in, redirect to admin login page
  if (!user) {
    return <Navigate to="/auth?admin=true" replace state={{ from: location }} />;
  }

  // If logged in but not admin, show access denied
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50 dark:bg-stone-900 transition-colors duration-300">
        <div className="bg-white dark:bg-stone-800 p-8 rounded-xl shadow-md dark:shadow-stone-900/30 max-w-md w-full text-center transition-colors duration-300">
          <div className="mx-auto h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-4">
            <ShieldAlert className="h-8 w-8 text-red-600 dark:text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-500 mb-4">Access Denied</h2>
          <p className="text-stone-600 dark:text-stone-300 mb-6">
            You don't have admin privileges to access this page. Please contact the system administrator if you believe this is an error.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              variant="default"
              onClick={() => window.location.href = "/"}
            >
              Return to Home
            </Button>
            <Button 
              variant="outline" 
              onClick={() => window.location.href = "/auth?admin=true"}
            >
              Login as Admin
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // If admin, render children or outlet
  return children ? <>{children}</> : <Outlet />;
};

export default AdminRoute;

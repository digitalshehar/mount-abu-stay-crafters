
import React, { ReactNode } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

interface AdminRouteProps {
  children?: ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isLoading, isAdmin, user } = useAuth();
  const location = useLocation();

  // Show a better loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50">
        <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
        <p className="text-stone-600 font-medium">Verifying admin access...</p>
      </div>
    );
  }

  // If not logged in, redirect to admin login page
  if (!user) {
    return <Navigate to="/auth?admin=true" replace state={{ from: location }} />;
  }

  // If logged in but not admin, redirect to home page
  if (!isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Access Denied</h2>
          <p className="text-stone-600 mb-6">
            You don't have admin privileges to access this page.
          </p>
          <div className="flex justify-center">
            <a 
              href="/" 
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary/90 transition-colors"
            >
              Return to Home
            </a>
          </div>
        </div>
      </div>
    );
  }

  // If admin, render children or outlet
  return children ? <>{children}</> : <Outlet />;
};

export default AdminRoute;

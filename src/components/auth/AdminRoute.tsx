
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import React from 'react';
import { useAuth } from '@/context/AuthContext';

const AdminRoute = () => {
  const { user, isLoading, isAdmin } = useAuth();
  const location = useLocation();

  if (isLoading) {
    // You could show a loading spinner here
    return <div>Loading...</div>;
  }

  if (!user || !isAdmin) {
    // Redirect to login page if not authenticated or not an admin
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  // If authenticated and admin, render the child routes
  return <Outlet />;
};

export default AdminRoute;

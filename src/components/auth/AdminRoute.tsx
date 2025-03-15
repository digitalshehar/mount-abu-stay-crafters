
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2, ShieldAlert } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const AdminRoute: React.FC = () => {
  const { isLoading, isAdmin, user } = useAuth();
  const location = useLocation();

  // Show a better loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50 dark:bg-stone-900 transition-colors duration-300">
        <Card className="w-full max-w-md p-6 shadow-lg">
          <CardHeader className="text-center">
            <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
            <CardTitle>Verifying access</CardTitle>
            <CardDescription>Please wait while we verify your admin credentials</CardDescription>
          </CardHeader>
        </Card>
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
        <Card className="w-full max-w-md shadow-lg">
          <CardHeader className="text-center">
            <ShieldAlert className="h-12 w-12 text-red-500 mx-auto mb-2" />
            <CardTitle className="text-2xl font-bold text-red-600 dark:text-red-500">Access Denied</CardTitle>
            <CardDescription>
              You don't have administrator privileges to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-stone-600 dark:text-stone-300 text-center">
              Please contact your system administrator if you believe this is a mistake.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button asChild variant="default">
              <a href="/">Return to Home</a>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // If admin, render the outlet
  return <Outlet />;
};

export default AdminRoute;

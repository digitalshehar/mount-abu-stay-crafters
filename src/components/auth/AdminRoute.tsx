
import React, { useState, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loader2, ShieldAlert, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AdminRoute: React.FC = () => {
  const { isLoading, isAdmin, user } = useAuth();
  const location = useLocation();
  const [retryCount, setRetryCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  // Retry checking admin status if needed
  useEffect(() => {
    if (error && retryCount < 3) {
      const timer = setTimeout(() => {
        setRetryCount(prev => prev + 1);
        setError(null);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [error, retryCount]);

  // Show a better loading state
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-stone-50 dark:bg-stone-900 transition-colors duration-300">
        <Card className="w-full max-w-md p-6 shadow-lg">
          <CardHeader className="text-center">
            <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
            <CardTitle>Verifying admin access</CardTitle>
            <CardDescription>Please wait while we verify your admin credentials</CardDescription>
          </CardHeader>
          
          {retryCount > 0 && (
            <CardContent>
              <Alert variant="default" className="mt-4 bg-amber-50 text-amber-800 border-amber-200">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Verification taking longer than expected</AlertTitle>
                <AlertDescription>
                  Retry attempt {retryCount} of 3. Please continue waiting...
                </AlertDescription>
              </Alert>
            </CardContent>
          )}
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
            
            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
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

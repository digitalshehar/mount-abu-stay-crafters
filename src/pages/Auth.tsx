
import React, { useEffect, useState } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, ShieldCheck, User, AlertTriangle } from 'lucide-react';
import Logo from '@/components/Logo';
import { supabase } from '@/integrations/supabase/client';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

const Auth = () => {
  const { signIn, signUp, loading, user } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isAdmin = searchParams.get('admin') === 'true';
  const returnUrl = searchParams.get('returnUrl') || '/';
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      // Check if user is admin and admin page is requested
      if (isAdmin) {
        checkIsAdmin(user.id).then(isAdmin => {
          if (isAdmin) {
            navigate('/admin/dashboard');
          } else {
            navigate(returnUrl !== '/admin' ? returnUrl : '/');
          }
        });
      } else {
        navigate(returnUrl);
      }
    }
  }, [user, navigate, isAdmin, returnUrl]);

  // Check if user has admin role
  const checkIsAdmin = async (userId: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', userId)
        .eq('role', 'admin')
        .single();
      
      if (error) {
        console.error("Error checking admin role:", error);
        return false;
      }
      
      return !!data;
    } catch (error) {
      console.error("Error in checkIsAdmin:", error);
      return false;
    }
  };

  // Handle sign in with error handling
  const handleSignIn = async (formData: any) => {
    setAuthError(null);
    try {
      const result = await signIn(formData);
      if (result?.error) {
        setAuthError(result.error.message);
      }
    } catch (error: any) {
      setAuthError(error.message || "An error occurred during sign in");
    }
  };

  // Handle sign up with error handling
  const handleSignUp = async (formData: any) => {
    setAuthError(null);
    try {
      const result = await signUp(formData);
      if (result?.error) {
        setAuthError(result.error.message);
      }
    } catch (error: any) {
      setAuthError(error.message || "An error occurred during sign up");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto max-w-md py-12 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-lg font-medium text-stone-700">Checking authentication status...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-md py-12">
      <div className="flex justify-center mb-8">
        <Link to="/" className="flex items-center space-x-2">
          <Logo />
          <span className="text-xl font-bold">Hotel Mount Abu</span>
        </Link>
      </div>
      
      {authError && (
        <Alert variant="destructive" className="mb-6">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Authentication Error</AlertTitle>
          <AlertDescription>{authError}</AlertDescription>
        </Alert>
      )}
      
      {isAdmin ? (
        <Card className="border-primary/20 shadow-lg">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-2">
              <ShieldCheck className="h-12 w-12 text-primary" />
            </div>
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Enter your administrator credentials to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <LoginForm 
              onSubmit={handleSignIn} 
              loading={loading} 
              isAdmin={true}
            />
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <Link to="/auth" className="text-sm text-primary hover:underline">
              Back to regular login
            </Link>
          </CardFooter>
        </Card>
      ) : (
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login" className="text-base py-3">
              <User className="mr-2 h-4 w-4" />
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="text-base py-3">
              <User className="mr-2 h-4 w-4" />
              Sign Up
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="login" className="animate-fade-in">
            <Card className="shadow-md">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Welcome back</CardTitle>
                <CardDescription className="text-center">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <LoginForm 
                  onSubmit={handleSignIn} 
                  loading={loading}
                />
                <div className="mt-4 text-center">
                  <Link to="/auth?admin=true" className="text-sm text-primary hover:underline">
                    Admin Login
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup" className="animate-fade-in">
            <Card className="shadow-md">
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl text-center">Create an account</CardTitle>
                <CardDescription className="text-center">
                  Sign up to save favorites and book faster
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SignupForm 
                  onSubmit={handleSignUp} 
                  loading={loading}
                />
              </CardContent>
              <CardFooter className="text-sm text-muted-foreground text-center flex-col space-y-2 border-t pt-6">
                <p>
                  By creating an account, you agree to our{" "}
                  <Link to="/terms" className="underline underline-offset-4 hover:text-primary">
                    Terms of Service
                  </Link>
                  {" "}and{" "}
                  <Link to="/privacy" className="underline underline-offset-4 hover:text-primary">
                    Privacy Policy
                  </Link>.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Auth;

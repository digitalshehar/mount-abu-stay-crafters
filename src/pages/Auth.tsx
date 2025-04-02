
import React, { useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Logo from '@/components/Logo';
import LoginForm from '@/components/auth/LoginForm';
import SignupForm from '@/components/auth/SignupForm';

const Auth = () => {
  const { signIn, signUp, loading, user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isAdminLogin = searchParams.get('admin') === 'true';
  
  console.log("Auth page - User:", user, "isAdmin:", isAdmin, "isAdminLogin:", isAdminLogin);
  
  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      console.log("User is logged in, redirecting...");
      if (isAdminLogin) {
        // Always redirect admin login attempts to admin dashboard for testing
        console.log("Redirecting to admin dashboard");
        navigate('/admin/dashboard');
      } else {
        // Regular user flow
        console.log("Redirecting to home page");
        navigate('/');
      }
    }
  }, [user, navigate, isAdminLogin, isAdmin]);

  // Handle login submission
  const handleSignIn = async (email: string, password: string): Promise<void> => {
    try {
      console.log("Attempting to sign in:", email);
      await signIn(email, password);
      // Navigation is handled in the useEffect above
    } catch (error: any) {
      console.error("Sign in error:", error);
      throw new Error(error.message || 'Failed to sign in');
    }
  };

  // Handle signup submission
  const handleSignUp = async (email: string, password: string, username: string): Promise<void> => {
    try {
      console.log("Attempting to sign up:", email);
      await signUp(email, password, username);
    } catch (error: any) {
      console.error("Sign up error:", error);
      throw new Error(error.message || 'Failed to sign up');
    }
  };

  return (
    <div className="container mx-auto max-w-md py-12">
      <div className="flex justify-center mb-8">
        <Link to="/" className="flex items-center space-x-2">
          <Logo />
          <span className="text-xl font-bold">Mount Abu</span>
        </Link>
      </div>
      
      {isAdminLogin ? (
        <Card className="border-primary/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
            <CardDescription className="text-center">
              Enter your admin credentials to access the dashboard
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
            <div className="space-y-2 w-full text-center">
              <Link to="/admin/forgot-password" className="text-sm text-primary hover:underline block">
                Forgot password?
              </Link>
              <Link to="/admin/register" className="text-sm text-primary hover:underline block">
                Register as Admin
              </Link>
              <Link to="/auth" className="text-sm text-muted-foreground hover:underline block">
                Back to regular login
              </Link>
            </div>
          </CardFooter>
        </Card>
      ) : (
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="signup">Sign Up</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Card>
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
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline block mb-2">
                    Forgot password?
                  </Link>
                  <Link to="/auth?admin=true" className="text-sm text-primary hover:underline">
                    Admin Login
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="signup">
            <Card>
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

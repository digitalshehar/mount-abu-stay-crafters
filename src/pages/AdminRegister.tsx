
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, ArrowLeft } from 'lucide-react';
import Logo from '@/components/Logo';
import { useToast } from '@/hooks/use-toast';

const AdminRegister = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminCode, setAdminCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // The admin code is fixed for demonstration purposes
  // In a production environment, you would use a more secure approach
  const ADMIN_CODE = 'mountabu2024';
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Form validation
    if (!email || !password || !confirmPassword || !adminCode) {
      setError('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    
    // Verify admin code
    if (adminCode !== ADMIN_CODE) {
      setError('Invalid admin registration code');
      return;
    }
    
    setLoading(true);
    
    try {
      // First create the user account
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: email.split('@')[0],
          },
        },
      });
      
      if (authError) throw authError;
      
      if (authData.user) {
        // Wait a moment for the auth user to be fully created
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        try {
          // Insert admin role immediately after signup
          const { error: roleError } = await supabase
            .from('user_roles')
            .insert({ 
              user_id: authData.user.id, 
              role: 'admin' 
            });
          
          if (roleError) {
            console.error("Role assignment error:", roleError);
            throw roleError;
          }
          
          // Note: Don't manually insert into profiles table - let the trigger handle it
          // The trigger created by Supabase will automatically create the profile
          
          toast({
            title: "Admin registration successful",
            description: "You can now login with your admin credentials.",
            variant: "default",
          });
          
          // Redirect to admin login
          navigate('/auth?admin=true');
        } catch (roleError: any) {
          console.error("Role assignment error:", roleError);
          setError(roleError.message || 'Failed to assign admin role');
        }
      }
    } catch (error: any) {
      console.error("Signup error:", error);
      setError(error.message || 'An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto max-w-md py-12">
      <div className="flex justify-center mb-8">
        <Link to="/" className="flex items-center space-x-2">
          <Logo />
          <span className="text-xl font-bold">Mount Abu - Admin</span>
        </Link>
      </div>
      
      <Card className="border-primary/20">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl text-center">Admin Registration</CardTitle>
          <CardDescription className="text-center">
            Create a new admin account with proper credentials
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input 
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-code">Admin Registration Code</Label>
              <Input 
                id="admin-code"
                type="password"
                placeholder="Enter admin code"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Contact your system administrator for the registration code
              </p>
            </div>
            {error && (
              <div className="text-sm text-red-500">{error}</div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Registering...
                </>
              ) : (
                'Register as Admin'
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Link to="/auth?admin=true" className="flex items-center text-sm text-primary hover:underline">
            <ArrowLeft className="mr-1 h-4 w-4" /> Back to admin login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminRegister;

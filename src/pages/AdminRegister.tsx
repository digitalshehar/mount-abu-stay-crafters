
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Removed admin code requirement for testing purposes
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password || !confirmPassword) {
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
    
    setLoading(true);
    
    try {
      // Create the user with Supabase auth and admin metadata
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: email.split('@')[0],
            is_admin: true,
          },
        },
      });
      
      if (signUpError) throw signUpError;
      
      if (data.user) {
        // Insert the admin role in the user_roles table
        const { error: roleError } = await supabase
          .from('user_roles')
          .insert({ 
            user_id: data.user.id, 
            role: 'admin' 
          });
        
        if (roleError) {
          console.error("Error setting admin role:", roleError);
        }
        
        toast({
          title: "Admin registration successful",
          description: "You can now login with your admin credentials.",
          variant: "default",
        });
        
        navigate('/auth?admin=true');
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
            Create a new admin account
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

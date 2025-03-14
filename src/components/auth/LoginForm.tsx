
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  loading: boolean;
  isAdmin?: boolean;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, loading, isAdmin = false }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    try {
      await onSubmit(email, password);
    } catch (error: any) {
      setError(error.message || 'An error occurred during login');
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input 
          id="email"
          type="email"
          placeholder={isAdmin ? "admin@example.com" : "your@email.com"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link to="/forgot-password" className="text-sm text-primary hover:underline">
            Forgot password?
          </Link>
        </div>
        <Input 
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && (
        <div className="text-sm text-red-500">{error}</div>
      )}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {isAdmin ? 'Logging in to Admin...' : 'Logging in...'}
          </>
        ) : (
          isAdmin ? 'Login to Admin' : 'Login'
        )}
      </Button>
    </form>
  );
};

export default LoginForm;

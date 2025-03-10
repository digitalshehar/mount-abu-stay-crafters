
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';
import { useProfile } from '@/hooks/useProfile';

export const useAuthentication = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  // Initialize navigate as null/undefined initially
  // We'll only use it when it's available (inside Router context)
  const navigate = typeof window !== 'undefined' ? useNavigate() : undefined;
  const { profile, setProfile, fetchProfile, updateProfile } = useProfile(user);

  const signUp = async (email: string, password: string, username: string): Promise<void> => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Please check your email for a confirmation link.",
      });
    } catch (error: any) {
      toast({
        title: "Error signing up",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Check if user is admin
      const isAdmin = email.includes('admin') || email === 'admin@mountabu.com';

      toast({
        title: "Welcome back!",
        description: isAdmin 
          ? "You have successfully signed in to the admin dashboard." 
          : "You have successfully signed in.",
      });

      // Note: navigation is not performed here as it's handled in the Auth component
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      
      // Only navigate if the function is available (in Router context)
      if (navigate) {
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const initializeAuth = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      setSession(sessionData.session);
      setUser(sessionData.session?.user ?? null);
      
      if (sessionData.session?.user) {
        await fetchProfile(sessionData.session.user.id);
      }
    } catch (error) {
      console.error("Error getting initial session:", error);
    } finally {
      setLoading(false);
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  };

  return {
    session,
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    initializeAuth,
  };
};

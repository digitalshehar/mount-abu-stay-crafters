
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
  const navigate = useNavigate();
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
      
      console.log("Sign up successful:", data);

      toast({
        title: "Success!",
        description: "Account created successfully. You can now log in.",
      });
    } catch (error: any) {
      console.error("SignUp error:", error);
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
      console.log("Signing in with:", email);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error("Sign in error:", error);
        throw error;
      }

      console.log("Sign in successful:", data);
      
      // If login was successful, set user and session
      if (data && data.user) {
        setUser(data.user);
        setSession(data.session);
        
        // Check if user is admin based on metadata or other criteria
        const isAdmin = data.user.user_metadata?.is_admin === true;
        
        console.log("User is admin:", isAdmin);

        toast({
          title: "Welcome back!",
          description: isAdmin 
            ? "You have successfully signed in to the admin dashboard." 
            : "You have successfully signed in.",
        });
      }
    } catch (error: any) {
      console.error("Error in signIn function:", error);
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

      // Clear user state
      setUser(null);
      setSession(null);
      setProfile(null);

      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      
      navigate('/');
    } catch (error: any) {
      console.error("Sign out error:", error);
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
    console.log("Initializing auth...");
    try {
      // First set up auth state listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
        console.log("Auth state changed:", event, "Session:", !!session);
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          fetchProfile(session.user.id);
        } else {
          setProfile(null);
        }
        setLoading(false);
      });

      // Then check for existing session
      const { data: sessionData } = await supabase.auth.getSession();
      console.log("Got existing session:", !!sessionData.session);
      setSession(sessionData.session);
      setUser(sessionData.session?.user ?? null);
      
      if (sessionData.session?.user) {
        await fetchProfile(sessionData.session.user.id);
      }
      setLoading(false);

      return () => {
        subscription.unsubscribe();
      };
    } catch (error) {
      console.error("Error getting initial session:", error);
      setLoading(false);
      return () => {};
    }
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

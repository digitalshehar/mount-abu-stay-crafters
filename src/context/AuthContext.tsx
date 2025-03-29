
import React, { createContext, useContext, useEffect, ReactNode, useState } from 'react';
import { useAuthentication } from '@/hooks/useAuthentication';
import { AuthContextType, UserProfile } from '@/types/auth';
import { supabase } from '@/integrations/supabase/client';

// Create context with undefined initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Export the Provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    session,
    user,
    profile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    initializeAuth
  } = useAuthentication();
  
  // Check if the user is admin
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check admin status when user changes
  useEffect(() => {
    const checkAdminStatus = async () => {
      setIsLoading(true);
      
      if (!user) {
        setIsAdmin(false);
        setIsLoading(false);
        return;
      }
      
      try {
        // First, check if user has admin role in metadata
        const isAdminInMetadata = user.user_metadata?.is_admin === true;
        
        // Then check if user has an admin role in user_roles table
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle(); // Use maybeSingle instead of single to avoid errors
        
        // Set admin status if either check passes
        setIsAdmin(isAdminInMetadata || !!data);
      } catch (error) {
        console.error("Error in checkAdminStatus:", error);
        setIsAdmin(false);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAdminStatus();
  }, [user]);

  useEffect(() => {
    // Initialize authentication - properly handle async function
    const init = async () => {
      const cleanup = await initializeAuth();
      return cleanup;
    };
    
    let cleanupFn: (() => void) | undefined;
    
    init().then(cleanup => {
      cleanupFn = cleanup;
    }).catch(error => {
      console.error("Failed to initialize auth:", error);
    });
    
    // Return cleanup function
    return () => {
      if (cleanupFn) cleanupFn();
    };
  }, []);

  // Create the context value object
  const value: AuthContextType = {
    session,
    user,
    profile,
    loading: loading || isLoading, // Consider both loading states
    isLoading: loading || isLoading, // Alias for compatibility
    isAdmin,
    signUp,
    signIn,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Export the hook for consuming the context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Re-export UserProfile type
export type { UserProfile };

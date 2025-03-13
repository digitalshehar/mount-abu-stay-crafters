
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
  
  // Check admin status when user changes
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        return;
      }
      
      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .single();
        
        if (error) {
          console.error("Error checking admin role:", error);
          setIsAdmin(false);
          return;
        }
        
        setIsAdmin(!!data);
      } catch (error) {
        console.error("Error in checkAdminStatus:", error);
        setIsAdmin(false);
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
    loading,
    isLoading: loading, // Alias for compatibility
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

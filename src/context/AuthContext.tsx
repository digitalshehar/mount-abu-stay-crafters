
import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { useAuthentication } from '@/hooks/useAuthentication';
import { AuthContextType, UserProfile } from '@/types/auth';

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

  useEffect(() => {
    // Initialize authentication
    const cleanup = initializeAuth();
    return cleanup;
  }, []);

  // Create the context value object
  const value: AuthContextType = {
    session,
    user,
    profile,
    loading,
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

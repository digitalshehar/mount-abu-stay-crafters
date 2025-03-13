
import { Session, User } from '@supabase/supabase-js';

export type UserProfile = {
  id: string;
  username?: string;
  full_name?: string;
  avatar_url?: string;
  created_at?: string;
};

export type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: UserProfile | null;
  loading: boolean;
  isLoading: boolean; // Added for AdminRoute and ProtectedRoute
  isAdmin: boolean; // Added for AdminRoute
  signUp: (email: string, password: string, username: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: { username?: string; full_name?: string; avatar_url?: string }) => Promise<void>;
};

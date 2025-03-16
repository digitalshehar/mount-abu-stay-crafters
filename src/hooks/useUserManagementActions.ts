
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useUserManagement } from '@/hooks/useUserManagement';

export interface User {
  id: string;
  email: string;
  role?: string;
  created_at?: string;
  last_sign_in_at?: string;
  user_metadata?: {
    name?: string;
  };
}

export interface NewUserData {
  email: string;
  password: string;
  role: string;
}

export const useUserManagementActions = (userId?: string) => {
  const { users, canManageRoles, fetchUsers } = useUserManagement(userId);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<string | null>(null);
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  const [newUserData, setNewUserData] = useState<NewUserData>({
    email: '',
    password: '',
    role: 'user'
  });
  const { toast } = useToast();

  // Handle role change
  const handleRoleChange = async (userId: string, newRole: string) => {
    if (!canManageRoles) {
      toast({
        title: 'Permission Denied',
        description: 'You do not have permission to change user roles.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('user_roles')
        .upsert({ user_id: userId, role: newRole });

      if (error) throw error;

      toast({
        title: 'Role Updated',
        description: 'User role has been updated successfully.',
      });

      // Refresh user list
      fetchUsers();
    } catch (error) {
      console.error('Error updating role:', error);
      toast({
        title: 'Update Failed',
        description: 'Failed to update user role. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Handle user deletion confirmation
  const confirmDeleteUser = (userId: string) => {
    setUserToDelete(userId);
    setIsConfirmDialogOpen(true);
  };

  // Handle user deletion
  const handleDeleteUser = async () => {
    if (!userToDelete) return;

    try {
      // Delete user role
      await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userToDelete);

      // Delete user
      const { error } = await supabase.auth.admin.deleteUser(userToDelete);

      if (error) throw error;

      toast({
        title: 'User Deleted',
        description: 'User has been deleted successfully.',
      });

      // Close dialog and refresh users
      setIsConfirmDialogOpen(false);
      setUserToDelete(null);
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast({
        title: 'Deletion Failed',
        description: 'Failed to delete user. Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Handle adding a new user
  const handleAddUser = async () => {
    try {
      // Validate input
      if (!newUserData.email || !newUserData.password) {
        toast({
          title: 'Invalid Input',
          description: 'Please provide both email and password.',
          variant: 'destructive',
        });
        return;
      }

      // Create user
      const { data, error } = await supabase.auth.admin.createUser({
        email: newUserData.email,
        password: newUserData.password,
        email_confirm: true
      });

      if (error) throw error;

      // Set user role
      if (data.user) {
        await supabase
          .from('user_roles')
          .insert({ user_id: data.user.id, role: newUserData.role });
      }

      toast({
        title: 'User Created',
        description: 'New user has been created successfully.',
      });

      // Reset form and close dialog
      setNewUserData({ email: '', password: '', role: 'user' });
      setIsAddUserDialogOpen(false);
      fetchUsers();
    } catch (error) {
      console.error('Error creating user:', error);
      toast({
        title: 'User Creation Failed',
        description: 'Failed to create new user. Please try again.',
        variant: 'destructive',
      });
    }
  };

  return {
    users,
    filteredUsers,
    setFilteredUsers,
    searchQuery,
    setSearchQuery,
    editingUser,
    setEditingUser,
    isConfirmDialogOpen,
    setIsConfirmDialogOpen,
    userToDelete,
    isAddUserDialogOpen,
    setIsAddUserDialogOpen,
    newUserData,
    setNewUserData,
    canManageRoles,
    handleRoleChange,
    confirmDeleteUser,
    handleDeleteUser,
    handleAddUser,
    fetchUsers
  };
};

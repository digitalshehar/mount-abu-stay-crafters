
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { checkPermission } from "@/services/hotelManagement/userPermissionsService";

interface User {
  id: string;
  email: string;
  role?: string;
}

export const useUserManagement = (userId?: string) => {
  const [users, setUsers] = useState<User[]>([]);
  const [canManageRoles, setCanManageRoles] = useState(false);

  useEffect(() => {
    if (userId) {
      checkUserPermissions(userId);
      fetchUsers();
    }
  }, [userId]);

  const checkUserPermissions = async (userId: string) => {
    try {
      const hasPermission = await checkPermission(userId, 'hotels', 'update');
      setCanManageRoles(hasPermission);
    } catch (error) {
      console.error("Error checking permissions:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      // Get auth users
      const { data: authUsers, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        console.error("Error fetching auth users:", authError);
        return;
      }
      
      // Get user roles
      const { data: userRoles, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');
      
      if (rolesError) {
        console.error("Error fetching user roles:", rolesError);
      }
      
      // Map roles to users
      const rolesMap = (userRoles || []).reduce((acc: Record<string, string>, curr: any) => {
        acc[curr.user_id] = curr.role;
        return acc;
      }, {});
      
      // Map users with their roles
      const mappedUsers = authUsers?.users.map(user => ({
        id: user.id,
        email: user.email || '',
        role: rolesMap[user.id]
      })) || [];
      
      setUsers(mappedUsers);
    } catch (error) {
      console.error("Error in fetchUsers:", error);
    }
  };

  return {
    users,
    canManageRoles,
    fetchUsers
  };
};

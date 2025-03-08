
import { supabase } from "@/integrations/supabase/client";
import { UserRole, Permission, defaultUserRoles } from "@/components/admin/hotels/types";

export const getUserRole = async (userId: string): Promise<UserRole> => {
  // Get the user's role from the database
  const { data, error } = await supabase
    .from('user_roles')
    .select('role')
    .eq('user_id', userId)
    .single();
    
  if (error) {
    // If no role is assigned, default to viewer
    return defaultUserRoles.find(role => role.id === 'viewer') as UserRole;
  }
  
  // Find the role in the predefined roles
  const userRole = defaultUserRoles.find(role => role.id === data.role);
  return userRole || (defaultUserRoles.find(role => role.id === 'viewer') as UserRole);
};

export const assignUserRole = async (userId: string, roleId: string) => {
  // Check if user already has a role
  const { data: existingRole } = await supabase
    .from('user_roles')
    .select('*')
    .eq('user_id', userId);
    
  if (existingRole && existingRole.length > 0) {
    // Update existing role
    const { data, error } = await supabase
      .from('user_roles')
      .update({ role: roleId })
      .eq('user_id', userId);
      
    if (error) throw error;
    return data;
  } else {
    // Insert new role
    const { data, error } = await supabase
      .from('user_roles')
      .insert({ user_id: userId, role: roleId });
      
    if (error) throw error;
    return data;
  }
};

export const getAllRoles = () => {
  return defaultUserRoles;
};

export const checkPermission = async (
  userId: string, 
  resource: Permission['resource'], 
  action: Permission['actions'][number]
): Promise<boolean> => {
  const userRole = await getUserRole(userId);
  
  // Find the permission for the specified resource
  const permission = userRole.permissions.find(p => p.resource === resource);
  if (!permission) return false;
  
  // Check if the action is allowed
  return permission.actions.includes(action);
};

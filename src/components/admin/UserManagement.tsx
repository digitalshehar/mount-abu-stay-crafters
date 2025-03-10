
import React, { useState, useEffect } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { 
  Badge, 
  Input, 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui';
import { 
  Shield, 
  UserCog, 
  UserPlus, 
  MoreHorizontal, 
  Search, 
  RefreshCcw, 
  User, 
  Users, 
  ShieldAlert, 
  Pencil, 
  Eye
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { UserRole, defaultUserRoles } from '@/components/admin/hotels/types';
import { motion } from 'framer-motion';

interface UserManagementProps {
  className?: string;
}

interface User {
  id: string;
  email: string;
  role?: string;
  created_at?: string;
  last_sign_in_at?: string;
}

const UserManagement: React.FC<UserManagementProps> = ({ className }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = users.filter(user => 
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.role && user.role.toLowerCase().includes(searchQuery.toLowerCase()))
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      
      // Get users from auth
      const { data: authData, error: authError } = await supabase.auth.admin.listUsers();
      
      if (authError) {
        toast({
          title: 'Error fetching users',
          description: authError.message,
          variant: 'destructive',
        });
        return;
      }
      
      // Get user roles
      const { data: rolesData, error: rolesError } = await supabase
        .from('user_roles')
        .select('*');
      
      if (rolesError) {
        console.error('Error fetching roles:', rolesError);
      }
      
      // Create a map of user ID to role
      const rolesMap: Record<string, string> = {};
      if (rolesData) {
        rolesData.forEach((roleEntry: any) => {
          rolesMap[roleEntry.user_id] = roleEntry.role;
        });
      }
      
      // Merge data
      const mergedUsers = authData?.users.map(user => ({
        id: user.id,
        email: user.email || '',
        role: rolesMap[user.id] || 'viewer', // Default to viewer
        created_at: user.created_at,
        last_sign_in_at: user.last_sign_in_at
      })) || [];
      
      setUsers(mergedUsers);
      setFilteredUsers(mergedUsers);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch users',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleRoleChange = async (userId: string, role: string) => {
    try {
      setEditingUserId(userId);
      
      // Check if user has a role already
      const { data: existingRole, error: checkError } = await supabase
        .from('user_roles')
        .select('*')
        .eq('user_id', userId);
      
      if (checkError) throw checkError;
      
      let result;
      
      if (existingRole && existingRole.length > 0) {
        // Update existing role
        const { data, error } = await supabase
          .from('user_roles')
          .update({ role })
          .eq('user_id', userId)
          .select();
        
        if (error) throw error;
        result = data;
      } else {
        // Insert new role
        const { data, error } = await supabase
          .from('user_roles')
          .insert({ user_id: userId, role })
          .select();
        
        if (error) throw error;
        result = data;
      }
      
      // Update local state
      setUsers(prevUsers => 
        prevUsers.map(user => 
          user.id === userId ? { ...user, role } : user
        )
      );
      
      toast({
        title: 'Role Updated',
        description: `User role has been updated to ${role}`,
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to update role',
        variant: 'destructive',
      });
    } finally {
      setEditingUserId(null);
      setSelectedRole('');
    }
  };
  
  const getRoleBadge = (role?: string) => {
    if (!role) return <Badge variant="outline">No Role</Badge>;
    
    switch (role) {
      case 'admin':
        return (
          <Badge variant="default" className="bg-red-500 flex items-center gap-1">
            <ShieldAlert className="h-3 w-3" />
            Admin
          </Badge>
        );
      case 'editor':
        return (
          <Badge variant="default" className="bg-blue-500 flex items-center gap-1">
            <Pencil className="h-3 w-3" />
            Editor
          </Badge>
        );
      case 'viewer':
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            Viewer
          </Badge>
        );
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };
  
  return (
    <motion.div 
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                User Management
              </CardTitle>
              <CardDescription>
                Manage user accounts and roles
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={fetchUsers}>
                <RefreshCcw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="default" size="sm">
                <UserPlus className="h-4 w-4 mr-2" />
                Invite User
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="search"
                placeholder="Search users by email or role..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="ml-2">
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                  <SelectItem value="viewer">Viewer</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      <div className="flex items-center justify-center">
                        <RefreshCcw className="h-5 w-5 animate-spin mr-2" />
                        <span>Loading users...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8">
                      No users found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user, index) => (
                    <motion.tr 
                      key={user.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b transition-colors hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="bg-primary/10 text-primary w-9 h-9 rounded-full flex items-center justify-center">
                            <User className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-medium">{user.email}</div>
                            <div className="text-xs text-muted-foreground">{user.id.substring(0, 8)}...</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {editingUserId === user.id ? (
                          <Select 
                            value={selectedRole || user.role} 
                            onValueChange={(value) => {
                              setSelectedRole(value);
                              handleRoleChange(user.id, value);
                            }}
                          >
                            <SelectTrigger className="w-[120px]">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              {defaultUserRoles.map(role => (
                                <SelectItem key={role.id} value={role.id}>
                                  {role.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          getRoleBadge(user.role)
                        )}
                      </TableCell>
                      <TableCell>
                        {user.created_at ? format(new Date(user.created_at), 'MMM dd, yyyy') : 'N/A'}
                      </TableCell>
                      <TableCell>
                        {user.last_sign_in_at ? format(new Date(user.last_sign_in_at), 'MMM dd, yyyy') : 'Never'}
                      </TableCell>
                      <TableCell className="text-right">
                        {editingUserId === user.id ? (
                          <Button size="sm" variant="ghost" disabled>
                            <RefreshCcw className="h-4 w-4 animate-spin" />
                          </Button>
                        ) : (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuLabel>Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem onClick={() => setEditingUserId(user.id)}>
                                <UserCog className="h-4 w-4 mr-2" />
                                Change Role
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Shield className="h-4 w-4 mr-2" />
                                View Permissions
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="text-sm text-muted-foreground mt-4">
            Showing {filteredUsers.length} of {users.length} users
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default UserManagement;

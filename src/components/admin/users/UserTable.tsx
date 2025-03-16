
import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Edit, Trash2, Shield, User, Clock, Users } from 'lucide-react';
import { User as UserType } from '@/hooks/useUserManagementActions';

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.3 } }
};

interface UserTableProps {
  filteredUsers: UserType[];
  searchQuery: string;
  canManageRoles: boolean;
  onRoleChange: (userId: string, newRole: string) => Promise<void>;
  onEditUser: (user: UserType) => void;
  onDeleteUser: (userId: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  filteredUsers,
  searchQuery,
  canManageRoles,
  onRoleChange,
  onEditUser,
  onDeleteUser
}) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">User</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created</TableHead>
            <TableHead>Last Sign In</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <motion.tr key={user.id} variants={itemVariants}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center mr-2">
                      <User className="h-4 w-4 text-slate-500" />
                    </div>
                    <div>
                      <p>{user.email}</p>
                      <p className="text-xs text-slate-500">ID: {user.id.substring(0, 8)}...</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {canManageRoles ? (
                    <Select 
                      value={user.role || 'user'} 
                      onValueChange={(value) => onRoleChange(user.id, value)}
                    >
                      <SelectTrigger className="w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="admin">Administrator</SelectItem>
                        <SelectItem value="editor">Editor</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="viewer">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="flex items-center">
                      <Shield className="h-4 w-4 mr-1" />
                      {user.role || 'User'}
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <div className="h-2 w-2 rounded-full bg-green-500 mr-2" />
                    Active
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1 text-slate-400" />
                    {user.created_at ? (
                      format(new Date(user.created_at), 'MMM d, yyyy')
                    ) : (
                      'Unknown'
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {user.last_sign_in_at ? (
                    format(new Date(user.last_sign_in_at), 'MMM d, yyyy')
                  ) : (
                    'Never'
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end">
                    <Button variant="ghost" size="icon" onClick={() => onEditUser(user)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => onDeleteUser(user.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                </TableCell>
              </motion.tr>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                {searchQuery ? (
                  <div className="flex flex-col items-center justify-center">
                    <Users className="h-8 w-8 text-slate-300 mb-2" />
                    <p className="text-slate-500">No users found matching your search criteria</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center">
                    <Users className="h-8 w-8 text-slate-300 mb-2" />
                    <p className="text-slate-500">No users available</p>
                  </div>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserTable;


import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Search, UserPlus, RefreshCcw } from "lucide-react";
import { useUserManagement } from "@/hooks/useUserManagement";
import UserRolePanel from '@/components/admin/hotels/UserRolePanel';
import { useAuth } from "@/context/AuthContext";

const AdminUsers = () => {
  const { user } = useAuth();
  const { users, canManageRoles, fetchUsers } = useUserManagement(user?.id);
  const [isRolePanelOpen, setIsRolePanelOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);

  useEffect(() => {
    // Apply search filter whenever users or search query changes
    if (searchQuery.trim() === '') {
      setFilteredUsers(users);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredUsers(
        users.filter(
          (user) => user.email.toLowerCase().includes(query) || 
          (user.role && user.role.toLowerCase().includes(query))
        )
      );
    }
  }, [users, searchQuery]);

  return (
    <div className="container mx-auto p-6">
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>User Management</CardTitle>
            <CardDescription>
              Manage user accounts and permissions
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => fetchUsers()}
              title="Refresh users"
            >
              <RefreshCcw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Button 
              variant="default" 
              size="sm"
              title="Add new user"
            >
              <UserPlus className="h-4 w-4 mr-2" />
              Add User
            </Button>
            {canManageRoles && (
              <Button 
                onClick={() => setIsRolePanelOpen(true)}
                variant="outline" 
                size="sm"
                title="Manage roles"
              >
                <Shield className="h-4 w-4 mr-2" />
                Manage Roles
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4 relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search users by email or role..." 
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6 text-muted-foreground">
                      {users.length === 0 ? 'No users found.' : 'No matching users found.'}
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.email}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                          {user.role || 'Viewer'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                          Active
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">Edit</Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Role Management Panel */}
      <UserRolePanel 
        isOpen={isRolePanelOpen}
        onClose={() => setIsRolePanelOpen(false)}
        users={users}
        onRoleAssigned={fetchUsers}
      />
    </div>
  );
};

export default AdminUsers;

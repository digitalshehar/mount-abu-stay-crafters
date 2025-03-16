
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useUserManagementActions } from '@/hooks/useUserManagementActions';
import { useUserFilter } from '@/hooks/useUserFilter';
import UserTable from '@/components/admin/users/UserTable';
import AddUserDialog from '@/components/admin/users/AddUserDialog';
import DeleteUserDialog from '@/components/admin/users/DeleteUserDialog';

const UserManagement: React.FC = () => {
  const { user } = useAuth();
  const {
    users,
    editingUser,
    setEditingUser,
    isConfirmDialogOpen,
    setIsConfirmDialogOpen,
    isAddUserDialogOpen,
    setIsAddUserDialogOpen,
    newUserData,
    setNewUserData,
    canManageRoles,
    handleRoleChange,
    confirmDeleteUser,
    handleDeleteUser,
    handleAddUser
  } = useUserManagementActions(user?.id);

  const { filteredUsers, searchQuery, setSearchQuery } = useUserFilter(users);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6"
    >
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-xl font-bold">User Management</CardTitle>
          <Button onClick={() => setIsAddUserDialogOpen(true)}>
            Add User
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center">
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-sm"
              />
            </div>

            <UserTable
              filteredUsers={filteredUsers}
              searchQuery={searchQuery}
              canManageRoles={canManageRoles}
              onRoleChange={handleRoleChange}
              onEditUser={setEditingUser}
              onDeleteUser={confirmDeleteUser}
            />
          </div>
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <DeleteUserDialog
        isOpen={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
        onConfirmDelete={handleDeleteUser}
      />

      {/* Add User Dialog */}
      <AddUserDialog
        isOpen={isAddUserDialogOpen}
        onOpenChange={setIsAddUserDialogOpen}
        userData={newUserData}
        onUserDataChange={setNewUserData}
        onAddUser={handleAddUser}
      />
    </motion.div>
  );
};

export default UserManagement;


import React, { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, CheckCircle } from "lucide-react";
import { assignUserRole, getAllRoles } from "@/services/hotelManagement/userPermissionsService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

interface UserRolePanelProps {
  isOpen: boolean;
  onClose: () => void;
  users: Array<{id: string; email: string; role?: string}>;
  onRoleAssigned: () => void;
}

const UserRolePanel: React.FC<UserRolePanelProps> = ({ isOpen, onClose, users, onRoleAssigned }) => {
  const [updatingUser, setUpdatingUser] = useState<string | null>(null);
  const { toast } = useToast();
  const roles = getAllRoles();

  const handleRoleChange = async (userId: string, newRoleId: string) => {
    try {
      setUpdatingUser(userId);
      await assignUserRole(userId, newRoleId);
      
      toast({
        title: "Role updated",
        description: "User role has been updated successfully",
      });
      
      onRoleAssigned();
    } catch (error) {
      console.error("Error updating role:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user role",
      });
    } finally {
      setUpdatingUser(null);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={open => !open && onClose()}>
      <SheetContent className="w-full md:max-w-xl">
        <SheetHeader>
          <SheetTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2" />
            User Role Management
          </SheetTitle>
        </SheetHeader>
        
        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          <div className="space-y-4">
            {users.length === 0 ? (
              <div className="text-center my-8 text-gray-500">
                No users found.
              </div>
            ) : (
              users.map((user) => (
                <div key={user.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <h4 className="font-medium">{user.email}</h4>
                      <p className="text-sm text-gray-500">{user.id}</p>
                    </div>
                    <div className="flex-1 max-w-[180px]">
                      <Select
                        value={user.role || 'viewer'}
                        onValueChange={(value) => handleRoleChange(user.id, value)}
                        disabled={updatingUser === user.id}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map((role) => (
                            <SelectItem key={role.id} value={role.id}>
                              <div className="flex items-center">
                                {user.role === role.id && <CheckCircle className="h-3 w-3 mr-2 text-green-500" />}
                                {role.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
};

export default UserRolePanel;

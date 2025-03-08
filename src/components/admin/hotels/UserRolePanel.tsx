
import React, { useState, useEffect } from "react";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserRole } from "@/components/admin/hotels/types";
import { getAllRoles, assignUserRole } from "@/services/hotelManagement/userPermissionsService";
import { useToast } from "@/components/ui/use-toast";
import { Shield, User } from "lucide-react";

interface UserRolePanelProps {
  isOpen: boolean;
  onClose: () => void;
  users: Array<{
    id: string;
    email: string;
    role?: string;
  }>;
  onRoleAssigned: () => void;
}

const UserRolePanel = ({ isOpen, onClose, users, onRoleAssigned }: UserRolePanelProps) => {
  const [roles, setRoles] = useState<UserRole[]>([]);
  const [userRoles, setUserRoles] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      loadRoles();
      initializeUserRoles();
    }
  }, [isOpen, users]);

  const loadRoles = () => {
    const availableRoles = getAllRoles();
    setRoles(availableRoles);
  };

  const initializeUserRoles = () => {
    const initialRoles: Record<string, string> = {};
    users.forEach(user => {
      initialRoles[user.id] = user.role || 'viewer';
    });
    setUserRoles(initialRoles);
  };

  const handleRoleChange = (userId: string, roleId: string) => {
    setUserRoles(prev => ({
      ...prev,
      [userId]: roleId
    }));
  };

  const handleSaveRoles = async () => {
    setLoading(true);
    try {
      // Process all role assignments
      const promises = Object.entries(userRoles).map(([userId, roleId]) => 
        assignUserRole(userId, roleId)
      );
      
      await Promise.all(promises);
      
      toast({
        title: "Roles updated",
        description: "User roles have been successfully updated"
      });
      
      onRoleAssigned();
      onClose();
    } catch (error) {
      console.error("Error assigning roles:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update user roles"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield size={18} />
            User Role Management
          </DialogTitle>
          <DialogDescription>
            Assign roles to users to control their access to hotel management features
          </DialogDescription>
        </DialogHeader>
        
        <div className="mt-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Current Role</TableHead>
                <TableHead>New Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="flex items-center gap-2">
                    <User size={16} className="text-gray-400" />
                    {user.email}
                  </TableCell>
                  <TableCell>
                    {user.role || "Viewer"}
                  </TableCell>
                  <TableCell>
                    <Select
                      value={userRoles[user.id]}
                      onValueChange={(value) => handleRoleChange(user.id, value)}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.id}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveRoles} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UserRolePanel;

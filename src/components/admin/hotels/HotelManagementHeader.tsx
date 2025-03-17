
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, History, FileText, Shield } from "lucide-react";

interface HotelManagementHeaderProps {
  onAddHotel: () => void;
  onOpenAuditLog: () => void;
  onOpenUserRoles: () => void;
  canManageRoles: boolean;
  viewMode?: 'all' | 'featured';
  setViewMode?: (mode: 'all' | 'featured') => void;
  showFavoritesOnly?: boolean;
  toggleFavoritesFilter?: () => void;
}

const HotelManagementHeader = ({ 
  onAddHotel, 
  onOpenAuditLog, 
  onOpenUserRoles,
  canManageRoles,
  viewMode,
  setViewMode,
  showFavoritesOnly,
  toggleFavoritesFilter
}: HotelManagementHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Hotel Management</h1>
      <div className="flex gap-2">
        {canManageRoles && (
          <Button 
            variant="outline" 
            onClick={onOpenUserRoles}
            className="gap-1"
          >
            <Shield className="h-4 w-4" /> User Roles
          </Button>
        )}
        <Button 
          variant="outline" 
          onClick={onOpenAuditLog}
          className="gap-1"
        >
          <FileText className="h-4 w-4" /> Audit Logs
        </Button>
        <Button onClick={onAddHotel} className="gap-1">
          <PlusCircle className="h-4 w-4" /> Add New Hotel
        </Button>
      </div>
    </div>
  );
};

export default HotelManagementHeader;

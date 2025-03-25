
import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, History, FileText, Shield, Star } from "lucide-react";

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
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-3">
      <div>
        <h1 className="text-2xl font-bold">Hotel Management</h1>
        {viewMode && setViewMode && (
          <div className="flex mt-2 space-x-2">
            <Button 
              variant={viewMode === 'all' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('all')}
            >
              All Hotels
            </Button>
            <Button 
              variant={viewMode === 'featured' ? 'default' : 'outline'} 
              size="sm"
              onClick={() => setViewMode('featured')}
            >
              Featured
            </Button>
            {toggleFavoritesFilter && (
              <Button
                variant={showFavoritesOnly ? 'default' : 'outline'}
                size="sm"
                onClick={toggleFavoritesFilter}
                className="gap-1"
              >
                <Star className="h-4 w-4" /> Favorites
              </Button>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
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

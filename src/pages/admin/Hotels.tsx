
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, History, FileText, Shield } from "lucide-react";
import HotelList from "@/components/admin/hotels/HotelList";
import HotelSearchBar from "@/components/admin/hotels/HotelSearchBar";
import HotelFilterPanel from "@/components/admin/hotels/HotelFilterPanel";
import AddHotelDialog from "@/components/admin/hotels/AddHotelDialog";
import DeleteHotelDialog from "@/components/admin/hotels/DeleteHotelDialog";
import AuditLogPanel from "@/components/admin/hotels/AuditLogPanel";
import VersionHistoryPanel from "@/components/admin/hotels/VersionHistoryPanel";
import UserRolePanel from "@/components/admin/hotels/UserRolePanel";
import { useHotels } from "@/hooks/useHotels";
import { useHotelOperations } from "@/hooks/useHotelOperations";
import { useNewHotel } from "@/hooks/useNewHotel";
import { useAuth } from "@/context/AuthContext";
import { checkPermission } from "@/services/hotelManagement/userPermissionsService";
import { supabase } from "@/integrations/supabase/client";

const HotelsManagement = () => {
  const [isAddHotelOpen, setIsAddHotelOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [isAuditLogOpen, setIsAuditLogOpen] = useState(false);
  const [isVersionHistoryOpen, setIsVersionHistoryOpen] = useState(false);
  const [isUserRolePanelOpen, setIsUserRolePanelOpen] = useState(false);
  const [selectedHotelId, setSelectedHotelId] = useState<number | null>(null);
  const [users, setUsers] = useState<Array<{id: string; email: string; role?: string}>>([]);
  const [canManageRoles, setCanManageRoles] = useState(false);
  
  const { user } = useAuth();
  
  const {
    hotels,
    filteredHotels,
    searchTerm,
    setSearchTerm,
    loading,
    filterOptions,
    fetchHotels,
    handleSearch,
    handleFilterChange,
    handleClearFilters
  } = useHotels();

  const {
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleAddHotel,
    handleDeleteHotel,
    confirmDelete,
    handleToggleStatus,
    handleToggleFeatured,
    handleBulkAction,
    handleCloneHotel
  } = useHotelOperations(fetchHotels);

  const {
    newHotel,
    setNewHotel,
    resetNewHotel,
    handleInputChange,
    handleAmenityToggle,
    handleCategoryToggle,
    handleAddCategory,
    handleRemoveCategory,
    handleRoomChange,
    handleAddRoom,
    handleRemoveRoom,
    addGalleryImage,
    removeGalleryImage,
    handleAddSeasonalPrice,
    handleUpdateSeasonalPrice,
    handleRemoveSeasonalPrice
  } = useNewHotel();

  useEffect(() => {
    if (user) {
      checkUserPermissions();
      fetchUsers();
    }
  }, [user]);

  const checkUserPermissions = async () => {
    if (!user) return;
    
    try {
      const hasPermission = await checkPermission(user.id, 'hotels', 'update');
      setCanManageRoles(hasPermission);
    } catch (error) {
      console.error("Error checking permissions:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data: users, error } = await supabase.auth.admin.listUsers();
      
      if (error) throw error;
      
      // Get roles for each user
      const { data: roles } = await supabase
        .from('user_roles')
        .select('user_id, role');
      
      const rolesMap = (roles || []).reduce((acc, curr) => {
        acc[curr.user_id] = curr.role;
        return acc;
      }, {} as Record<string, string>);
      
      const mappedUsers = users.users.map(user => ({
        id: user.id,
        email: user.email || '',
        role: rolesMap[user.id]
      }));
      
      setUsers(mappedUsers);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const onAddHotel = async () => {
    const success = await handleAddHotel(newHotel);
    if (success) {
      resetNewHotel();
      setIsAddHotelOpen(false);
    }
  };

  const handleOpenAuditLog = (hotelId?: number) => {
    setSelectedHotelId(hotelId || null);
    setIsAuditLogOpen(true);
  };

  const handleOpenVersionHistory = (hotelId: number) => {
    setSelectedHotelId(hotelId);
    setIsVersionHistoryOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hotel Management</h1>
        <div className="flex gap-2">
          {canManageRoles && (
            <Button 
              variant="outline" 
              onClick={() => setIsUserRolePanelOpen(true)}
              className="gap-1"
            >
              <Shield className="h-4 w-4" /> User Roles
            </Button>
          )}
          <Button 
            variant="outline" 
            onClick={() => handleOpenAuditLog()}
            className="gap-1"
          >
            <FileText className="h-4 w-4" /> Audit Logs
          </Button>
          <Button onClick={() => setIsAddHotelOpen(true)} className="gap-1">
            <PlusCircle className="h-4 w-4" /> Add New Hotel
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm mb-6">
        <HotelSearchBar 
          searchQuery={searchTerm} 
          setSearchQuery={setSearchTerm} 
          handleFilter={() => setIsFilterPanelOpen(true)}
          onSearch={handleSearch}
          activeFilters={filterOptions}
          onClearFilters={handleClearFilters}
        />

        <HotelList
          hotels={hotels}
          filteredHotels={filteredHotels}
          onDelete={handleDeleteHotel}
          onToggleStatus={(id) => {
            const hotel = hotels.find(h => h.id === id);
            if (hotel) {
              handleToggleStatus(id, hotel.status);
            }
          }}
          onToggleFeatured={handleToggleFeatured}
          onClone={handleCloneHotel}
          onBulkAction={handleBulkAction}
          onViewHistory={(id) => handleOpenVersionHistory(id)}
          onViewAuditLog={(id) => handleOpenAuditLog(id)}
          isLoading={loading}
        />
      </div>

      <HotelFilterPanel 
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        onApplyFilters={handleFilterChange}
        currentFilters={filterOptions}
      />

      <AddHotelDialog
        isOpen={isAddHotelOpen}
        setIsOpen={setIsAddHotelOpen}
        onAddHotel={onAddHotel}
        newHotel={newHotel}
        setNewHotel={setNewHotel}
        handleInputChange={handleInputChange}
        handleAmenityToggle={handleAmenityToggle}
        handleRoomChange={handleRoomChange}
        handleAddRoom={handleAddRoom}
        handleRemoveRoom={handleRemoveRoom}
        handleCategoryToggle={handleCategoryToggle}
        handleAddCategory={handleAddCategory}
        handleRemoveCategory={handleRemoveCategory}
        addGalleryImage={addGalleryImage}
        removeGalleryImage={removeGalleryImage}
        handleAddSeasonalPrice={handleAddSeasonalPrice}
        handleUpdateSeasonalPrice={handleUpdateSeasonalPrice}
        handleRemoveSeasonalPrice={handleRemoveSeasonalPrice}
      />

      <DeleteHotelDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        onConfirm={confirmDelete}
      />

      <AuditLogPanel
        isOpen={isAuditLogOpen}
        onClose={() => setIsAuditLogOpen(false)}
        entityId={selectedHotelId || undefined}
        entityType={selectedHotelId ? "hotel" : undefined}
      />

      {selectedHotelId && (
        <VersionHistoryPanel
          isOpen={isVersionHistoryOpen}
          onClose={() => setIsVersionHistoryOpen(false)}
          hotelId={selectedHotelId}
          onVersionRestored={fetchHotels}
        />
      )}

      <UserRolePanel
        isOpen={isUserRolePanelOpen}
        onClose={() => setIsUserRolePanelOpen(false)}
        users={users}
        onRoleAssigned={fetchUsers}
      />
    </div>
  );
};

export default HotelsManagement;

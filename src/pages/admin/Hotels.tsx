
import React from "react";
import HotelList from "@/components/admin/hotels/HotelList";
import HotelSearchBar from "@/components/admin/hotels/HotelSearchBar";
import HotelFilterPanel from "@/components/admin/hotels/HotelFilterPanel";
import AddHotelDialog from "@/components/admin/hotels/AddHotelDialog";
import DeleteHotelDialog from "@/components/admin/hotels/DeleteHotelDialog";
import AuditLogPanel from "@/components/admin/hotels/AuditLogPanel";
import VersionHistoryPanel from "@/components/admin/hotels/VersionHistoryPanel";
import UserRolePanel from "@/components/admin/hotels/UserRolePanel";
import HotelManagementHeader from "@/components/admin/hotels/HotelManagementHeader";
import { useHotels } from "@/hooks/useHotels";
import { useHotelOperations } from "@/hooks/useHotelOperations";
import { useNewHotel } from "@/hooks/useNewHotel";
import { useAuth } from "@/context/AuthContext";
import { useHotelDialogs } from "@/hooks/useHotelDialogs";
import { useUserManagement } from "@/hooks/useUserManagement";

const HotelsManagement = () => {
  const { user } = useAuth();
  
  // Custom hooks to manage different aspects of the page
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

  const {
    isAddHotelOpen,
    setIsAddHotelOpen,
    isFilterPanelOpen,
    setIsFilterPanelOpen,
    isAuditLogOpen,
    setIsAuditLogOpen,
    isVersionHistoryOpen,
    setIsVersionHistoryOpen,
    isUserRolePanelOpen,
    setIsUserRolePanelOpen,
    selectedHotelId,
    handleOpenAuditLog,
    handleOpenVersionHistory
  } = useHotelDialogs();

  const {
    users,
    canManageRoles,
    fetchUsers
  } = useUserManagement(user?.id);

  const onAddHotel = async () => {
    const success = await handleAddHotel(newHotel);
    if (success) {
      resetNewHotel();
      setIsAddHotelOpen(false);
    }
  };

  return (
    <div>
      <HotelManagementHeader 
        onAddHotel={() => setIsAddHotelOpen(true)}
        onOpenAuditLog={() => handleOpenAuditLog()}
        onOpenUserRoles={() => setIsUserRolePanelOpen(true)}
        canManageRoles={canManageRoles}
      />

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
          onToggleStatus={id => {
            const hotel = hotels.find(h => h.id === id);
            if (hotel) {
              handleToggleStatus(id, hotel.status);
            }
          }}
          onToggleFeatured={handleToggleFeatured}
          onClone={handleCloneHotel}
          onBulkAction={handleBulkAction}
          onViewHistory={handleOpenVersionHistory}
          onViewAuditLog={handleOpenAuditLog}
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
        entityType={selectedHotelId ? "hotel" : undefined}
        entityId={selectedHotelId || undefined}
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

import React from "react";
import AddHotelDialog from "@/components/admin/hotels/AddHotelDialog";
import DeleteHotelDialog from "@/components/admin/hotels/DeleteHotelDialog";
import AuditLogPanel from "@/components/admin/hotels/AuditLogPanel";
import VersionHistoryPanel from "@/components/admin/hotels/VersionHistoryPanel";
import UserRolePanel from "@/components/admin/hotels/UserRolePanel";
import HotelFilterPanel from "@/components/admin/hotels/HotelFilterPanel";

interface HotelDialogsProps {
  dialogs: {
    isAddHotelOpen: boolean;
    setIsAddHotelOpen: (open: boolean) => void;
    isEditHotelOpen: boolean;
    setIsEditHotelOpen: (open: boolean) => void;
    isFilterPanelOpen: boolean;
    setIsFilterPanelOpen: (open: boolean) => void;
    isAuditLogOpen: boolean;
    setIsAuditLogOpen: (open: boolean) => void;
    isVersionHistoryOpen: boolean;
    setIsVersionHistoryOpen: (open: boolean) => void;
    isUserRolePanelOpen: boolean;
    setIsUserRolePanelOpen: (open: boolean) => void;
    selectedHotelId: number | null;
  };
  operations: {
    isDeleteDialogOpen: boolean;
    setIsDeleteDialogOpen: (open: boolean) => void;
    confirmDelete: () => Promise<void>;
    onAddHotel: () => Promise<void>;
    onEditHotel: () => Promise<void>;
  };
  newHotel: any;
  filterOptions: any;
  users: any[];
  fetchHotels: () => void;
  handleFilterChange: (filters: any) => void;
  onRoleAssigned: () => void;
}

const HotelDialogs: React.FC<HotelDialogsProps> = ({
  dialogs,
  operations,
  newHotel,
  filterOptions,
  users,
  fetchHotels,
  handleFilterChange,
  onRoleAssigned
}) => {
  return (
    <>
      {/* Mobile responsive consideration - different UI for filter panel on mobile */}
      <HotelFilterPanel 
        isOpen={dialogs.isFilterPanelOpen}
        onClose={() => dialogs.setIsFilterPanelOpen(false)}
        onApplyFilters={handleFilterChange}
        currentFilters={filterOptions}
      />

      {/* Add Hotel Dialog */}
      <AddHotelDialog
        isOpen={dialogs.isAddHotelOpen}
        setIsOpen={dialogs.setIsAddHotelOpen}
        onAddHotel={operations.onAddHotel}
        newHotel={newHotel.newHotel}
        setNewHotel={newHotel.setNewHotel}
        handleInputChange={newHotel.handleInputChange}
        handleAmenityToggle={newHotel.handleAmenityToggle}
        handleRoomChange={newHotel.handleRoomChange}
        handleAddRoom={newHotel.handleAddRoom}
        handleRemoveRoom={newHotel.handleRemoveRoom}
        handleCategoryToggle={newHotel.handleCategoryToggle}
        handleAddCategory={newHotel.handleAddCategory}
        handleRemoveCategory={newHotel.handleRemoveCategory}
        addGalleryImage={newHotel.addGalleryImage}
        removeGalleryImage={newHotel.removeGalleryImage}
        handleAddSeasonalPrice={newHotel.handleAddSeasonalPrice}
        handleUpdateSeasonalPrice={newHotel.handleUpdateSeasonalPrice}
        handleRemoveSeasonalPrice={newHotel.handleRemoveSeasonalPrice}
      />

      {/* Edit Hotel Dialog */}
      <AddHotelDialog
        isOpen={dialogs.isEditHotelOpen}
        setIsOpen={dialogs.setIsEditHotelOpen}
        onAddHotel={operations.onEditHotel}
        newHotel={newHotel.newHotel}
        setNewHotel={newHotel.setNewHotel}
        handleInputChange={newHotel.handleInputChange}
        handleAmenityToggle={newHotel.handleAmenityToggle}
        handleRoomChange={newHotel.handleRoomChange}
        handleAddRoom={newHotel.handleAddRoom}
        handleRemoveRoom={newHotel.handleRemoveRoom}
        handleCategoryToggle={newHotel.handleCategoryToggle}
        handleAddCategory={newHotel.handleAddCategory}
        handleRemoveCategory={newHotel.handleRemoveCategory}
        addGalleryImage={newHotel.addGalleryImage}
        removeGalleryImage={newHotel.removeGalleryImage}
        handleAddSeasonalPrice={newHotel.handleAddSeasonalPrice}
        handleUpdateSeasonalPrice={newHotel.handleUpdateSeasonalPrice}
        handleRemoveSeasonalPrice={newHotel.handleRemoveSeasonalPrice}
        isEditing={true}
      />

      {/* Other dialogs and panels */}
      <DeleteHotelDialog
        isOpen={operations.isDeleteDialogOpen}
        onOpenChange={operations.setIsDeleteDialogOpen}
        onConfirm={operations.confirmDelete}
      />

      <AuditLogPanel
        isOpen={dialogs.isAuditLogOpen}
        onClose={() => dialogs.setIsAuditLogOpen(false)}
        entityType={dialogs.selectedHotelId ? "hotel" : undefined}
        entityId={dialogs.selectedHotelId || undefined}
      />

      {dialogs.selectedHotelId && (
        <VersionHistoryPanel
          isOpen={dialogs.isVersionHistoryOpen}
          onClose={() => dialogs.setIsVersionHistoryOpen(false)}
          hotelId={dialogs.selectedHotelId}
          onVersionRestored={fetchHotels}
        />
      )}

      <UserRolePanel
        isOpen={dialogs.isUserRolePanelOpen}
        onClose={() => dialogs.setIsUserRolePanelOpen(false)}
        users={users}
        onRoleAssigned={onRoleAssigned}
      />
    </>
  );
};

export default HotelDialogs;

import React, { useState, useEffect } from "react";
import HotelList from "@/components/admin/hotels/HotelList";
import HotelSearchBar from "@/components/admin/hotels/HotelSearchBar";
import HotelFilterPanel from "@/components/admin/hotels/HotelFilterPanel";
import AddHotelDialog from "@/components/admin/hotels/AddHotelDialog";
import DeleteHotelDialog from "@/components/admin/hotels/DeleteHotelDialog";
import AuditLogPanel from "@/components/admin/hotels/AuditLogPanel";
import VersionHistoryPanel from "@/components/admin/hotels/VersionHistoryPanel";
import UserRolePanel from "@/components/admin/hotels/UserRolePanel";
import HotelManagementHeader from "@/components/admin/hotels/HotelManagementHeader";
import NotificationsPanel from "@/components/admin/NotificationsPanel";
import { useHotels } from "@/hooks/useHotels";
import { useHotelOperations } from "@/hooks/useHotelOperations";
import { useNewHotel } from "@/hooks/useNewHotel";
import { useAuth } from "@/context/AuthContext";
import { useHotelDialogs } from "@/hooks/useHotelDialogs";
import { useUserManagement } from "@/hooks/useUserManagement";
import { useNotifications } from "@/hooks/useNotifications";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const HotelsManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  
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

  // Add notifications hook
  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    addNotification
  } = useNotifications();

  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);

  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    
    return () => {
      window.removeEventListener('resize', checkMobileView);
    };
  }, []);

  const onAddHotel = async () => {
    const success = await handleAddHotel(newHotel);
    if (success) {
      resetNewHotel();
      setIsAddHotelOpen(false);
      // Add notification for new hotel
      addNotification({
        type: 'system',
        title: 'Hotel Added',
        message: `New hotel "${newHotel.name}" has been successfully added.`
      });
      toast({
        title: "Hotel Added",
        description: `${newHotel.name} has been added successfully.`,
      });
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between mb-6">
        <HotelManagementHeader 
          onAddHotel={() => setIsAddHotelOpen(true)}
          onOpenAuditLog={() => handleOpenAuditLog()}
          onOpenUserRoles={() => setIsUserRolePanelOpen(true)}
          canManageRoles={canManageRoles}
        />
        
        {/* Notification Bell */}
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon"
            className="relative"
            onClick={() => setIsNotificationsPanelOpen(prev => !prev)}
          >
            <Bell />
            {unreadCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
              >
                {unreadCount}
              </Badge>
            )}
          </Button>
          
          {/* Notifications panel - shown when button is clicked */}
          {isNotificationsPanelOpen && (
            <div className="absolute top-full right-0 mt-2 w-80 md:w-96 bg-white rounded-lg shadow-lg z-50">
              <NotificationsPanel />
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
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
            onDelete={(id) => {
              handleDeleteHotel(id);
              addNotification({
                type: 'alert',
                title: 'Hotel Deleted',
                message: 'A hotel has been removed from the system.'
              });
            }}
            onToggleStatus={(id) => {
              const hotel = hotels.find(h => h.id === id);
              if (hotel) {
                handleToggleStatus(id, hotel.status);
                addNotification({
                  type: 'system',
                  title: 'Hotel Status Changed',
                  message: `Hotel "${hotel.name}" status changed to ${hotel.status === 'active' ? 'inactive' : 'active'}.`
                });
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
      </div>

      {/* Mobile responsive consideration - different UI for filter panel on mobile */}
      <HotelFilterPanel 
        isOpen={isFilterPanelOpen}
        onClose={() => setIsFilterPanelOpen(false)}
        onApplyFilters={handleFilterChange}
        currentFilters={filterOptions}
      />

      {/* Other dialogs and panels */}
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

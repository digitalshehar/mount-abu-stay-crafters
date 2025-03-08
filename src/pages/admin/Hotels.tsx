
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
import { useFavorites } from "@/hooks/useFavorites";
import { Bell, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Hotel } from "@/components/admin/hotels/types";

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
    showFavoritesOnly,
    fetchHotels,
    handleSearch,
    handleFilterChange,
    handleClearFilters,
    toggleFavoritesFilter
  } = useHotels();

  const {
    isDeleteDialogOpen,
    setIsDeleteDialogOpen,
    handleAddHotel,
    handleEditHotel,
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
    isEditHotelOpen,
    setIsEditHotelOpen,
    isFilterPanelOpen,
    setIsFilterPanelOpen,
    isAuditLogOpen,
    setIsAuditLogOpen,
    isVersionHistoryOpen,
    setIsVersionHistoryOpen,
    isUserRolePanelOpen,
    setIsUserRolePanelOpen,
    selectedHotelId,
    setSelectedHotelId,
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

  // Add favorites hook
  const { favorites, loading: favoritesLoading } = useFavorites(user);

  const [isNotificationsPanelOpen, setIsNotificationsPanelOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);

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

  // Set selected hotel when selectedHotelId changes
  useEffect(() => {
    if (selectedHotelId) {
      const hotel = hotels.find(h => h.id === selectedHotelId);
      if (hotel) {
        setSelectedHotel(hotel);
        // Convert the hotel to a format the form can handle
        setNewHotel({
          name: hotel.name,
          location: hotel.location,
          stars: hotel.stars,
          pricePerNight: hotel.pricePerNight,
          image: hotel.image,
          description: hotel.description || "",
          amenities: hotel.amenities || [],
          rooms: hotel.rooms || [],
          featured: hotel.featured || false,
          gallery: hotel.gallery || [],
          categories: hotel.categories || [],
          seasonalPricing: hotel.seasonalPricing || []
        });
      }
    }
  }, [selectedHotelId, hotels]);

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

  const onEditHotel = async () => {
    if (!selectedHotelId) return;
    
    try {
      const success = await handleEditHotel(selectedHotelId, newHotel);
      if (success) {
        setIsEditHotelOpen(false);
        resetNewHotel();
        setSelectedHotelId(null);
        
        addNotification({
          type: 'system',
          title: 'Hotel Updated',
          message: `Hotel "${newHotel.name}" has been successfully updated.`
        });
        
        toast({
          title: "Hotel Updated",
          description: `${newHotel.name} has been updated successfully.`,
        });
        
        fetchHotels();
      }
    } catch (error) {
      console.error("Error updating hotel:", error);
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "There was an error updating the hotel.",
      });
    }
  };

  const handleOpenEditHotel = (hotelId: number) => {
    setSelectedHotelId(hotelId);
    setIsEditHotelOpen(true);
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
        <div className="relative flex gap-2">
          {user && favorites.length > 0 && (
            <Button 
              variant={showFavoritesOnly ? "default" : "ghost"} 
              size="icon"
              className="relative"
              onClick={toggleFavoritesFilter}
            >
              <Heart className={showFavoritesOnly ? "fill-red-500" : ""} />
              <Badge 
                variant="secondary" 
                className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center p-0 text-xs"
              >
                {favorites.filter(f => f.item_type === 'hotel').length}
              </Badge>
            </Button>
          )}
          
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
              <NotificationsPanel 
                notifications={notifications}
                onMarkAsRead={markAsRead}
                onMarkAllAsRead={markAllAsRead}
              />
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
            showFavoritesOnly={showFavoritesOnly}
            onToggleFavoritesFilter={toggleFavoritesFilter}
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
            onEdit={handleOpenEditHotel}
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

      {/* Add Hotel Dialog */}
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

      {/* Edit Hotel Dialog */}
      <AddHotelDialog
        isOpen={isEditHotelOpen}
        setIsOpen={setIsEditHotelOpen}
        onAddHotel={onEditHotel}
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
        isEditing={true}
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

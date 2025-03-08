import React, { useState, useEffect } from "react";
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
import { useHotelDialogs } from "@/hooks/useHotelDialogs";
import { useUserManagement } from "@/hooks/useUserManagement";
import { useNotifications } from "@/hooks/useNotifications";
import { useFavorites } from "@/hooks/useFavorites";
import { useToast } from "@/hooks/use-toast";
import { Hotel } from "@/components/admin/hotels/types";
import HotelAdminHeader from "@/components/admin/hotels/HotelAdminHeader";
import HotelAdminContent from "@/components/admin/hotels/HotelAdminContent";

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
      <HotelAdminHeader 
        onAddHotel={() => setIsAddHotelOpen(true)}
        onOpenAuditLog={() => handleOpenAuditLog()}
        onOpenUserRoles={() => setIsUserRolePanelOpen(true)}
        canManageRoles={canManageRoles}
        notifications={notifications}
        unreadCount={unreadCount}
        markAsRead={markAsRead}
        markAllAsRead={markAllAsRead}
        showFavoritesOnly={showFavoritesOnly}
        toggleFavoritesFilter={toggleFavoritesFilter}
        favorites={favorites}
      />

      <HotelAdminContent 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
        handleFilterChange={handleFilterChange}
        handleClearFilters={handleClearFilters}
        setIsFilterPanelOpen={setIsFilterPanelOpen}
        filterOptions={filterOptions}
        hotels={hotels}
        filteredHotels={filteredHotels}
        loading={loading}
        showFavoritesOnly={showFavoritesOnly}
        toggleFavoritesFilter={toggleFavoritesFilter}
        handleDeleteHotel={handleDeleteHotel}
        handleOpenEditHotel={handleOpenEditHotel}
        handleToggleStatus={handleToggleStatus}
        handleToggleFeatured={handleToggleFeatured}
        handleCloneHotel={handleCloneHotel}
        handleBulkAction={handleBulkAction}
        handleOpenVersionHistory={handleOpenVersionHistory}
        handleOpenAuditLog={handleOpenAuditLog}
        addNotification={addNotification}
      />

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

      {/* Other dialogs and panels */}
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

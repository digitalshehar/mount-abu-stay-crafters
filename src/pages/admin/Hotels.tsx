
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import HotelList from "@/components/admin/hotels/HotelList";
import HotelSearchBar from "@/components/admin/hotels/HotelSearchBar";
import HotelFilterPanel from "@/components/admin/hotels/HotelFilterPanel";
import AddHotelDialog from "@/components/admin/hotels/AddHotelDialog";
import DeleteHotelDialog from "@/components/admin/hotels/DeleteHotelDialog";
import { useHotels } from "@/hooks/useHotels";
import { useHotelOperations } from "@/hooks/useHotelOperations";
import { useNewHotel } from "@/hooks/useNewHotel";

const HotelsManagement = () => {
  const [isAddHotelOpen, setIsAddHotelOpen] = useState(false);
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  
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

  const onAddHotel = async () => {
    const success = await handleAddHotel(newHotel);
    if (success) {
      resetNewHotel();
      setIsAddHotelOpen(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Hotel Management</h1>
        <Button onClick={() => setIsAddHotelOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" /> Add New Hotel
        </Button>
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
    </div>
  );
};

export default HotelsManagement;

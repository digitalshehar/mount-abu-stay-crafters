
import React from 'react';
import EarlyHotelHeader from './EarlyHotelHeader';
import EarlyHotelSearch from './EarlyHotelSearch';
import EarlyHotelList from './EarlyHotelList';
import EarlyHotelDialog from './EarlyHotelDialog';
import { useEarlyHotelManagement } from './hooks/useEarlyHotelManagement';

const EarlyHotelManagement: React.FC = () => {
  const {
    filteredHotels,
    searchTerm,
    setSearchTerm,
    isAddDialogOpen,
    setIsAddDialogOpen,
    isEditDialogOpen,
    setIsEditDialogOpen,
    selectedHotel,
    setSelectedHotel,
    loading,
    handleSearch,
    handleAddHotel,
    handleEditHotel,
    handleDeleteHotel,
    handleToggleStatus,
    handleToggleFeatured
  } = useEarlyHotelManagement();

  return (
    <div className="space-y-4">
      <EarlyHotelHeader 
        onAddClick={() => setIsAddDialogOpen(true)} 
      />
      
      <EarlyHotelSearch 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        onSearch={handleSearch}
        onAddClick={() => setIsAddDialogOpen(true)}
      />
      
      <EarlyHotelList 
        hotels={filteredHotels}
        loading={loading}
        onEdit={(hotel) => {
          setSelectedHotel(hotel);
          setIsEditDialogOpen(true);
        }}
        onDelete={handleDeleteHotel}
        onToggleStatus={handleToggleStatus}
      />

      {/* Add Dialog */}
      <EarlyHotelDialog
        isOpen={isAddDialogOpen}
        setIsOpen={setIsAddDialogOpen}
        onSubmit={handleAddHotel}
        title="Add Early Hotel"
      />
      
      {/* Edit Dialog */}
      {selectedHotel && (
        <EarlyHotelDialog
          isOpen={isEditDialogOpen}
          setIsOpen={setIsEditDialogOpen}
          onSubmit={handleEditHotel}
          title="Edit Early Hotel"
          initialData={selectedHotel}
        />
      )}
    </div>
  );
};

export default EarlyHotelManagement;

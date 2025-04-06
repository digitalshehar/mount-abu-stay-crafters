
import React, { useState } from 'react';
import EarlyHotelHeader from './EarlyHotelHeader';
import EarlyHotelSearch from './EarlyHotelSearch';
import EarlyHotelList from './EarlyHotelList';
import EarlyHotelDialog from './EarlyHotelDialog';
import EarlyHotelBookingsList from './EarlyHotelBookingsList';
import { useEarlyHotelManagement } from './hooks/useEarlyHotelManagement';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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

  const [activeTab, setActiveTab] = useState<string>("hotels");

  return (
    <div className="space-y-4">
      <EarlyHotelHeader 
        onAddClick={() => setIsAddDialogOpen(true)} 
      />
      
      <Tabs defaultValue="hotels" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="hotels">Manage Hotels</TabsTrigger>
          <TabsTrigger value="bookings">View Bookings</TabsTrigger>
        </TabsList>
        
        <TabsContent value="hotels">
          <div className="space-y-4">
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
              onToggleFeatured={handleToggleFeatured}
            />
          </div>
        </TabsContent>
        
        <TabsContent value="bookings">
          <EarlyHotelBookingsList />
        </TabsContent>
      </Tabs>

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


import React from "react";
import HotelSearchBar from "@/components/admin/hotels/HotelSearchBar";
import HotelList, { Hotel, mapAdminHotelToHotelList } from "@/components/admin/hotels/HotelList";
import { FilterOptions, Hotel as AdminHotel } from "@/components/admin/hotels/types";

interface HotelAdminContentProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: () => void;
  handleFilterChange: (filters: FilterOptions) => void;
  handleClearFilters: () => void;
  setIsFilterPanelOpen: (isOpen: boolean) => void;
  filterOptions: FilterOptions;
  hotels: AdminHotel[];
  filteredHotels: AdminHotel[];
  loading: boolean;
  showFavoritesOnly: boolean;
  toggleFavoritesFilter: () => void;
  handleDeleteHotel: (id: number) => void;
  handleOpenEditHotel: (id: number) => void;
  handleToggleStatus: (id: number, currentStatus?: string) => void;
  handleToggleFeatured: (id: number, featured: boolean) => void;
  handleCloneHotel: (hotel: AdminHotel) => void;
  handleBulkAction: (actionType: string, hotelIds: number[]) => void;
  handleOpenVersionHistory: (id: number) => void;
  handleOpenAuditLog: (id: number) => void;
  addNotification: (notification: any) => void;
}

const HotelAdminContent: React.FC<HotelAdminContentProps> = ({
  searchTerm,
  setSearchTerm,
  handleSearch,
  handleFilterChange,
  handleClearFilters,
  setIsFilterPanelOpen,
  filterOptions,
  hotels,
  filteredHotels,
  loading,
  showFavoritesOnly,
  toggleFavoritesFilter,
  handleDeleteHotel,
  handleOpenEditHotel,
  handleToggleStatus,
  handleToggleFeatured,
  handleCloneHotel,
  handleBulkAction,
  handleOpenVersionHistory,
  handleOpenAuditLog,
  addNotification
}) => {
  // Convert AdminHotel[] to Hotel[] for the HotelList component
  const mappedHotels = hotels.map(mapAdminHotelToHotelList);
  const mappedFilteredHotels = filteredHotels.map(mapAdminHotelToHotelList);

  return (
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
          hotels={mappedHotels}
          filteredHotels={mappedFilteredHotels}
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
          onClone={(hotelList) => {
            // Find the original AdminHotel from its id
            const adminHotel = hotels.find(h => h.id === hotelList.id);
            if (adminHotel) {
              handleCloneHotel(adminHotel);
            }
          }}
          onBulkAction={handleBulkAction}
          onViewHistory={handleOpenVersionHistory}
          onViewAuditLog={handleOpenAuditLog}
          isLoading={loading}
        />
      </div>
    </div>
  );
};

export default HotelAdminContent;

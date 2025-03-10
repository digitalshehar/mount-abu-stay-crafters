
import React from "react";
import HotelSearchBar from "@/components/admin/hotels/HotelSearchBar";
import HotelList from "@/components/admin/hotels/HotelList";
import { FilterOptions, Hotel } from "@/components/admin/hotels/types";

interface HotelAdminContentProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: () => void;
  handleFilterChange: (filters: FilterOptions) => void;
  handleClearFilters: () => void;
  setIsFilterPanelOpen: (isOpen: boolean) => void;
  filterOptions: FilterOptions;
  hotels: Hotel[];
  filteredHotels: Hotel[];
  loading: boolean;
  showFavoritesOnly: boolean;
  toggleFavoritesFilter: () => void;
  handleDeleteHotel: (id: number) => void;
  handleOpenEditHotel: (id: number) => void;
  handleToggleStatus: (id: number, currentStatus?: string) => void;
  handleToggleFeatured: (id: number, featured: boolean) => void;
  handleCloneHotel: (hotel: Hotel) => void;
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
  );
};

export default HotelAdminContent;

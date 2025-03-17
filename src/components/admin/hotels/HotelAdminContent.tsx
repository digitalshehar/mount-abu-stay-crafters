
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import HotelSearchBar from "@/components/admin/hotels/HotelSearchBar";
import HotelManagementHeader from "@/components/admin/hotels/HotelManagementHeader";
import FeaturedHotels from "@/components/admin/hotels/FeaturedHotels";
import HotelList from "@/components/admin/hotels/HotelList";

interface HotelSearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: () => void;
  setIsFilterPanelOpen: (open: boolean) => void;
  handleClearFilters: () => void;
  filterCount: number;
}

interface HotelAdminContentProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleSearch: () => void;
  handleFilterChange: (filters: any) => void;
  handleClearFilters: () => void;
  setIsFilterPanelOpen: (open: boolean) => void;
  filterOptions: any;
  hotels: any[];
  filteredHotels: any[];
  loading: boolean;
  showFavoritesOnly: boolean;
  toggleFavoritesFilter: () => void;
  handleDeleteHotel: (id: number) => void;
  handleOpenEditHotel: (id: number) => void;
  handleToggleStatus: (id: number) => void;
  handleToggleFeatured: (id: number) => void;
  handleCloneHotel: (id: number) => void;
  handleBulkAction: (action: string, ids: number[]) => void;
  handleOpenVersionHistory: (id: number) => void;
  handleOpenAuditLog: (id?: number) => void;
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
  const [viewMode, setViewMode] = useState<'all' | 'featured'>('all');
  
  const getFilterCount = () => {
    if (!filterOptions) return 0;
    return Object.values(filterOptions).flat().length;
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <HotelSearchBar 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
          setIsFilterPanelOpen={setIsFilterPanelOpen}
          handleClearFilters={handleClearFilters}
          filterCount={getFilterCount()}
        />
      </div>
      
      <HotelManagementHeader 
        onAddHotel={() => {}} // Placeholder
        onOpenAuditLog={() => handleOpenAuditLog()} 
        onOpenUserRoles={() => {}} // Placeholder
        canManageRoles={false} // Placeholder
        viewMode={viewMode}
        setViewMode={setViewMode}
        showFavoritesOnly={showFavoritesOnly}
        toggleFavoritesFilter={toggleFavoritesFilter}
      />
      
      {viewMode === 'featured' ? (
        <FeaturedHotels 
          hotels={filteredHotels.filter(hotel => hotel.featured)}
          isLoading={loading}
          onDelete={handleDeleteHotel}
          onEdit={handleOpenEditHotel}
          onToggleStatus={handleToggleStatus}
          onToggleFeatured={handleToggleFeatured}
          onClone={handleCloneHotel}
          onViewHistory={handleOpenVersionHistory}
          onViewAuditLog={handleOpenAuditLog}
        />
      ) : (
        <HotelList 
          hotels={hotels}
          filteredHotels={filteredHotels}
          isLoading={loading}
          onDelete={handleDeleteHotel}
          onEdit={handleOpenEditHotel}
          onToggleStatus={handleToggleStatus}
          onToggleFeatured={handleToggleFeatured}
          onClone={handleCloneHotel}
          onBulkAction={handleBulkAction}
          onViewHistory={handleOpenVersionHistory}
          onViewAuditLog={handleOpenAuditLog}
          addNotification={addNotification}
        />
      )}
      
      {!loading && filteredHotels.length === 0 && (
        <div className="bg-white p-8 rounded-lg shadow-sm text-center">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No hotels found</h3>
          <p className="text-gray-500 mb-4">Try clearing filters or adding a new hotel.</p>
          <Button 
            onClick={() => handleClearFilters()}
            className="bg-stone-100 text-stone-800 hover:bg-stone-200"
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default HotelAdminContent;


import React, { useEffect, useState } from "react";
import { useHotelManagement } from "@/hooks/useHotelManagement";
import HotelAdminHeader from "@/components/admin/hotels/HotelAdminHeader";
import HotelAdminContent from "@/components/admin/hotels/HotelAdminContent";
import HotelDialogs from "@/components/admin/hotels/HotelDialogs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hotel } from "@/components/admin/hotels/types";
import EarlyHotelManagement from "@/components/admin/hotels/early/EarlyHotelManagement";

const HotelsManagement = () => {
  const hotelManagement = useHotelManagement();
  const { hotels, operations, newHotel, dialogs, users, notifications, favorites } = hotelManagement;
  const [activeTab, setActiveTab] = useState<string>("regular");

  useEffect(() => {
    const checkMobileView = () => {
      hotelManagement.setIsMobileView(window.innerWidth < 768);
    };
    
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    
    return () => {
      window.removeEventListener('resize', checkMobileView);
    };
  }, []);

  // Wrap methods that have mismatched signatures
  const handleToggleStatus = (id: number) => {
    operations.handleToggleStatus(id, '');  // Empty string as default for currentStatus
  };
  
  const handleToggleFeatured = (id: number) => {
    operations.handleToggleFeatured(id, false);  // False as default for currentValue
  };
  
  const handleCloneHotel = (id: number) => {
    // Find the hotel object by id
    const hotel = hotels.hotels.find(h => h.id === id);
    if (hotel) {
      operations.handleCloneHotel(hotel);
    }
  };

  return (
    <div className="max-w-[1600px] mx-auto">
      <HotelAdminHeader 
        onAddHotel={() => dialogs.setIsAddHotelOpen(true)}
        onOpenAuditLog={() => dialogs.handleOpenAuditLog()}
        onOpenUserRoles={() => dialogs.setIsUserRolePanelOpen(true)}
        canManageRoles={users.canManageRoles}
        notifications={notifications.notifications}
        unreadCount={notifications.unreadCount}
        markAsRead={notifications.markAsRead}
        markAllAsRead={notifications.markAllAsRead}
        showFavoritesOnly={hotels.showFavoritesOnly}
        toggleFavoritesFilter={hotels.toggleFavoritesFilter}
        favorites={favorites}
      />

      <Tabs defaultValue="regular" value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
        <TabsList className="w-full max-w-md mx-auto mb-6">
          <TabsTrigger value="regular" className="flex-1">Regular Hotels</TabsTrigger>
          <TabsTrigger value="early" className="flex-1">Early Hotels (Hourly)</TabsTrigger>
        </TabsList>
        
        <TabsContent value="regular">
          <HotelAdminContent 
            searchTerm={hotels.searchTerm}
            setSearchTerm={hotels.setSearchTerm}
            handleSearch={hotels.handleSearch}
            handleFilterChange={hotels.handleFilterChange}
            handleClearFilters={hotels.handleClearFilters}
            setIsFilterPanelOpen={dialogs.setIsFilterPanelOpen}
            filterOptions={hotels.filterOptions}
            hotels={hotels.hotels}
            filteredHotels={hotels.filteredHotels}
            loading={hotels.loading}
            showFavoritesOnly={hotels.showFavoritesOnly}
            toggleFavoritesFilter={hotels.toggleFavoritesFilter}
            handleDeleteHotel={operations.handleDeleteHotel}
            handleOpenEditHotel={dialogs.handleOpenEditHotel}
            handleToggleStatus={handleToggleStatus}
            handleToggleFeatured={handleToggleFeatured}
            handleCloneHotel={handleCloneHotel}
            handleBulkAction={operations.handleBulkAction}
            handleOpenVersionHistory={dialogs.handleOpenVersionHistory}
            handleOpenAuditLog={dialogs.handleOpenAuditLog}
            addNotification={notifications.addNotification}
          />
        </TabsContent>
        
        <TabsContent value="early">
          <EarlyHotelManagement />
        </TabsContent>
      </Tabs>

      <HotelDialogs 
        dialogs={dialogs}
        operations={operations}
        newHotel={newHotel}
        filterOptions={hotels.filterOptions}
        users={users.users}
        fetchHotels={hotels.fetchHotels}
        handleFilterChange={hotels.handleFilterChange}
        onRoleAssigned={() => users.fetchUsers()}
      />
    </div>
  );
};

export default HotelsManagement;

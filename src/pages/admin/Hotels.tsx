
import React, { useEffect } from "react";
import { useHotelManagement } from "@/hooks/useHotelManagement";
import HotelAdminHeader from "@/components/admin/hotels/HotelAdminHeader";
import HotelAdminContent from "@/components/admin/hotels/HotelAdminContent";
import HotelDialogs from "@/components/admin/hotels/HotelDialogs";

const HotelsManagement = () => {
  const hotelManagement = useHotelManagement();
  const { hotels, operations, newHotel, dialogs, users, notifications, favorites } = hotelManagement;

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
        handleToggleStatus={operations.handleToggleStatus}
        handleToggleFeatured={operations.handleToggleFeatured}
        handleCloneHotel={operations.handleCloneHotel}
        handleBulkAction={operations.handleBulkAction}
        handleOpenVersionHistory={dialogs.handleOpenVersionHistory}
        handleOpenAuditLog={dialogs.handleOpenAuditLog}
        addNotification={notifications.addNotification}
      />

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

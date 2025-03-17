
import React, { useState } from "react";
import HotelTableHeader from "./table/HotelTableHeader";
import HotelTableRow from "./table/HotelTableRow";
import EmptyState from "./table/EmptyState";
import LoadingState from "./table/LoadingState";
import BulkActionsBar from "./table/BulkActionsBar";
import { Hotel } from "./types";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/hooks/useFavorites";

export interface HotelListProps {
  hotels?: any[];
  filteredHotels: any[];
  loading?: boolean;
  isLoading?: boolean;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onToggleFeatured: (id: number, currentValue?: boolean) => void;
  onClone: (hotel: any) => void;
  onBulkAction: (actionType: string, hotelIds: number[]) => void;
  onViewHistory: (id: number) => void;
  onViewAuditLog: (id: number) => void;
  addNotification?: (notification: any) => void;
  handleDeleteHotel?: (id: number) => void;
  handleOpenEditHotel?: (id: number) => void;
  handleToggleStatus?: (id: number) => void;
  handleToggleFeatured?: (id: number) => void;
  handleCloneHotel?: (hotel: any) => void;
  handleOpenVersionHistory?: (id: number) => void;
  handleOpenAuditLog?: (id?: number) => void;
}

const HotelList: React.FC<HotelListProps> = ({ 
  hotels = [],
  filteredHotels = [],
  loading,
  isLoading = loading,
  onDelete,
  onEdit,
  onToggleStatus,
  onToggleFeatured,
  onClone,
  onBulkAction,
  onViewHistory,
  onViewAuditLog,
  addNotification,
  handleDeleteHotel,
  handleOpenEditHotel,
  handleToggleStatus,
  handleToggleFeatured,
  handleCloneHotel,
  handleOpenVersionHistory,
  handleOpenAuditLog
}) => {
  const [selectedHotels, setSelectedHotels] = useState<number[]>([]);
  const { user } = useAuth();
  const { favorites } = useFavorites(user);
  
  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedHotels(filteredHotels.map(hotel => hotel.id));
    } else {
      setSelectedHotels([]);
    }
  };
  
  const handleSelectHotel = (id: number, checked: boolean) => {
    if (checked) {
      setSelectedHotels(prev => [...prev, id]);
    } else {
      setSelectedHotels(prev => prev.filter(hotelId => hotelId !== id));
    }
  };
  
  const handleBulkAction = (actionType: string) => {
    if (selectedHotels.length === 0) return;
    
    onBulkAction(actionType, selectedHotels);
    setSelectedHotels([]);
  };

  // Use the directly provided handlers or fall back to the generic ones
  const deleteHandler = handleDeleteHotel || onDelete;
  const editHandler = handleOpenEditHotel || onEdit;
  const toggleStatusHandler = handleToggleStatus || onToggleStatus;
  const toggleFeaturedHandler = handleToggleFeatured || onToggleFeatured;
  const cloneHandler = (hotel: any) => {
    if (handleCloneHotel) {
      handleCloneHotel(hotel);
    } else if (onClone) {
      onClone(hotel);
    }
  };
  const viewHistoryHandler = handleOpenVersionHistory || onViewHistory;
  const viewAuditLogHandler = (id: number) => {
    if (handleOpenAuditLog) {
      handleOpenAuditLog(id);
    } else if (onViewAuditLog) {
      onViewAuditLog(id);
    }
  };

  return (
    <div className="overflow-hidden rounded-md border">
      {selectedHotels.length > 0 && (
        <BulkActionsBar 
          selectedCount={selectedHotels.length}
          onBulkDelete={() => handleBulkAction('delete')}
          onBulkToggleStatus={() => handleBulkAction('toggleStatus')}
          onBulkToggleFeatured={() => handleBulkAction('toggleFeatured')}
        />
      )}
      
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <HotelTableHeader 
              selectAll={selectedHotels.length === filteredHotels.length && filteredHotels.length > 0}
              onSelectAll={() => handleSelectAll(selectedHotels.length !== filteredHotels.length || filteredHotels.length === 0)}
            />
            
            <tbody className="divide-y divide-gray-200 bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan={7}>
                    <LoadingState />
                  </td>
                </tr>
              ) : filteredHotels.length === 0 ? (
                <tr>
                  <td colSpan={7}>
                    <EmptyState filtered={hotels.length > 0} />
                  </td>
                </tr>
              ) : (
                filteredHotels.map((hotel) => (
                  <HotelTableRow
                    key={hotel.id}
                    hotel={hotel}
                    onDeleteHotel={() => deleteHandler(hotel.id)}
                    onEditHotel={() => editHandler(hotel.id)}
                    onToggleStatus={() => toggleStatusHandler(hotel.id)}
                    onToggleFeatured={() => toggleFeaturedHandler(hotel.id, hotel.featured)}
                    onClone={() => cloneHandler(hotel)}
                    onViewHistory={() => viewHistoryHandler(hotel.id)}
                    onViewAuditLog={() => viewAuditLogHandler(hotel.id)}
                    isSelected={selectedHotels.includes(hotel.id)}
                    onSelectHotel={(checked) => handleSelectHotel(hotel.id, checked)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default HotelList;

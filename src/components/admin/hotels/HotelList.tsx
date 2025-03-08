
import React, { useState } from "react";
import HotelTableHeader from "./table/HotelTableHeader";
import HotelTableRow from "./table/HotelTableRow";
import EmptyState from "./table/EmptyState";
import LoadingState from "./table/LoadingState";
import BulkActionsBar from "./table/BulkActionsBar";
import { Hotel } from "./types";

export interface HotelListProps {
  hotels: Hotel[];
  filteredHotels: Hotel[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onToggleFeatured: (id: number, currentValue: boolean) => void;
  onClone: (hotel: Hotel) => void;
  onBulkAction: (actionType: string, hotelIds: number[]) => void;
  onViewHistory: (id: number) => void;
  onViewAuditLog: (id: number) => void;
  isLoading: boolean;
}

const HotelList: React.FC<HotelListProps> = ({ 
  hotels,
  filteredHotels,
  onDelete,
  onEdit,
  onToggleStatus,
  onToggleFeatured,
  onClone,
  onBulkAction,
  onViewHistory,
  onViewAuditLog,
  isLoading
}) => {
  const [selectedHotels, setSelectedHotels] = useState<number[]>([]);
  
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
                    onDeleteHotel={() => onDelete(hotel.id)}
                    onEditHotel={() => onEdit(hotel.id)}
                    onToggleStatus={() => onToggleStatus(hotel.id)}
                    onToggleFeatured={() => onToggleFeatured(hotel.id, hotel.featured)}
                    onClone={() => onClone(hotel)}
                    onViewHistory={() => onViewHistory(hotel.id)}
                    onViewAuditLog={() => onViewAuditLog(hotel.id)}
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

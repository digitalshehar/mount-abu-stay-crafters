
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
          onCancelSelection={() => setSelectedHotels([])}
        />
      )}
      
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          <table className="min-w-full divide-y divide-gray-200">
            <HotelTableHeader 
              onSelectAll={handleSelectAll} 
              allSelected={filteredHotels.length > 0 && selectedHotels.length === filteredHotels.length}
              indeterminate={selectedHotels.length > 0 && selectedHotels.length < filteredHotels.length}
            />
            
            <tbody className="divide-y divide-gray-200 bg-white">
              {isLoading ? (
                <LoadingState columns={7} />
              ) : filteredHotels.length === 0 ? (
                <EmptyState columns={7} filtered={hotels.length > 0} />
              ) : (
                filteredHotels.map((hotel) => (
                  <HotelTableRow
                    key={hotel.id}
                    hotel={hotel}
                    onDelete={() => onDelete(hotel.id)}
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

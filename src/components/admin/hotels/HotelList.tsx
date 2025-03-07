
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Hotel } from "@/components/admin/hotels/types";
import HotelTableHeader from "./table/HotelTableHeader";
import HotelTableRow from "./table/HotelTableRow";
import BulkActionsBar from "./table/BulkActionsBar";
import LoadingState from "./table/LoadingState";
import EmptyState from "./table/EmptyState";

interface HotelListProps {
  hotels: Hotel[];
  filteredHotels: Hotel[];
  onDelete: (id: number) => void;
  onToggleStatus: (id: number) => void;
  onToggleFeatured: (id: number, currentValue: boolean) => void;
  onClone?: (hotel: Hotel) => void;
  onBulkAction?: (actionType: string, hotelIds: number[]) => void;
  isLoading?: boolean;
}

const HotelList = ({ 
  hotels, 
  filteredHotels, 
  onDelete, 
  onToggleStatus, 
  onToggleFeatured,
  onClone,
  onBulkAction,
  isLoading = false 
}: HotelListProps) => {
  const navigate = useNavigate();
  const [selectedHotels, setSelectedHotels] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  
  const handleView = (slug: string) => {
    navigate(`/hotel/${slug}`);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedHotels([]);
    } else {
      setSelectedHotels(filteredHotels.map(hotel => hotel.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectHotel = (id: number) => {
    if (selectedHotels.includes(id)) {
      setSelectedHotels(selectedHotels.filter(hotelId => hotelId !== id));
      if (selectAll) setSelectAll(false);
    } else {
      setSelectedHotels([...selectedHotels, id]);
      if (selectedHotels.length + 1 === filteredHotels.length) {
        setSelectAll(true);
      }
    }
  };

  const handleBulkAction = (actionType: string) => {
    if (selectedHotels.length > 0 && onBulkAction) {
      onBulkAction(actionType, selectedHotels);
      // Reset selections after action
      setSelectedHotels([]);
      setSelectAll(false);
    }
  };

  if (isLoading) {
    return <LoadingState />;
  }
  
  return (
    <div className="overflow-x-auto">
      <BulkActionsBar 
        selectedCount={selectedHotels.length}
        onBulkDelete={() => handleBulkAction('delete')}
        onBulkToggleStatus={() => handleBulkAction('toggleStatus')}
        onBulkToggleFeatured={() => handleBulkAction('toggleFeatured')}
      />
      
      <table className="w-full">
        <HotelTableHeader 
          selectAll={selectAll} 
          onSelectAll={handleSelectAll} 
        />
        <tbody>
          {filteredHotels.map((hotel) => (
            <HotelTableRow 
              key={hotel.id}
              hotel={hotel}
              isSelected={selectedHotels.includes(hotel.id)}
              onSelect={handleSelectHotel}
              onView={handleView}
              onDelete={onDelete}
              onToggleStatus={onToggleStatus}
              onToggleFeatured={onToggleFeatured}
              onClone={onClone}
            />
          ))}
          {filteredHotels.length === 0 && !isLoading && <EmptyState />}
        </tbody>
      </table>
    </div>
  );
};

export default HotelList;

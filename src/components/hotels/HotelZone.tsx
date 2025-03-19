
import React from 'react';
import { Hotel as AdminHotel } from '@/components/admin/hotels/types';
import HotelMap from './map/HotelMap';

interface HotelZoneProps {
  hotels: AdminHotel[];
  isLoading: boolean;
  clearFilters: () => void;
}

const HotelZone: React.FC<HotelZoneProps> = ({ 
  hotels, 
  isLoading, 
  clearFilters 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden h-[75vh]">
      <HotelMap 
        hotels={hotels} 
        isLoading={isLoading} 
        onMapMove={(bounds) => {
          console.log('Map moved to', bounds);
        }}
      />
    </div>
  );
};

export default HotelZone;

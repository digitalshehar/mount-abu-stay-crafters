
import React from 'react';
import { Hotel } from '@/types';
import WeatherWidget from './sidebar/WeatherWidget';
import HotelContact from './sidebar/HotelContact';
import HotelMap from './sidebar/HotelMap';
import HotelAmenities from './sidebar/HotelAmenities';

export interface HotelSidebarProps {
  hotel?: Hotel;
  onSelectRooms?: () => void;
}

const HotelSidebar: React.FC<HotelSidebarProps> = ({ hotel, onSelectRooms }) => {
  // Prepare location object for weather widget
  const locationObj = {
    location: hotel?.location || 'Mount Abu',
    latitude: hotel?.latitude || 24.5927,
    longitude: hotel?.longitude || 72.7156
  };

  return (
    <div className="space-y-6">
      <div className="sticky top-6">
        {/* BookingForm will be implemented in a later update */}
        {onSelectRooms && (
          <button 
            onClick={onSelectRooms}
            className="w-full bg-primary text-primary-foreground py-2 px-4 rounded font-medium text-sm mb-4"
          >
            Select Rooms
          </button>
        )}
        
        <div className="mt-6">
          <WeatherWidget location={locationObj} />
        </div>

        <div className="mt-6">
          <HotelAmenities amenities={hotel?.amenities || []} />
        </div>

        <div className="mt-6">
          <HotelMap 
            location={hotel?.location || 'Mount Abu'}
            latitude={hotel?.latitude || 24.5927}
            longitude={hotel?.longitude || 72.7156}
          />
        </div>

        <div className="mt-6">
          <HotelContact 
            phone={hotel?.contactInfo?.phone || ''}
            email={hotel?.contactInfo?.email || ''}
            website={hotel?.contactInfo?.website || ''}
            checkInTime={hotel?.checkInTime || '14:00'}
            checkOutTime={hotel?.checkOutTime || '11:00'}
          />
        </div>
      </div>
    </div>
  );
};

export default HotelSidebar;

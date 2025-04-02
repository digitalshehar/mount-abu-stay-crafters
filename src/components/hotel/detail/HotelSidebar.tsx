
import React from 'react';
import { Hotel } from '@/types';
import WeatherWidget from './sidebar/WeatherWidget';
import HotelContact from './sidebar/HotelContact';
import HotelMap from './sidebar/HotelMap';
import HotelAmenities from './sidebar/HotelAmenities';

interface HotelSidebarProps {
  hotel?: Hotel;
}

const HotelSidebar: React.FC<HotelSidebarProps> = ({ hotel }) => {
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
            phone={hotel?.contactInfo?.phone}
            email={hotel?.contactInfo?.email}
            website={hotel?.contactInfo?.website}
            checkInTime={hotel?.checkInTime}
            checkOutTime={hotel?.checkOutTime}
          />
        </div>
      </div>
    </div>
  );
};

export default HotelSidebar;

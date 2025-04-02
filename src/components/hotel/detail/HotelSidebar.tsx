
import React from 'react';
import BookingForm from './BookingForm';
import WeatherWidget from './sidebar/WeatherWidget';
import HotelContact from './sidebar/HotelContact';
import HotelMap from './sidebar/HotelMap';
import HotelAmenities from './sidebar/HotelAmenities';
import { Hotel } from '@/types';

interface HotelSidebarProps {
  hotel: Hotel;
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
      {/* Booking form */}
      <div className="sticky top-6">
        <BookingForm hotel={hotel} />
        
        {/* Weather widget */}
        <div className="mt-6">
          <WeatherWidget location={locationObj} />
        </div>
        
        {/* Hotel amenities */}
        <div className="mt-6">
          <HotelAmenities amenities={hotel?.amenities || []} />
        </div>
        
        {/* Map widget */}
        <div className="mt-6">
          <HotelMap
            location={hotel?.location || 'Mount Abu'}
            latitude={hotel?.latitude || 24.5927}
            longitude={hotel?.longitude || 72.7156}
          />
        </div>
        
        {/* Contact info */}
        <div className="mt-6">
          <HotelContact />
        </div>
      </div>
    </div>
  );
};

export default HotelSidebar;

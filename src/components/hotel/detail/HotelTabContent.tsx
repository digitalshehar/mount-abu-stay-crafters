
import React from 'react';
import HotelRooms from '@/components/hotel/HotelRooms';
import HotelAmenities from '@/components/hotel/HotelAmenities';
import HotelPolicies from '@/components/hotel/HotelPolicies';
import HotelReviews from '@/components/hotel/HotelReviews';
import HotelAttractions from '@/components/hotel/HotelAttractions';
import TransportOptions from '@/components/hotel/TransportOptions';
import HealthAndSafety from './HealthAndSafety';
import PriceHistoryTab from './PriceHistoryTab';

interface HotelTabContentProps {
  activeTab: string;
  hotel: any;
  nearbyAttractions?: any[];
  onBookRoom: (roomType: string) => void;
}

const HotelTabContent: React.FC<HotelTabContentProps> = ({
  activeTab,
  hotel,
  nearbyAttractions = [],
  onBookRoom
}) => {
  switch (activeTab) {
    case 'rooms':
      return (
        <HotelRooms
          rooms={hotel.rooms || []}
          onBookRoom={onBookRoom}
        />
      );
    case 'amenities':
      return (
        <HotelAmenities amenities={hotel.amenities || []} />
      );
    case 'policies':
      return (
        <HotelPolicies />
      );
    case 'reviews':
      return (
        <HotelReviews
          reviews={hotel.reviews || []}
          rating={hotel.rating || 0}
          reviewCount={hotel.reviewCount || 0}
          hotelId={hotel.id}
          hotelName={hotel.name}
        />
      );
    case 'attractions':
      return (
        <HotelAttractions
          attractions={nearbyAttractions}
          hotelLocation={hotel.location}
        />
      );
    case 'transport':
      return (
        <TransportOptions
          hotelName={hotel.name}
          location={hotel.location}
        />
      );
    case 'safety':
      return (
        <HealthAndSafety />
      );
    case 'price-history':
      return (
        <PriceHistoryTab hotel={hotel} />
      );
    default:
      return (
        <HotelRooms
          rooms={hotel.rooms || []}
          onBookRoom={onBookRoom}
        />
      );
  }
};

export default HotelTabContent;

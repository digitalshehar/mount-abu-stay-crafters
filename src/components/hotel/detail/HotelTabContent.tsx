
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
  // Create derived data for policies section
  const policiesData = {
    checkInTime: hotel.checkInTime || "2:00 PM",
    checkOutTime: hotel.checkOutTime || "12:00 PM",
    policies: hotel.policies || [
      "No smoking in rooms", 
      "Pets not allowed", 
      "Free cancellation up to 48 hours before check-in", 
      "Extra bed available upon request (additional charges may apply)"
    ],
    contactInfo: hotel.contactInfo || {
      phone: "+91 2974 123456",
      email: "info@hotelmountabu.com",
      website: "www.hotelmountabu.com"
    },
    address: hotel.address || `${hotel.location}, Mount Abu, Rajasthan, India`,
    landmarks: hotel.landmarks || {
      airport: "Udaipur Airport (100 km)",
      busStation: "Mount Abu Bus Station (1.5 km)",
      cityCenter: "Mount Abu City Center (0.5 km)"
    }
  };

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
        <HotelPolicies
          checkInTime={policiesData.checkInTime}
          checkOutTime={policiesData.checkOutTime}
          policies={policiesData.policies}
          contactInfo={policiesData.contactInfo}
          address={policiesData.address}
          landmarks={policiesData.landmarks}
        />
      );
    case 'reviews':
      return (
        <HotelReviews
          reviews={hotel.reviews || []}
          rating={hotel.rating || 0}
          reviewCount={hotel.reviewCount || 0}
        />
      );
    case 'attractions':
      return (
        <HotelAttractions
          attractions={nearbyAttractions}
          location={hotel.location}
        />
      );
    case 'transport':
      return (
        <TransportOptions
          hotel={hotel}
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

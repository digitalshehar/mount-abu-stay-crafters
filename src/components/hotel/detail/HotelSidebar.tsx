
import React from "react";
import PriceOverview from "./sidebar/PriceOverview";
import ContactLocation from "./sidebar/ContactLocation";
import PriceMatchGuarantee from "./sidebar/PriceMatchGuarantee";
import QuickActions from "./sidebar/QuickActions";
import WeatherWidget from "./sidebar/WeatherWidget";
import UpcomingEvents from "./sidebar/UpcomingEvents";
import RelatedOffers from "./RelatedOffers";
import SimilarHotels from "@/components/hotels/SimilarHotels";

interface HotelSidebarProps {
  hotel: any;
  onSelectRooms: () => void;
}

const HotelSidebar = ({ hotel, onSelectRooms }: HotelSidebarProps) => {
  return (
    <div className="space-y-6">
      <PriceOverview 
        price={hotel.price}
        rating={hotel.rating}
        reviewCount={hotel.reviewCount}
        onSelectRooms={onSelectRooms}
      />
      
      <WeatherWidget 
        location={hotel.location} 
        longitude={hotel.longitude}
        latitude={hotel.latitude}
      />

      <RelatedOffers 
        hotelId={hotel.id} 
        hotelName={hotel.name} 
      />
      
      <QuickActions hotel={hotel} />
      
      <ContactLocation 
        contactInfo={hotel.contactInfo} 
        address={hotel.address}
        landmarks={hotel.landmarks}
      />
      
      <UpcomingEvents location={hotel.location} />

      <PriceMatchGuarantee 
        priceMatch={hotel.priceMatchDetails} 
      />

      <SimilarHotels
        currentHotelId={hotel.id}
        currentHotelLocation={hotel.location}
        currentHotelStars={hotel.stars}
      />
    </div>
  );
};

export default HotelSidebar;

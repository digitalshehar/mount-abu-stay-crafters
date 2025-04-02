
import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Zap } from "lucide-react";
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
  // Display a loading skeleton when hotel data is not available
  if (!hotel) {
    return <div className="space-y-6 animate-pulse">
      <div className="h-64 bg-stone-100 rounded-lg"></div>
      <div className="h-48 bg-stone-100 rounded-lg"></div>
      <div className="h-32 bg-stone-100 rounded-lg"></div>
    </div>;
  }

  // Handler for one-click booking - Fixed: no argument needed
  const handleOneClickBooking = () => {
    // Use the best available room for one-click booking
    const rooms = hotel.rooms || [];
    const bestRoom = rooms.length > 0 ? rooms[0].type : null;
    // Pass the bestRoom to onSelectRooms if it accepts a parameter
    if (bestRoom) {
      onSelectRooms();
    } else {
      onSelectRooms();
    }
  };

  return (
    <div className="space-y-6">
      <PriceOverview 
        price={hotel.price}
        rating={hotel.rating}
        reviewCount={hotel.reviewCount}
        onSelectRooms={onSelectRooms}
      />
      
      {/* One-click booking button */}
      <Button 
        variant="default"
        className="w-full bg-orange-500 hover:bg-orange-600 gap-2" 
        onClick={handleOneClickBooking}
      >
        <Zap className="h-4 w-4" />
        Book Now with 1-Click
      </Button>
      
      <WeatherWidget 
        location={hotel.location} 
      />

      <RelatedOffers 
        hotelId={hotel.id} 
        hotelName={hotel.name} 
      />
      
      <QuickActions hotel={hotel} onSelectRooms={onSelectRooms} />
      
      <ContactLocation 
        address={hotel.address}
        contactInfo={hotel.contactInfo}
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

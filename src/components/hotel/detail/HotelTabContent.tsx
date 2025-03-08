
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import HotelRooms from "../HotelRooms";
import HotelAmenities from "../HotelAmenities";
import HotelFeatures from "../HotelFeatures";
import HotelReviews from "../HotelReviews";
import HotelQuestions from "../HotelQuestions";
import HotelInfo from "../HotelInfo";
import HotelAttractions from "../HotelAttractions";
import HotelPolicies from "../HotelPolicies";
import HotelAccessibility from "../HotelAccessibility";
import TransportOptions from "../TransportOptions";
import LocalEvents from "../LocalEvents";
import HotelItineraries from "../HotelItineraries";

interface HotelTabContentProps {
  activeTab: string;
  hotel: any;
  nearbyAttractions: any[];
  onBookRoom: (roomType?: string) => void;
}

const HotelTabContent = ({ 
  activeTab, 
  hotel, 
  nearbyAttractions,
  onBookRoom
}: HotelTabContentProps) => {
  return (
    <div className="bg-white rounded-b-lg border border-t-0 border-stone-200 p-6">
      <TabsContent value="rooms" className="mt-0 p-0">
        <HotelRooms rooms={hotel.rooms} onBookRoom={onBookRoom} />
      </TabsContent>
      
      <TabsContent value="facilities" className="mt-0 p-0">
        <div className="space-y-8">
          <HotelAmenities amenities={hotel.amenities} />
          <HotelFeatures />
        </div>
      </TabsContent>
      
      <TabsContent value="reviews" className="mt-0 p-0">
        <HotelReviews 
          rating={hotel.rating} 
          reviewCount={hotel.reviewCount}
          reviews={hotel.reviews || []}
        />
      </TabsContent>
      
      <TabsContent value="questions" className="mt-0 p-0">
        <HotelQuestions hotelId={hotel.id} />
      </TabsContent>
      
      <TabsContent value="accessibility" className="mt-0 p-0">
        <HotelAccessibility />
      </TabsContent>
      
      <TabsContent value="transport" className="mt-0 p-0">
        <TransportOptions hotelLocation={hotel.location} />
      </TabsContent>
      
      <TabsContent value="events" className="mt-0 p-0">
        <LocalEvents />
      </TabsContent>
      
      <TabsContent value="itineraries" className="mt-0 p-0">
        <HotelItineraries hotelLocation={hotel.location} />
      </TabsContent>
      
      <TabsContent value="policies" className="mt-0 p-0">
        <HotelPolicies 
          checkInTime={hotel.checkInTime || "2:00 PM"}
          checkOutTime={hotel.checkOutTime || "12:00 PM"}
          policies={hotel.policies || []}
          contactInfo={hotel.contactInfo || {}}
          address={hotel.address || ""}
          landmarks={hotel.landmarks || {}}
        />
      </TabsContent>
      
      <TabsContent value="about" className="mt-0 p-0">
        <div className="space-y-8">
          <HotelInfo 
            name={hotel.name}
            location={hotel.location}
            rating={hotel.rating}
            reviewCount={hotel.reviewCount}
            stars={hotel.stars}
            description={hotel.description}
          />
          
          <HotelAttractions attractions={nearbyAttractions} />
        </div>
      </TabsContent>
    </div>
  );
};

export default HotelTabContent;

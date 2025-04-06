
import React, { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import HotelGallery from "@/components/hotel/HotelGallery";
import HotelDetailHeader from "@/components/hotel/detail/HotelDetailHeader";
import HotelActionButtons from "@/components/hotel/detail/HotelActionButtons";
import HotelTabNavigation from "@/components/hotel/detail/HotelTabNavigation";
import HotelTabContent from "@/components/hotel/detail/HotelTabContent";
import HotelSidebar from "@/components/hotel/detail/HotelSidebar";
import HealthAndSafety from "@/components/hotel/detail/HealthAndSafety";
import SpecialOffers from "@/components/hotel/detail/SpecialOffers";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Calendar, Users, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface HotelMainContentProps {
  hotel: any;
  activeTab: string;
  setActiveTab: (value: string) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  showFullGallery: boolean;
  setShowFullGallery: (show: boolean) => void;
  nearbyAttractions: any[];
  onBookRoom: (roomType?: string) => void;
}

const HotelMainContent = ({
  hotel,
  activeTab,
  setActiveTab,
  isFavorite,
  onToggleFavorite,
  showFullGallery,
  setShowFullGallery,
  nearbyAttractions,
  onBookRoom
}: HotelMainContentProps) => {
  const [previewImages, setPreviewImages] = useState<string[]>(
    hotel.gallery && hotel.gallery.length > 0 
      ? hotel.gallery.slice(0, 5) 
      : [hotel.image]
  );

  return (
    <>
      {/* Hotel detail header with breadcrumbs */}
      <HotelDetailHeader 
        name={hotel.name}
        location={hotel.location}
        stars={hotel.stars || 3}
        rating={hotel.rating}
        reviewCount={hotel.reviewCount}
        featured={hotel.featured}
      />
      
      {/* Action buttons */}
      <div className="bg-white border-b border-stone-200 py-2">
        <div className="container-custom">
          <HotelActionButtons 
            hotel={hotel}
            isFavorite={isFavorite}
            onToggleFavorite={onToggleFavorite}
            onViewGallery={() => setShowFullGallery(true)}
          />
        </div>
      </div>

      {/* Gallery preview section */}
      <div className="bg-white pt-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2 mb-6">
            <div className="md:col-span-8 relative rounded-lg overflow-hidden">
              <img 
                src={previewImages[0]} 
                alt={hotel.name} 
                className="w-full h-[400px] object-cover cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => setShowFullGallery(true)}
              />
              {hotel.featured && (
                <Badge className="absolute top-4 left-4 bg-primary/90">
                  Featured
                </Badge>
              )}
            </div>
            <div className="md:col-span-4 grid grid-cols-2 gap-2">
              {previewImages.slice(1, 5).map((image, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden">
                  <img 
                    src={image} 
                    alt={`${hotel.name} - ${index + 2}`} 
                    className="w-full h-[196px] object-cover cursor-pointer hover:opacity-95 transition-opacity"
                    onClick={() => setShowFullGallery(true)}
                  />
                  {index === 3 && previewImages.length > 5 && (
                    <div 
                      className="absolute inset-0 bg-black/50 flex items-center justify-center cursor-pointer"
                      onClick={() => setShowFullGallery(true)}
                    >
                      <span className="text-white font-medium">+{previewImages.length - 5} more</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quick info */}
          <div className="flex flex-wrap gap-6 py-4 border-t border-stone-100">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              <span className="text-stone-700">{hotel.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-400" />
              <span className="text-stone-700">{hotel.stars}-Star Hotel</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-stone-700">Check-in: {hotel.checkInTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              <span className="text-stone-700">Check-out: {hotel.checkOutTime}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-stone-700">Perfect for families</span>
            </div>
          </div>

          {/* Amenities preview */}
          <ScrollArea className="w-full border-y py-4 border-stone-100">
            <div className="flex gap-6 pb-2">
              {(hotel.amenities || ["WiFi", "Breakfast", "Pool", "Gym", "Restaurant", "Bar", "Spa", "Parking"]).map((amenity, index) => (
                <div key={index} className="flex items-center gap-2 whitespace-nowrap">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-stone-600 text-sm">{amenity}</span>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </div>
      </div>
      
      {/* Full Gallery */}
      <HotelGallery 
        name={hotel.name} 
        images={hotel.gallery && hotel.gallery.length > 0 ? hotel.gallery : [hotel.image]} 
        fullScreen={showFullGallery}
        onClose={() => setShowFullGallery(false)}
      />
      
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Tabs defaultValue="rooms" className="w-full" onValueChange={setActiveTab} value={activeTab}>
              <HotelTabNavigation activeTab={activeTab} onChange={setActiveTab} />
              <HotelTabContent 
                activeTab={activeTab}
                hotel={hotel}
                nearbyAttractions={nearbyAttractions}
                onBookRoom={onBookRoom}
              />
            </Tabs>
            
            <HealthAndSafety />
            <SpecialOffers />

            {/* Price Match Guarantee */}
            {hotel.priceMatchDetails && hotel.priceMatchDetails.available && (
              <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Price Match Guarantee</h3>
                <p className="text-blue-700 text-sm mb-4">{hotel.priceMatchDetails.description}</p>
                <Button variant="outline" size="sm" className="text-blue-700 border-blue-200 hover:bg-blue-100">
                  Learn More
                </Button>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-1">
            <HotelSidebar 
              hotel={hotel} 
              onSelectRooms={() => setActiveTab("rooms")} 
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HotelMainContent;

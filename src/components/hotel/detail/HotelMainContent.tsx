
import React from "react";
import { Tabs } from "@/components/ui/tabs";
import HotelGallery from "@/components/hotel/HotelGallery";
import HotelDetailHeader from "@/components/hotel/detail/HotelDetailHeader";
import HotelActionButtons from "@/components/hotel/detail/HotelActionButtons";
import HotelTabNavigation from "@/components/hotel/detail/HotelTabNavigation";
import HotelTabContent from "@/components/hotel/detail/HotelTabContent";
import HotelSidebar from "@/components/hotel/detail/HotelSidebar";
import HealthAndSafety from "@/components/hotel/detail/HealthAndSafety";
import SpecialOffers from "@/components/hotel/detail/SpecialOffers";

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
  return (
    <>
      {/* Hotel detail header with breadcrumbs */}
      <HotelDetailHeader 
        name={hotel.name}
        location={hotel.location}
        stars={hotel.stars}
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
      
      {/* Gallery */}
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
              <HotelTabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
              <HotelTabContent 
                activeTab={activeTab}
                hotel={hotel}
                nearbyAttractions={nearbyAttractions}
                onBookRoom={onBookRoom}
              />
            </Tabs>
            
            <HealthAndSafety />
            <SpecialOffers />
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

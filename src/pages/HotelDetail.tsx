import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Dialog } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/hooks/useFavorites";
import { useHotelDetail } from "@/hooks/useHotelDetail";
import { generateHotelDescription, generateHotelSchema } from "@/utils/hotel";
import { useHotelBooking } from "@/hooks/useHotelBooking";

// Import refactored components
import HotelPageStructure from "@/components/hotel/detail/HotelPageStructure";
import HotelMainContent from "@/components/hotel/detail/HotelMainContent";
import { BookingDialog, BookingSuccessDialog } from "@/components/hotel/detail/BookingDialog";

const HotelDetail = () => {
  const { hotelSlug } = useParams<{ hotelSlug: string }>();
  const { hotel, loading, error, nearbyAttractions, mapCoordinates } = useHotelDetail(hotelSlug);
  const [activeTab, setActiveTab] = useState("rooms");
  const [showFullGallery, setShowFullGallery] = useState(false);
  const { user } = useAuth();
  const { favorites, removeFromFavorites, addToFavorites } = useFavorites(user);
  
  // Use our new custom booking hook
  const {
    showBookingForm,
    setShowBookingForm,
    isBookingLoading,
    selectedRoom,
    showBookingSuccess,
    setShowBookingSuccess,
    handleInitiateBooking,
    handleBookingSubmit
  } = useHotelBooking(hotel);

  // Check if the current hotel is in favorites
  const isFavorite = hotel && favorites.some(fav => 
    fav.item_type === 'hotel' && fav.item_id === hotel.id
  );

  const favoriteId = hotel && favorites.find(fav => 
    fav.item_type === 'hotel' && fav.item_id === hotel.id
  )?.id;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Check URL for tab parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const tabParam = queryParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [window.location.search]);

  const handleToggleFavorite = () => {
    if (!hotel) return;
    
    if (isFavorite && favoriteId) {
      removeFromFavorites(hotel.id, 'hotel');
      toast.info("Removed from favorites");
    } else if (addToFavorites) {
      addToFavorites(hotel.id, 'hotel');
      toast.success("Added to favorites");
    }
  };

  if (!hotel && !loading && !error) {
    return null;
  }

  // Fix: Properly serialize the schema object to a JSON string
  const hotelSchema = hotel ? JSON.stringify(generateHotelSchema(hotel, window.location.href)) : '';
  const metaDescription = hotel?.seoDescription || (hotel ? generateHotelDescription(hotel) : '');
  const pageTitle = hotel?.seoTitle || (hotel ? `${hotel.name} | Luxury Hotel in ${hotel.location}` : 'Hotel Details');

  // Create a merged hotel object with latitude and longitude
  const hotelWithCoordinates = hotel ? {
    ...hotel,
    latitude: hotel.latitude || (mapCoordinates ? mapCoordinates.lat : 24.5927),
    longitude: hotel.longitude || (mapCoordinates ? mapCoordinates.lng : 72.7156)
  } : null;

  return (
    <HotelPageStructure
      title={pageTitle}
      metaDescription={metaDescription}
      seoKeywords={hotel?.seoKeywords}
      schemaMarkup={hotelSchema}
      isLoading={loading}
      error={error}
    >
      {hotel && (
        <HotelMainContent
          hotel={hotelWithCoordinates}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
          showFullGallery={showFullGallery}
          setShowFullGallery={setShowFullGallery}
          nearbyAttractions={nearbyAttractions}
          onBookRoom={handleInitiateBooking}
        />
      )}
      
      {/* Booking Dialog */}
      <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
        <BookingDialog 
          hotel={hotel}
          selectedRoom={selectedRoom}
          isLoading={isBookingLoading}
          onSubmit={handleBookingSubmit}
          onClose={() => setShowBookingForm(false)}
        />
      </Dialog>

      {/* Booking Success Dialog */}
      <Dialog open={showBookingSuccess} onOpenChange={setShowBookingSuccess}>
        <BookingSuccessDialog 
          hotel={hotel}
          selectedRoom={selectedRoom}
          onClose={() => setShowBookingSuccess(false)}
          onBookTransport={() => {
            setShowBookingSuccess(false);
            setActiveTab("transport");
          }}
        />
      </Dialog>
    </HotelPageStructure>
  );
};

export default HotelDetail;

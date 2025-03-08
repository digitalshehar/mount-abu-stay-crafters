
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
  const { hotel, loading, error, nearbyAttractions } = useHotelDetail(hotelSlug);
  const [activeTab, setActiveTab] = useState("rooms");
  const [showFullGallery, setShowFullGallery] = useState(false);
  const { user } = useAuth();
  const { favorites, removeFavorite, addFavorite } = useFavorites(user);
  
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

  const handleToggleFavorite = () => {
    if (!hotel) return;
    
    if (isFavorite && favoriteId) {
      removeFavorite(favoriteId);
      toast.info("Removed from favorites");
    } else if (addFavorite) {
      addFavorite({
        id: hotel.id,
        name: hotel.name,
        type: "hotel",
        image: hotel.image,
        location: hotel.location,
        price: hotel.price,
        slug: hotel.slug
      });
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
          hotel={hotel}
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


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/hooks/useFavorites";
import { useHotelDetail } from "@/hooks/useHotelDetail";
import { generateHotelDescription, generateHotelSchema } from "@/utils/hotel";
import { useHotelBooking } from "@/hooks/useHotelBooking";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Import refactored components
import HotelPageStructure from "@/components/hotel/detail/HotelPageStructure";
import HotelMainContent from "@/components/hotel/detail/HotelMainContent";
import HotelTabContent from "@/components/hotel/detail/HotelTabContent";
import HotelTabNavigation from "@/components/hotel/detail/HotelTabNavigation";
import HotelSidebar from "@/components/hotel/detail/HotelSidebar";
import { BookingDialog, BookingSuccessDialog } from "@/components/hotel/detail/BookingDialog";
import PriceOverview from "@/components/hotel/detail/sidebar/PriceOverview";
import HotelContact from "@/components/hotel/detail/sidebar/HotelContact";
import QuickActions from "@/components/hotel/detail/sidebar/QuickActions";
import PriceMatchGuarantee from "@/components/hotel/detail/sidebar/PriceMatchGuarantee";
import ContactLocation from "@/components/hotel/detail/sidebar/ContactLocation";
import UpcomingEvents from "@/components/hotel/detail/sidebar/UpcomingEvents";

const HotelDetail = () => {
  const { hotelSlug } = useParams<{ hotelSlug: string }>();
  const navigate = useNavigate();
  const { hotel, loading, error, nearbyAttractions, mapCoordinates } = useHotelDetail(hotelSlug);
  const [activeTab, setActiveTab] = useState("rooms");
  const [showFullGallery, setShowFullGallery] = useState(false);
  const { user } = useAuth();
  const { favorites, removeFromFavorites, addToFavorites } = useFavorites(user);
  
  // Use our custom booking hook
  const {
    showBookingForm,
    setShowBookingForm,
    isBookingLoading,
    selectedRoom,
    showBookingSuccess,
    setShowBookingSuccess,
    bookingReference,
    bookingDetails,
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

  // Update URL when tab changes without full page refresh
  const handleTabChange = (tabValue: string) => {
    setActiveTab(tabValue);
    
    // Update URL query parameter
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('tab', tabValue);
    
    // Use history API to update URL without reload
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
  };

  // Handle error case - redirect to not found page
  useEffect(() => {
    if (error && !loading) {
      console.error("Hotel not found or error:", error);
      navigate('/hotel-not-found');
    }
  }, [error, loading, navigate]);

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

  // This early return should only happen when both loading and error are false
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
        <div className="container-custom pt-6 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <HotelMainContent
                hotel={hotelWithCoordinates}
                activeTab={activeTab}
                setActiveTab={handleTabChange}
                isFavorite={isFavorite}
                onToggleFavorite={handleToggleFavorite}
                showFullGallery={showFullGallery}
                setShowFullGallery={setShowFullGallery}
                nearbyAttractions={nearbyAttractions}
                onBookRoom={handleInitiateBooking}
              />
              
              <div className="mt-8 bg-white border rounded-lg p-6 shadow-sm">
                <Tabs defaultValue={activeTab} value={activeTab} onValueChange={handleTabChange}>
                  <HotelTabNavigation 
                    activeTab={activeTab} 
                    onChange={handleTabChange} 
                  />
                  
                  <div className="mt-6">
                    <TabsContent value={activeTab}>
                      <HotelTabContent 
                        activeTab={activeTab}
                        hotel={hotel}
                        nearbyAttractions={nearbyAttractions}
                        onBookRoom={handleInitiateBooking}
                      />
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>
            
            <div className="lg:col-span-1 space-y-6">
              <div className="sticky top-24 space-y-6">
                <PriceOverview
                  price={hotel.price || hotel.pricePerNight}
                  rating={hotel.rating}
                  reviewCount={hotel.reviewCount}
                  onSelectRooms={() => handleTabChange("rooms")}
                />
                
                <QuickActions 
                  hotel={hotel} 
                  onSelectRooms={() => handleTabChange("rooms")} 
                />
                
                <ContactLocation 
                  address={hotel.address}
                  contactInfo={hotel.contactInfo}
                  landmarks={hotel.landmarks}
                />
                
                <HotelContact 
                  phone={hotel.contactInfo?.phone}
                  email={hotel.contactInfo?.email}
                  website={hotel.contactInfo?.website}
                  checkInTime={hotel.checkInTime}
                  checkOutTime={hotel.checkOutTime}
                />
                
                <PriceMatchGuarantee priceMatch={hotel.priceMatchDetails} />
                
                <UpcomingEvents location={hotel.location} />
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Booking Dialog */}
      <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
        <DialogContent className="max-w-2xl">
          <BookingDialog 
            hotel={hotel}
            selectedRoom={selectedRoom}
            isLoading={isBookingLoading}
            onSubmit={handleBookingSubmit}
            onClose={() => setShowBookingForm(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Booking Success Dialog */}
      <Dialog open={showBookingSuccess} onOpenChange={setShowBookingSuccess}>
        <DialogContent className="max-w-2xl">
          <BookingSuccessDialog 
            hotel={hotel}
            selectedRoom={selectedRoom}
            onClose={() => setShowBookingSuccess(false)}
            onBookTransport={() => {
              setShowBookingSuccess(false);
              setActiveTab("transport");
            }}
            bookingReference={bookingReference}
            checkInDate={bookingDetails.checkInDate}
            checkOutDate={bookingDetails.checkOutDate}
            guestName={bookingDetails.guestName}
            guestEmail={bookingDetails.guestEmail}
            totalPrice={bookingDetails.totalPrice}
          />
        </DialogContent>
      </Dialog>
    </HotelPageStructure>
  );
};

export default HotelDetail;

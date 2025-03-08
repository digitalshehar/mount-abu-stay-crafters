
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Dialog } from "@/components/ui/dialog";
import { BookingFormValues } from "@/components/BookingForm";
import { toast } from "sonner";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Tabs } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/hooks/useFavorites";
import { useHotelDetail } from "@/hooks/useHotelDetail";
import { generateHotelDescription, generateHotelSchema } from "@/utils/hotel";

// Import refactored components
import HotelGallery from "@/components/hotel/HotelGallery";
import HotelDetailHeader from "@/components/hotel/detail/HotelDetailHeader";
import HotelActionButtons from "@/components/hotel/detail/HotelActionButtons";
import HotelTabNavigation from "@/components/hotel/detail/HotelTabNavigation";
import HotelTabContent from "@/components/hotel/detail/HotelTabContent";
import HotelSidebar from "@/components/hotel/detail/HotelSidebar";
import HealthAndSafety from "@/components/hotel/detail/HealthAndSafety";
import SpecialOffers from "@/components/hotel/detail/SpecialOffers";
import { BookingDialog, BookingSuccessDialog } from "@/components/hotel/detail/BookingDialog";

const HotelDetail = () => {
  const { hotelSlug } = useParams<{ hotelSlug: string }>();
  const { hotel, loading, error, nearbyAttractions } = useHotelDetail(hotelSlug);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("rooms");
  const [showFullGallery, setShowFullGallery] = useState(false);
  const { user } = useAuth();
  const { favorites, removeFavorite, addFavorite } = useFavorites(user);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);

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

  const handleInitiateBooking = (roomType?: string) => {
    setSelectedRoom(roomType || null);
    setShowBookingForm(true);
  };

  const handleBookingSubmit = (data: BookingFormValues) => {
    setIsBookingLoading(true);
    
    setTimeout(() => {
      setIsBookingLoading(false);
      setShowBookingForm(false);
      setShowBookingSuccess(true);
      
      toast.success("Booking successful!", {
        description: `Your booking at ${hotel?.name} has been confirmed. Check your email for details.`
      });
    }, 1500);
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-pulse space-y-8 max-w-7xl w-full mx-auto p-8">
            <div className="h-10 bg-gray-200 rounded-md w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded-lg w-full"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="col-span-2 space-y-4">
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
              <div>
                <div className="h-64 bg-gray-200 rounded-lg w-full"></div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !hotel) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8 max-w-md">
            <h1 className="text-3xl font-bold mb-4">Hotel Not Found</h1>
            <p className="text-stone-600 mb-6">{error || "Sorry, we couldn't find the hotel you're looking for."}</p>
            <div className="space-y-4">
              <button className="w-full bg-primary text-white py-2 rounded">
                <a href="/hotels">Browse All Hotels</a>
              </button>
              <button className="w-full border border-primary text-primary py-2 rounded">
                <a href="/">Return to Home</a>
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const hotelSchema = generateHotelSchema(hotel, window.location.href);
  const metaDescription = hotel.seoDescription || generateHotelDescription(hotel);
  const pageTitle = hotel.seoTitle || `${hotel.name} | Luxury Hotel in ${hotel.location}`;

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      {hotel.seoKeywords && <meta name="keywords" content={hotel.seoKeywords} />}
      
      <script type="application/ld+json">
        {JSON.stringify(hotelSchema)}
      </script>
      
      <Header />
      
      <main className="flex-1">
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
              onToggleFavorite={handleToggleFavorite}
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
                <HotelTabNavigation activeTab={activeTab} onChange={setActiveTab} />
                <HotelTabContent 
                  activeTab={activeTab}
                  hotel={hotel}
                  nearbyAttractions={nearbyAttractions}
                  onBookRoom={handleInitiateBooking}
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
      </main>
      
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
      
      <Footer />
    </div>
  );
};

export default HotelDetail;

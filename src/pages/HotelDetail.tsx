
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Check } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { toast } from "sonner";
import BookingForm, { BookingFormValues } from "@/components/BookingForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Import refactored components
import HotelGallery from "@/components/hotel/HotelGallery";
import HotelInfo from "@/components/hotel/HotelInfo";
import HotelAmenities from "@/components/hotel/HotelAmenities";
import HotelRooms from "@/components/hotel/HotelRooms";
import HotelReviews from "@/components/hotel/HotelReviews";
import HotelAttractions from "@/components/hotel/HotelAttractions";
import HotelPolicies from "@/components/hotel/HotelPolicies";
import HotelFeatures from "@/components/hotel/HotelFeatures";
import BookingPanel from "@/components/hotel/BookingPanel";

// Import custom hooks and utilities
import { useHotelDetail } from "@/hooks/useHotelDetail";
import { generateHotelDescription, generateHotelSchema } from "@/utils/hotel";

const HotelDetail = () => {
  const { hotelSlug } = useParams<{ hotelSlug: string }>();
  const navigate = useNavigate();
  const { hotel, loading, error, nearbyAttractions } = useHotelDetail(hotelSlug);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const { toast: useToastFn } = useToast();

  const handleInitiateBooking = () => {
    setShowBookingForm(true);
  };

  const handleBookingSubmit = (data: BookingFormValues) => {
    setIsBookingLoading(true);
    
    setTimeout(() => {
      setIsBookingLoading(false);
      setShowBookingForm(false);
      
      toast.success("Booking successful!", {
        description: `Your booking at ${hotel.name} has been confirmed. Check your email for details.`
      });
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-xl">Loading...</div>
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
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold mb-4">Hotel Not Found</h1>
            <p className="text-stone-600 mb-6">{error || "Sorry, we couldn't find the hotel you're looking for."}</p>
            <Button asChild>
              <a href="/hotels">Browse All Hotels</a>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const hotelSchema = generateHotelSchema(hotel, window.location.href);

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      {/* Remove SEO component that's causing errors */}
      
      <script type="application/ld+json">
        {JSON.stringify(hotelSchema)}
      </script>
      
      <Header />
      
      <main className="flex-1">
        <HotelGallery name={hotel.name} images={hotel.images} />
        
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <HotelInfo 
                name={hotel.name}
                location={hotel.location}
                rating={hotel.rating}
                reviewCount={hotel.reviewCount}
                stars={hotel.stars}
                description={hotel.description}
              />
              
              <HotelAmenities amenities={hotel.amenities} />
              
              <HotelRooms rooms={hotel.rooms} />
              
              <HotelReviews 
                rating={hotel.rating} 
                reviewCount={hotel.reviewCount}
                reviews={hotel.reviews}
              />
              
              <HotelAttractions attractions={nearbyAttractions} />
              
              <HotelPolicies 
                checkInTime={hotel.checkInTime}
                checkOutTime={hotel.checkOutTime}
                policies={hotel.policies}
                contactInfo={hotel.contactInfo}
                address={hotel.address}
                landmarks={hotel.landmarks}
              />
              
              <HotelFeatures />
            </div>
            
            <div className="lg:col-span-1">
              <BookingPanel 
                hotel={hotel}
                onInitiateBooking={handleInitiateBooking}
              />
            </div>
          </div>
        </div>
      </main>
      
      <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Complete Your Hotel Booking</DialogTitle>
            <DialogDescription>
              Please provide your details to confirm your stay at {hotel?.name}.
            </DialogDescription>
          </DialogHeader>
          
          <BookingForm 
            onSubmit={handleBookingSubmit} 
            isLoading={isBookingLoading} 
            bookingType="hotel" 
          />
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default HotelDetail;

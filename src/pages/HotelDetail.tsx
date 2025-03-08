
import React, { useState, useEffect } from "react";
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

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <div className="animate-pulse space-y-8 max-w-md mx-auto p-8">
            <div className="h-10 bg-gray-200 rounded-md w-3/4"></div>
            <div className="h-64 bg-gray-200 rounded-lg w-full"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
            <div className="h-12 bg-gray-200 rounded-md w-1/2"></div>
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
              <Button asChild className="w-full">
                <a href="/hotels">Browse All Hotels</a>
              </Button>
              <Button variant="outline" asChild className="w-full">
                <a href="/">Return to Home</a>
              </Button>
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
      {/* SEO Meta Tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      {hotel.seoKeywords && <meta name="keywords" content={hotel.seoKeywords} />}
      
      <script type="application/ld+json">
        {JSON.stringify(hotelSchema)}
      </script>
      
      <Header />
      
      <main className="flex-1">
        <HotelGallery name={hotel.name} images={hotel.images} />
        
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-12">
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
              <div className="sticky top-24">
                <BookingPanel 
                  hotel={hotel}
                  onInitiateBooking={handleInitiateBooking}
                />
                
                {/* Quick contact card */}
                <div className="mt-6 bg-white rounded-xl border border-stone-100 p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-4">Need Help?</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 text-primary" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-stone-500">Phone</div>
                        <div className="font-medium">+91 2974 123456</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-5 w-5 text-primary" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm text-stone-500">Email</div>
                        <div className="font-medium">info@hotelinmountabu.com</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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


import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Check, Map, Phone, Mail, Calendar, Info, ChevronRight, 
  Share2, Bookmark, Camera, Accessibility, Car, MessageCircle, 
  CalendarDays
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import HotelQuestions from "@/components/hotel/HotelQuestions";
import HotelAccessibility from "@/components/hotel/HotelAccessibility";
import TransportOptions from "@/components/hotel/TransportOptions";
import LocalEvents from "@/components/hotel/LocalEvents";

// Import custom hooks and utilities
import { useHotelDetail } from "@/hooks/useHotelDetail";
import { generateHotelDescription, generateHotelSchema } from "@/utils/hotel";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FavoriteButton } from "@/components/FavoriteButton";
import { useFavorites } from "@/hooks/useFavorites";
import { useAuth } from "@/context/AuthContext";

const HotelDetail = () => {
  const { hotelSlug } = useParams<{ hotelSlug: string }>();
  const navigate = useNavigate();
  const { hotel, loading, error, nearbyAttractions } = useHotelDetail(hotelSlug);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("rooms");
  const { toast: useToastFn } = useToast();
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

  const handleShareHotel = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: hotel?.name || "Hotel Details",
          text: `Check out ${hotel?.name} in ${hotel?.location}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Error sharing:", error);
      }
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard");
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
      <title>{pageTitle}</title>
      <meta name="description" content={metaDescription} />
      {hotel.seoKeywords && <meta name="keywords" content={hotel.seoKeywords} />}
      
      <script type="application/ld+json">
        {JSON.stringify(hotelSchema)}
      </script>
      
      <Header />
      
      <main className="flex-1">
        <div className="bg-white border-b border-stone-200">
          <div className="container-custom py-3">
            <div className="flex items-center text-sm text-stone-500">
              <a href="/" className="hover:text-primary">Home</a>
              <ChevronRight className="h-3 w-3 mx-2" />
              <a href="/hotels" className="hover:text-primary">Hotels</a>
              <ChevronRight className="h-3 w-3 mx-2" />
              <a href={`/hotels?location=${encodeURIComponent(hotel.location)}`} className="hover:text-primary">{hotel.location}</a>
              <ChevronRight className="h-3 w-3 mx-2" />
              <span className="text-stone-700 truncate">{hotel.name}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white border-b border-stone-200 py-5">
          <div className="container-custom">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-display font-bold">{hotel.name}</h1>
                <div className="flex items-center mt-2 text-sm">
                  <div className="flex">
                    {Array.from({ length: hotel.stars }).map((_, idx) => (
                      <span key={idx} className="text-yellow-500">★</span>
                    ))}
                  </div>
                  <span className="mx-2">•</span>
                  <span>{hotel.location}</span>
                  {hotel.featured && (
                    <>
                      <span className="mx-2">•</span>
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Featured
                      </Badge>
                    </>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-3 flex-wrap">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Map className="h-4 w-4" />
                  <span>View on Map</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={`flex items-center gap-2 ${isFavorite ? 'text-red-500 border-red-200' : ''}`}
                  onClick={handleToggleFavorite}
                >
                  <Bookmark className={`h-4 w-4 ${isFavorite ? 'fill-red-500' : ''}`} />
                  <span>{isFavorite ? 'Saved' : 'Save'}</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={handleShareHotel}
                >
                  <Share2 className="h-4 w-4" />
                  <span>Share</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2"
                  onClick={() => setShowFullGallery(true)}
                >
                  <Camera className="h-4 w-4" />
                  <span>All Photos</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
        
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
                <div className="bg-white rounded-t-lg border border-b-0 border-stone-200">
                  <TabsList className="w-full justify-start overflow-x-auto rounded-none bg-transparent border-b border-stone-200 p-0">
                    <TabsTrigger 
                      value="rooms" 
                      className="rounded-none py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      Rooms & Rates
                    </TabsTrigger>
                    <TabsTrigger 
                      value="facilities" 
                      className="rounded-none py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      Facilities
                    </TabsTrigger>
                    <TabsTrigger 
                      value="reviews" 
                      className="rounded-none py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      Reviews
                    </TabsTrigger>
                    <TabsTrigger 
                      value="questions" 
                      className="rounded-none py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      Q&A
                    </TabsTrigger>
                    <TabsTrigger 
                      value="accessibility" 
                      className="rounded-none py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      Accessibility
                    </TabsTrigger>
                    <TabsTrigger 
                      value="transport" 
                      className="rounded-none py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      Transport
                    </TabsTrigger>
                    <TabsTrigger 
                      value="events" 
                      className="rounded-none py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      Local Events
                    </TabsTrigger>
                    <TabsTrigger 
                      value="policies" 
                      className="rounded-none py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      Policies
                    </TabsTrigger>
                    <TabsTrigger 
                      value="about" 
                      className="rounded-none py-3 px-5 data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                    >
                      About
                    </TabsTrigger>
                  </TabsList>
                </div>
                
                <div className="bg-white rounded-b-lg border border-t-0 border-stone-200 p-6">
                  <TabsContent value="rooms" className="mt-0 p-0">
                    <HotelRooms rooms={hotel.rooms} onBookRoom={handleInitiateBooking} />
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
              </Tabs>
              
              <div className="mt-8 bg-green-50 p-6 rounded-lg border border-green-100">
                <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                  <Info className="h-5 w-5 mr-2 text-green-700" />
                  Health & Safety Measures
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                  {[
                    "Enhanced cleaning practices",
                    "Social distancing measures",
                    "Staff trained in safety protocol",
                    "Temperature checks for staff",
                    "Contactless check-in/out available",
                    "Hand sanitizer provided"
                  ].map((measure, idx) => (
                    <div key={idx} className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mt-1 mr-2 flex-shrink-0" />
                      <span className="text-sm text-green-800">{measure}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Special Offers */}
              <div className="mt-8 bg-blue-50 p-6 rounded-lg border border-blue-100">
                <h3 className="text-lg font-semibold text-blue-800 mb-4">Special Offers</h3>
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-md border border-blue-100 flex flex-col sm:flex-row items-start gap-4">
                    <div className="bg-blue-100 text-blue-700 p-2 rounded-md font-semibold">
                      Save 15%
                    </div>
                    <div>
                      <h4 className="font-medium">Early Bird Special</h4>
                      <p className="text-sm text-stone-600">Book 30 days in advance and save 15% on your stay.</p>
                    </div>
                    <Button size="sm" className="ml-auto mt-2 sm:mt-0">Apply</Button>
                  </div>
                  
                  <div className="bg-white p-4 rounded-md border border-blue-100 flex flex-col sm:flex-row items-start gap-4">
                    <div className="bg-blue-100 text-blue-700 p-2 rounded-md font-semibold">
                      Free Night
                    </div>
                    <div>
                      <h4 className="font-medium">Stay 4, Pay 3</h4>
                      <p className="text-sm text-stone-600">Book 4 nights and get 1 night completely free.</p>
                    </div>
                    <Button size="sm" className="ml-auto mt-2 sm:mt-0">Apply</Button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">Price Overview</h3>
                    <Badge className="bg-green-500">Best value</Badge>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-stone-600">Room rates from</span>
                      <span className="font-semibold text-xl">₹{hotel.price}</span>
                    </div>
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-stone-500">+ ₹{Math.round(hotel.price * 0.18)} taxes & fees</span>
                      <span className="text-stone-500">per night</span>
                    </div>
                    
                    <Button 
                      className="w-full gap-2 mt-2" 
                      onClick={() => setActiveTab("rooms")}
                    >
                      <Calendar className="h-4 w-4" />
                      Select Rooms
                    </Button>
                    
                    <p className="text-xs text-green-600 flex items-center justify-center mt-2">
                      <Check className="h-3 w-3 mr-1" />
                      Free cancellation on most rooms
                    </p>
                  </div>
                </div>

                {/* Price Match Guarantee */}
                <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-3">Price Match Guarantee</h3>
                  <p className="text-sm text-stone-600 mb-2">
                    Found this hotel cheaper elsewhere? We'll match the price and give you an additional 10% off.
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Claim Price Match
                  </Button>
                </div>

                <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-4">Contact & Location</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Map className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-sm text-stone-600">{hotel.address || `${hotel.location}, India`}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Phone className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-sm text-stone-600">{hotel.contactInfo?.phone || "+91 2974 123456"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Mail className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-stone-600">{hotel.contactInfo?.email || "info@hotelinmountabu.com"}</p>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <p className="font-medium">Nearby Landmarks</p>
                      {Object.entries(hotel.landmarks || {
                        "Airport": "100 km",
                        "Bus Station": "1.5 km",
                        "City Center": "0.5 km"
                      }).map(([key, value], idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-stone-600">{key}</span>
                          <span className="text-stone-800">{value?.toString() || ""}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <MessageCircle className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-semibold text-lg">Quick Actions</h3>
                  </div>
                  <div className="space-y-3">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left"
                      onClick={() => setActiveTab("questions")}
                    >
                      Ask a Question
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left"
                      onClick={() => setActiveTab("transport")}
                    >
                      Book Transportation
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left"
                      onClick={() => setActiveTab("events")}
                    >
                      Explore Local Events
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start text-left"
                      onClick={() => setActiveTab("accessibility")}
                    >
                      View Accessibility Features
                    </Button>
                  </div>
                </div>

                {/* Weather widget */}
                <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-sm">
                  <h3 className="font-semibold text-lg mb-4">Current Weather</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-2xl font-semibold">26°C</p>
                      <p className="text-sm text-stone-500">Partly Cloudy</p>
                    </div>
                    <div className="text-yellow-500">
                      {/* Weather icon would go here */}
                      ☀️
                    </div>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between items-center text-sm">
                    <div className="text-center">
                      <p className="font-medium">Fri</p>
                      <p>25°C</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Sat</p>
                      <p>27°C</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Sun</p>
                      <p>24°C</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">Mon</p>
                      <p>25°C</p>
                    </div>
                  </div>
                </div>

                {/* Upcoming Events */}
                <div className="bg-white rounded-lg border border-stone-200 p-6 shadow-sm">
                  <div className="flex items-center mb-4">
                    <CalendarDays className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-semibold text-lg">Upcoming Events</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-stone-50 rounded-md p-3 border border-stone-100">
                      <p className="font-medium">Summer Festival</p>
                      <p className="text-xs text-stone-500 mt-1">May 15-17 • 1.2 km away</p>
                    </div>
                    <div className="bg-stone-50 rounded-md p-3 border border-stone-100">
                      <p className="font-medium">Crafts Fair</p>
                      <p className="text-xs text-stone-500 mt-1">Jun 5-7 • 2.5 km away</p>
                    </div>
                    <Button 
                      variant="link" 
                      className="w-full text-sm"
                      onClick={() => setActiveTab("events")}
                    >
                      View all events →
                    </Button>
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
              {selectedRoom 
                ? `Please provide your details to book the ${selectedRoom} room at ${hotel.name}.`
                : `Please provide your details to confirm your stay at ${hotel.name}.`}
            </DialogDescription>
          </DialogHeader>
          
          <BookingForm 
            onSubmit={handleBookingSubmit} 
            isLoading={isBookingLoading} 
            bookingType="hotel" 
          />
        </DialogContent>
      </Dialog>

      <Dialog open={showBookingSuccess} onOpenChange={setShowBookingSuccess}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-green-600 flex items-center">
              <Check className="mr-2 h-6 w-6" />
              Booking Confirmed!
            </DialogTitle>
            <DialogDescription>
              Your booking at {hotel.name} has been successfully confirmed.
            </DialogDescription>
          </DialogHeader>
          
          <div className="bg-green-50 p-4 rounded-md border border-green-100 mb-4">
            <h4 className="font-medium text-green-800 mb-2">Booking Details</h4>
            <div className="space-y-2 text-sm text-green-700">
              <p><span className="font-medium">Hotel:</span> {hotel.name}</p>
              {selectedRoom && <p><span className="font-medium">Room Type:</span> {selectedRoom}</p>}
              <p><span className="font-medium">Confirmation #:</span> {Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
            </div>
          </div>
          
          <p className="text-sm text-stone-600 mb-4">
            A confirmation email has been sent to your email address with all the details of your booking.
          </p>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setShowBookingSuccess(false)}>Close</Button>
            <Button onClick={() => {
              setShowBookingSuccess(false);
              setActiveTab("transport");
            }}>
              Book Transportation
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default HotelDetail;

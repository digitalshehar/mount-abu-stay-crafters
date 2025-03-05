import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, MapPin, Calendar, Users, Wifi, Coffee, Tv, Bath, Utensils, Dumbbell, Snowflake, Car } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import BookingForm, { BookingFormValues } from "@/components/BookingForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const HotelDetail = () => {
  const { hotelSlug } = useParams<{ hotelSlug: string }>();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [guests, setGuests] = useState("2");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const { toast: useToastFn } = useToast();

  useEffect(() => {
    const fetchHotelData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!hotelSlug) {
          setError("Hotel slug is missing");
          setLoading(false);
          return;
        }

        console.log("Fetching hotel with slug:", hotelSlug);
        
        const { data: hotelData, error: hotelError } = await supabase
          .from('hotels')
          .select('*')
          .eq('slug', hotelSlug)
          .single();
        
        if (hotelError) {
          console.error("Error fetching hotel:", hotelError);
          setError(hotelError.message || "Failed to fetch hotel data");
          setHotel(null);
          setLoading(false);
          return;
        }

        if (!hotelData) {
          setError("Hotel not found");
          setHotel(null);
          setLoading(false);
          return;
        }
        
        console.log("Hotel data fetched:", hotelData);
        
        const { data: roomData, error: roomError } = await supabase
          .from('rooms')
          .select('*')
          .eq('hotel_id', hotelData.id);
        
        if (roomError) {
          console.error("Error fetching rooms:", roomError);
        }
        
        console.log("Room data fetched:", roomData);
        
        const formattedHotel = {
          id: hotelData.id,
          name: hotelData.name,
          slug: hotelData.slug,
          location: hotelData.location,
          description: hotelData.description || "",
          price: parseFloat(hotelData.price_per_night.toString()),
          stars: hotelData.stars,
          rating: parseFloat(hotelData.rating?.toString() || "0"),
          reviewCount: hotelData.review_count || 0,
          image: hotelData.image,
          images: [
            hotelData.image,
            "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1540304453527-62f979142a17?auto=format&fit=crop&q=80&w=2670&ixlib=rb-4.0.3"
          ],
          amenities: hotelData.amenities || ["WiFi", "Breakfast", "TV", "Bathroom"],
          rooms: roomData ? roomData.map((room: any) => ({
            type: room.type,
            price: parseFloat(room.price.toString()),
            capacity: room.capacity
          })) : [],
          reviews: [
            { name: "Guest Review", rating: 4, comment: "Great hotel with excellent service." }
          ]
        };
        
        setHotel(formattedHotel);
        
        document.title = `${formattedHotel.name} - HotelInMountAbu`;
      } catch (error: any) {
        console.error("Error in fetching hotel data:", error);
        setError(error.message || "An unexpected error occurred");
        setHotel(null);
      } finally {
        setLoading(false);
      }
    };

    if (hotelSlug) {
      fetchHotelData();
    }
  }, [hotelSlug]);

  const handleInitiateBooking = () => {
    if (!checkInDate || !checkOutDate || !selectedRoom) {
      toast.error("Please fill in all required fields", {
        description: "Check-in date, check-out date and room type are required."
      });
      return;
    }

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

  const renderAmenityIcon = (amenity: string) => {
    switch (amenity.toLowerCase()) {
      case "wifi":
        return <Wifi className="h-4 w-4" />;
      case "breakfast":
        return <Coffee className="h-4 w-4" />;
      case "tv":
        return <Tv className="h-4 w-4" />;
      case "bathroom":
        return <Bath className="h-4 w-4" />;
      case "restaurant":
        return <Utensils className="h-4 w-4" />;
      case "gym":
        return <Dumbbell className="h-4 w-4" />;
      case "air conditioning":
        return <Snowflake className="h-4 w-4" />;
      case "parking":
        return <Car className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        <div className="relative h-[50vh] overflow-hidden">
          <img 
            src={hotel.images[0]} 
            alt={hotel.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/10 flex items-end">
            <div className="container-custom pb-12">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-2">{hotel.name}</h1>
              <div className="flex items-center text-white gap-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{hotel.location}</span>
                </div>
                <div className="flex items-center bg-white/20 px-2 py-1 rounded-lg">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span>{hotel.rating}</span>
                  <span className="text-sm ml-1">({hotel.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-10">
              <div className="grid grid-cols-3 gap-4">
                {hotel.images.slice(1, 4).map((image: string, index: number) => (
                  <img 
                    key={index}
                    src={image} 
                    alt={`${hotel.name} - image ${index + 2}`} 
                    className="w-full h-48 object-cover rounded-lg"
                  />
                ))}
              </div>
              
              <div>
                <h2 className="text-2xl font-display font-semibold mb-4">About this hotel</h2>
                <p className="text-stone-600 leading-relaxed">{hotel.description}</p>
              </div>
              
              <div>
                <h2 className="text-2xl font-display font-semibold mb-6">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {hotel.amenities.map((amenity: string, index: number) => (
                    <div key={index} className="flex items-center space-x-2 text-stone-600">
                      {renderAmenityIcon(amenity)}
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-display font-semibold mb-6">Available Rooms</h2>
                <div className="space-y-4">
                  {hotel.rooms.map((room: any, index: number) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-stone-100 flex justify-between items-center">
                      <div>
                        <h3 className="font-semibold text-lg">{room.type}</h3>
                        <p className="text-stone-500">Max {room.capacity} guests</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-semibold">₹{room.price}<span className="text-sm font-normal">/night</span></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-display font-semibold mb-6">Guest Reviews</h2>
                <div className="space-y-6">
                  {hotel.reviews.map((review: any, index: number) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-stone-100">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-semibold">{review.name}</h3>
                        <div className="flex items-center bg-primary/5 px-2 py-1 rounded">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>{review.rating}/5</span>
                        </div>
                      </div>
                      <p className="text-stone-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 border border-stone-100 sticky top-24">
                <h2 className="text-2xl font-display font-semibold mb-2">Book Your Stay</h2>
                <p className="text-2xl font-bold text-primary mb-6">₹{hotel.price}<span className="text-sm font-normal text-stone-500">/night</span></p>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="check-in" className="block text-sm font-medium text-stone-600 mb-1">Check-in Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                      <Input 
                        id="check-in"
                        type="date"
                        value={checkInDate}
                        onChange={(e) => setCheckInDate(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="check-out" className="block text-sm font-medium text-stone-600 mb-1">Check-out Date</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                      <Input 
                        id="check-out"
                        type="date"
                        value={checkOutDate}
                        onChange={(e) => setCheckOutDate(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-stone-600 mb-1">Guests</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                      <select
                        id="guests"
                        value={guests}
                        onChange={(e) => setGuests(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-md border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                      >
                        <option value="1">1 Guest</option>
                        <option value="2">2 Guests</option>
                        <option value="3">3 Guests</option>
                        <option value="4">4 Guests</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="room-type" className="block text-sm font-medium text-stone-600 mb-1">Room Type</label>
                    <select
                      id="room-type"
                      value={selectedRoom}
                      onChange={(e) => setSelectedRoom(e.target.value)}
                      className="w-full px-4 py-2 rounded-md border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                    >
                      <option value="">Select Room Type</option>
                      {hotel.rooms.map((room: any, index: number) => (
                        <option key={index} value={room.type}>
                          {room.type} - ₹{room.price}/night
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Room charges</span>
                    <span>₹{hotel.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Taxes & fees</span>
                    <span>₹{Math.round(hotel.price * 0.18)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total (per night)</span>
                    <span>₹{hotel.price + Math.round(hotel.price * 0.18)}</span>
                  </div>
                </div>
                
                <Button className="w-full" size="lg" onClick={handleInitiateBooking}>
                  Book Now
                </Button>
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
              Please provide your details to confirm your stay at {hotel?.name} from {checkInDate} to {checkOutDate} for {guests} guests.
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

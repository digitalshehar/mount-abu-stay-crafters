
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { EarlyHotel } from "@/components/admin/hotels/types/earlyHotel";
import Layout from "@/components/layout";
import { Clock, MapPin, Star, Check, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const EarlyHotelDetail = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<EarlyHotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedHours, setSelectedHours] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        setLoading(true);
        
        if (!hotelId) {
          setError("Hotel ID is missing");
          setLoading(false);
          return;
        }

        const { data, error } = await supabase
          .from("early_hotels")
          .select("*")
          .eq("id", hotelId)
          .eq("status", "active")
          .single();

        if (error) {
          console.error("Error fetching early hotel:", error);
          setError(error.message);
          setHotel(null);
        } else if (!data) {
          setError("Hotel not found");
          setHotel(null);
        } else {
          setHotel(data as EarlyHotel);
          setSelectedHours(data.min_hours);
          document.title = `${data.name} - Early Check-in Hotel`;
        }
      } catch (err) {
        console.error("Error in fetching hotel data:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [hotelId]);

  const handleBookNow = () => {
    if (!user) {
      toast.error("Please login to book this hotel");
      navigate("/auth", { state: { from: window.location.pathname } });
      return;
    }
    setIsBookingModalOpen(true);
  };

  const calculateTotalPrice = () => {
    if (!hotel) return 0;
    return hotel.hourly_rate * selectedHours;
  };

  const handleSubmitBooking = () => {
    toast.success("Booking successful!", {
      description: `You have booked ${hotel?.name} for ${selectedHours} hours.`
    });
    setIsBookingModalOpen(false);
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !hotel) {
    return (
      <Layout>
        <div className="container mx-auto py-16 text-center">
          <Info className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold mb-2">Hotel Not Found</h1>
          <p className="text-gray-600 mb-6">{error || "Unable to find the requested hotel"}</p>
          <Button onClick={() => navigate("/early-hotels")}>Browse Early Hotels</Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <title>{hotel.name} - Early Check-in Hotel</title>
        <meta name="description" content={`Book ${hotel.name} hourly. Perfect for early check-ins and day use stays in ${hotel.location}.`} />
      </Helmet>

      <div className="container mx-auto py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="lg:w-2/3">
            <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
            
            <div className="flex items-center text-gray-600 mb-6">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{hotel.location}</span>
              <div className="mx-2">•</div>
              <div className="flex items-center">
                {Array.from({ length: hotel.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>

            <div className="mb-8">
              <img 
                src={hotel.image} 
                alt={hotel.name} 
                className="w-full h-[400px] object-cover rounded-lg" 
              />
            </div>

            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold mb-3">About This Early Check-in Hotel</h2>
                <p className="text-gray-700 leading-relaxed">{hotel.description}</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Stay Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-primary mb-2">
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="font-medium">Hourly Rate</span>
                    </div>
                    <p className="text-gray-700">₹{hotel.hourly_rate} per hour</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center text-primary mb-2">
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="font-medium">Duration</span>
                    </div>
                    <p className="text-gray-700">Min: {hotel.min_hours} hours / Max: {hotel.max_hours} hours</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {hotel.amenities && hotel.amenities.length > 0 ? (
                    hotel.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="w-5 h-5 text-primary mr-2" />
                        <span>{amenity}</span>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 col-span-3">No amenities listed</p>
                  )}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-3">Early Check-in Policy</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                  <li>Valid government ID is required at check-in</li>
                  <li>Early check-in is subject to availability</li>
                  <li>No cancellations allowed after booking</li>
                  <li>Extensions may be allowed based on availability</li>
                  <li>Payment is due at the time of booking</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Book This Early Hotel</h3>
              
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Hourly Rate:</span>
                  <span className="font-semibold">₹{hotel.hourly_rate}</span>
                </div>
                
                <div className="flex justify-between mb-4">
                  <span className="text-gray-600">Number of Hours:</span>
                  <div className="flex items-center">
                    <button 
                      onClick={() => setSelectedHours(prev => Math.max(hotel.min_hours, prev - 1))}
                      className="px-2 py-1 bg-gray-200 rounded-l"
                      disabled={selectedHours <= hotel.min_hours}
                    >
                      -
                    </button>
                    <span className="px-4 py-1 border-t border-b">{selectedHours}</span>
                    <button 
                      onClick={() => setSelectedHours(prev => Math.min(hotel.max_hours, prev + 1))}
                      className="px-2 py-1 bg-gray-200 rounded-r"
                      disabled={selectedHours >= hotel.max_hours}
                    >
                      +
                    </button>
                  </div>
                </div>
                
                <div className="flex justify-between text-lg font-bold mb-4 border-t pt-4">
                  <span>Total:</span>
                  <span>₹{calculateTotalPrice()}</span>
                </div>
              </div>
              
              <Button 
                onClick={handleBookNow} 
                className="w-full bg-primary hover:bg-primary/90 text-white py-3"
              >
                Book Now
              </Button>
              
              <div className="mt-4 text-sm text-gray-600">
                <p className="flex items-center">
                  <Info className="w-4 h-4 mr-1 inline" />
                  Booking is non-refundable
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Your Booking</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Hotel:</span>
                <span className="font-semibold">{hotel.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Location:</span>
                <span>{hotel.location}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span>{selectedHours} hours</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Rate:</span>
                <span>₹{hotel.hourly_rate} per hour</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total Amount:</span>
                <span>₹{calculateTotalPrice()}</span>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBookingModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSubmitBooking}>Confirm Booking</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default EarlyHotelDetail;

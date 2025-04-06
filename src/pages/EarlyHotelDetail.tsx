
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { supabase } from "@/integrations/supabase/client";
import { EarlyHotel } from "@/components/admin/hotels/types/earlyHotel";
import Layout from "@/components/layout";
import { Clock, MapPin, Star, Check, Info, Calendar, Users, Share2, Camera, ArrowLeft, Bookmark, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const EarlyHotelDetail = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<EarlyHotel | null>(null);
  const [loading, setLoading] = useState(true);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedHours, setSelectedHours] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [similarHotels, setSimilarHotels] = useState<EarlyHotel[]>([]);
  const { user } = useAuth();
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");

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

          // Fetch similar hotels in the same location
          const { data: similarData } = await supabase
            .from("early_hotels")
            .select("*")
            .eq("status", "active")
            .eq("location", data.location)
            .neq("id", data.id)
            .limit(3);

          if (similarData) {
            setSimilarHotels(similarData as EarlyHotel[]);
          }
        }
      } catch (err) {
        console.error("Error in fetching hotel data:", err);
        setError("An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
    window.scrollTo(0, 0);
  }, [hotelId]);

  const handleBookNow = () => {
    if (!user) {
      toast.error("Please login to book this hotel");
      navigate("/auth", { state: { from: window.location.pathname } });
      return;
    }
    setGuestName(user.user_metadata?.full_name || "");
    setGuestEmail(user.email || "");
    setIsBookingModalOpen(true);
  };

  const calculateTotalPrice = () => {
    if (!hotel) return 0;
    return hotel.hourly_rate * selectedHours;
  };

  const handleSubmitBooking = () => {
    if (!guestName.trim() || !guestEmail.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    toast.success("Booking successful!", {
      description: `You have booked ${hotel?.name} for ${selectedHours} hours.`
    });
    setIsBookingModalOpen(false);
  };

  const handleShareHotel = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: hotel?.name || "Early Check-in Hotel",
          text: `Check out this hourly hotel in ${hotel?.location}`,
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

  const getRandomReviews = () => {
    const reviews = [
      { name: "Rahul Sharma", rating: 4.5, date: "March 2023", comment: "Perfect for my early morning arrival. Clean rooms and friendly staff." },
      { name: "Priya Patel", rating: 5, date: "April 2023", comment: "Great concept! I had a meeting in town and needed a place to freshen up for a few hours." },
      { name: "Amit Kumar", rating: 4, date: "February 2023", comment: "Convenient location and reasonable hourly rates. Would use again." }
    ];
    return reviews;
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

      {/* Breadcrumbs */}
      <div className="bg-stone-50 py-3 border-b">
        <div className="container mx-auto">
          <div className="flex items-center text-sm text-stone-500">
            <button onClick={() => navigate("/")} className="hover:text-primary">Home</button>
            <span className="mx-2">/</span>
            <button onClick={() => navigate("/early-hotels")} className="hover:text-primary">Early Hotels</button>
            <span className="mx-2">/</span>
            <span className="text-stone-700">{hotel.name}</span>
          </div>
        </div>
      </div>

      {/* Hotel Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto py-4">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => navigate("/early-hotels")} 
            className="mb-2 text-stone-500"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Early Hotels
          </Button>
          <h1 className="text-3xl font-bold mb-2">{hotel.name}</h1>
          
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="w-4 h-4 mr-1" />
            <span>{hotel.location}</span>
            <div className="mx-2">•</div>
            <div className="flex items-center">
              {Array.from({ length: hotel.stars }).map((_, i) => (
                <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <div className="mx-2">•</div>
            <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
              Early Check-in
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleShareHotel}
              className="flex items-center gap-2"
            >
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
            >
              <Bookmark className="h-4 w-4" />
              <span>Save</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="lg:w-2/3">
            <div className="mb-8 relative">
              <img 
                src={hotel.image} 
                alt={hotel.name} 
                className="w-full h-[400px] object-cover rounded-lg" 
              />
              <div className="absolute top-4 right-4">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white hover:bg-white/90"
                >
                  <Camera className="h-4 w-4 mr-2" />
                  View Photos
                </Button>
              </div>
              <div className="absolute bottom-4 left-4 bg-primary text-white px-3 py-1 rounded-full flex items-center text-sm">
                <Clock className="h-3 w-3 mr-1" />
                Pay-by-hour Hotel
              </div>
            </div>

            <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full mb-8">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="policies">Policies</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">About This Early Check-in Hotel</h2>
                  <p className="text-gray-700 leading-relaxed">
                    {hotel.description || `${hotel.name} offers convenient hourly booking, perfect for travelers with early arrivals, long layovers, or those needing a place to freshen up between meetings. Located in ${hotel.location}, this ${hotel.stars}-star accommodation provides comfort and convenience on your schedule.`}
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Stay Details</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="flex items-center text-primary mb-2">
                        <Clock className="w-5 h-5 mr-2" />
                        <span className="font-medium">Hourly Rate</span>
                      </div>
                      <p className="text-gray-700">₹{hotel.hourly_rate} per hour</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                      <div className="flex items-center text-primary mb-2">
                        <Clock className="w-5 h-5 mr-2" />
                        <span className="font-medium">Duration</span>
                      </div>
                      <p className="text-gray-700">Min: {hotel.min_hours} hours / Max: {hotel.max_hours} hours</p>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/5 p-4 rounded-lg border border-primary/10">
                  <div className="flex items-start">
                    <Award className="w-5 h-5 text-primary mt-1 mr-3" />
                    <div>
                      <h3 className="font-medium text-primary mb-1">Why Choose Hourly Bookings</h3>
                      <ul className="text-sm text-gray-700 space-y-1">
                        <li>• Perfect for early arrivals or late departures</li>
                        <li>• Ideal for business travelers needing a space between meetings</li>
                        <li>• Cost-effective alternative to full-day bookings</li>
                        <li>• All amenities of a regular hotel stay</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="amenities">
                <h2 className="text-xl font-semibold mb-4">Hotel Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                  {hotel.amenities && hotel.amenities.length > 0 ? (
                    hotel.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="w-5 h-5 text-primary mr-2" />
                        <span>{amenity}</span>
                      </div>
                    ))
                  ) : (
                    [
                      "WiFi", "Air Conditioning", "TV", "Attached Bathroom", 
                      "Clean Towels", "Hot Water", "Work Desk", "Tea/Coffee Maker"
                    ].map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="w-5 h-5 text-primary mr-2" />
                        <span>{amenity}</span>
                      </div>
                    ))
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="policies">
                <h2 className="text-xl font-semibold mb-4">Hotel Policies</h2>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="checkin">
                    <AccordionTrigger>Check-in Policy</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Valid government ID is required at check-in</li>
                        <li>Early check-in is subject to availability</li>
                        <li>Flexible check-in times based on your hourly booking</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="payment">
                    <AccordionTrigger>Payment & Cancellation</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>Payment is due at the time of booking</li>
                        <li>No cancellations allowed after booking</li>
                        <li>Extensions may be allowed based on availability (additional charges apply)</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="house">
                    <AccordionTrigger>House Rules</AccordionTrigger>
                    <AccordionContent>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>No smoking in rooms</li>
                        <li>Pets not allowed</li>
                        <li>Quiet hours must be respected</li>
                        <li>Damages may result in additional charges</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>
              
              <TabsContent value="reviews">
                <h2 className="text-xl font-semibold mb-4">Guest Reviews</h2>
                <div className="space-y-4">
                  {getRandomReviews().map((review, index) => (
                    <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-stone-100">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <h3 className="font-semibold">{review.name}</h3>
                          <p className="text-xs text-stone-500">{review.date}</p>
                        </div>
                        <div className="flex items-center bg-primary/5 px-2 py-1 rounded">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>{review.rating}/5</span>
                        </div>
                      </div>
                      <p className="text-stone-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Similar Hotels */}
            {similarHotels.length > 0 && (
              <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">More Early Hotels in {hotel.location}</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {similarHotels.map((similarHotel) => (
                    <div 
                      key={similarHotel.id} 
                      className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/early-hotel/${similarHotel.id}`)}
                    >
                      <div className="h-32 relative">
                        <img src={similarHotel.image} alt={similarHotel.name} className="w-full h-full object-cover" />
                        <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded text-xs font-medium flex items-center">
                          <Clock className="w-3 h-3 mr-1" />
                          ₹{similarHotel.hourly_rate}/hr
                        </div>
                      </div>
                      <div className="p-3">
                        <h3 className="font-medium text-sm mb-1 line-clamp-1">{similarHotel.name}</h3>
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span className="line-clamp-1">{similarHotel.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24 border border-gray-200">
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
              
              <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p className="flex items-center">
                  <Info className="w-4 h-4 mr-1 inline text-primary" />
                  Booking is non-refundable
                </p>
                <p className="flex items-center">
                  <Clock className="w-4 h-4 mr-1 inline text-primary" />
                  Flexible Check-in Time
                </p>
                <p className="flex items-center">
                  <Users className="w-4 h-4 mr-1 inline text-primary" />
                  Max 2 Guests per Room
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Dialog */}
      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Complete Your Booking</DialogTitle>
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

              <Separator />
              
              <div className="space-y-3">
                <div>
                  <Label htmlFor="guestName">Your Name*</Label>
                  <Input 
                    id="guestName" 
                    value={guestName} 
                    onChange={(e) => setGuestName(e.target.value)} 
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="guestEmail">Email Address*</Label>
                  <Input 
                    id="guestEmail" 
                    type="email" 
                    value={guestEmail} 
                    onChange={(e) => setGuestEmail(e.target.value)} 
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="guestPhone">Phone Number</Label>
                  <Input 
                    id="guestPhone" 
                    value={guestPhone} 
                    onChange={(e) => setGuestPhone(e.target.value)} 
                    placeholder="Enter your phone number"
                  />
                </div>
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

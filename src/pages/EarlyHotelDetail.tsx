
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/context/AuthContext';
import { useFavorites } from '@/hooks/useFavorites';
import { toast } from 'sonner';
import { Clock, MapPin, Star, Calendar, Users, Phone, Mail, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Layout from '@/components/layout';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HotelGallery from '@/components/hotel/detail/HotelGallery';

// Import the types we need
import { EarlyHotel } from '@/components/admin/hotels/types/earlyHotel';

// Interface for FAQ item
interface FAQ {
  id: number;
  question: string;
  answer: string;
}

// Interface for hotel image
interface HotelImage {
  id: number;
  hotel_id: number;
  image_url: string;
  is_primary: boolean;
  caption?: string;
}

const EarlyHotelDetail = () => {
  const { hotelId } = useParams<{ hotelId: string }>();
  const navigate = useNavigate();
  const [hotel, setHotel] = useState<EarlyHotel | null>(null);
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [showFullGallery, setShowFullGallery] = useState(false);
  const { user } = useAuth();
  const { favorites, removeFromFavorites, addToFavorites } = useFavorites(user);
  
  // Booking form state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [hours, setHours] = useState('2');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [showBookingSuccess, setShowBookingSuccess] = useState(false);
  const [bookingReference, setBookingReference] = useState('');
  
  // Check if the current hotel is in favorites
  const isFavorite = hotel && favorites.some(fav => 
    fav.item_type === 'early_hotel' && fav.item_id === hotel.id
  );

  const favoriteId = hotel && favorites.find(fav => 
    fav.item_type === 'early_hotel' && fav.item_id === hotel.id
  )?.id;

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        
        if (!hotelId) {
          setError("Hotel ID is missing");
          return;
        }
        
        // Fetch hotel details
        const { data: hotelData, error: hotelError } = await supabase
          .from('early_hotels')
          .select('*')
          .eq('id', hotelId)
          .single();
        
        if (hotelError) {
          throw hotelError;
        }
        
        if (!hotelData) {
          setError("Hotel not found");
          return;
        }
        
        setHotel(hotelData as EarlyHotel);
        
        // Fetch FAQs
        const { data: faqData, error: faqError } = await supabase
          .from('early_hotel_faqs')
          .select('*')
          .eq('hotel_id', hotelId)
          .order('display_order', { ascending: true });
          
        if (faqError) {
          console.error("Error fetching FAQs:", faqError);
        } else {
          setFaqs(faqData || []);
        }
        
        // Fetch images
        const { data: imageData, error: imageError } = await supabase
          .from('early_hotel_images')
          .select('*')
          .eq('hotel_id', hotelId)
          .order('display_order', { ascending: true });
          
        if (imageError) {
          console.error("Error fetching images:", imageError);
        } else if (imageData && imageData.length > 0) {
          setImages(imageData.map((img: HotelImage) => img.image_url));
        } else {
          // If no images, use the main hotel image
          setImages(hotelData.image ? [hotelData.image] : []);
        }
        
        document.title = `${hotelData.name} - Pay by Hour Hotel`;
      } catch (error: any) {
        console.error("Error fetching hotel data:", error);
        setError(error.message || "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    
    fetchHotelDetails();
  }, [hotelId]);

  const handleToggleFavorite = () => {
    if (!hotel) return;
    
    if (isFavorite && favoriteId) {
      removeFromFavorites(hotel.id, 'early_hotel');
      toast.info("Removed from favorites");
    } else if (addToFavorites) {
      addToFavorites(hotel.id, 'early_hotel');
      toast.success("Added to favorites");
    }
  };

  const handleBookNow = () => {
    setIsBookingOpen(true);
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!hotel) return;
    
    // Validation
    if (!date || !time || !name || !email || !phone || !hours) {
      toast.error("Please fill in all fields");
      return;
    }
    
    try {
      setIsBookingLoading(true);
      
      // Create a booking reference
      const bookingRef = `EH${Date.now().toString().slice(-6)}`;
      
      // Calculate total price
      const totalHours = parseInt(hours);
      const totalPrice = hotel.hourly_rate * totalHours;
      
      // In a real app, you would save this to a database
      // For demo purposes, we'll just simulate a successful booking
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setBookingReference(bookingRef);
      setIsBookingOpen(false);
      setShowBookingSuccess(true);
      
      // Reset form
      setDate('');
      setTime('');
      setHours('2');
    } catch (error) {
      console.error("Error creating booking:", error);
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setIsBookingLoading(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <div className="flex justify-center items-center min-h-[60vh]">
            <div className="animate-pulse space-y-8 w-full max-w-4xl">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-64 bg-gray-200 rounded"></div>
              <div className="space-y-4">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Error state
  if (error || !hotel) {
    return (
      <Layout>
        <div className="container-custom py-12">
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h1 className="text-2xl font-bold mb-4">Hotel Not Found</h1>
            <p className="text-gray-600 mb-6">
              {error || "We couldn't find the hotel you're looking for."}
            </p>
            <Button onClick={() => navigate('/early-hotels')}>
              Back to Early Hotels
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  // Format amenities for display
  const amenities = hotel.amenities || [];

  return (
    <>
      <Helmet>
        <title>{hotel.name} - Pay by Hour Hotel</title>
        <meta 
          name="description" 
          content={`Book ${hotel.name} by the hour in ${hotel.location}. Rates start at ₹${hotel.hourly_rate} per hour.`} 
        />
      </Helmet>

      <Header />

      <main className="pt-20 md:pt-28 pb-16 bg-gray-50">
        <div className="container-custom">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center mb-2 text-sm text-gray-600">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{hotel.location}</span>
                  <span className="mx-2">•</span>
                  <div className="flex items-center">
                    {Array.from({ length: hotel.stars }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">{hotel.name}</h1>
                <div className="flex items-center mt-2">
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm font-medium flex items-center">
                    <Clock className="w-3 h-3 mr-1" />
                    Pay by Hour
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={handleToggleFavorite}>
                  <svg 
                    className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                    fill={isFavorite ? 'currentColor' : 'none'}
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  {isFavorite ? 'Saved' : 'Save'}
                </Button>
                
                <Button variant="outline" size="sm">
                  <svg className="h-4 w-4 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Share
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <div className="space-y-6">
                  <HotelGallery 
                    images={images.length > 0 ? images : [hotel.image]} 
                    showFullGallery={showFullGallery} 
                    setShowFullGallery={setShowFullGallery} 
                  />
                  
                  <div className="bg-white rounded-lg p-5 border">
                    <h2 className="text-xl font-semibold mb-4">About this early check-in hotel</h2>
                    <p className="text-gray-700">{hotel.description}</p>
                  </div>
                  
                  <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="w-full grid grid-cols-2 md:grid-cols-4 h-auto">
                      <TabsTrigger value="overview" className="py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white">Overview</TabsTrigger>
                      <TabsTrigger value="amenities" className="py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white">Amenities</TabsTrigger>
                      <TabsTrigger value="faqs" className="py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white">FAQs</TabsTrigger>
                      <TabsTrigger value="location" className="py-2.5 data-[state=active]:bg-primary data-[state=active]:text-white">Location</TabsTrigger>
                    </TabsList>
                    
                    <div className="mt-6">
                      <TabsContent value="overview">
                        <Card>
                          <CardHeader>
                            <CardTitle>Hotel Overview</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <Clock className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <h3 className="font-medium">Hourly Rate</h3>
                                    <p className="text-lg font-semibold text-primary">₹{hotel.hourly_rate} per hour</p>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                  </div>
                                  <div>
                                    <h3 className="font-medium">Booking Duration</h3>
                                    <p className="text-gray-700">Minimum {hotel.min_hours} hours, Maximum {hotel.max_hours} hours</p>
                                  </div>
                                </div>
                              </div>
                              
                              <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <Star className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <h3 className="font-medium">Star Rating</h3>
                                    <div className="flex items-center">
                                      {Array.from({ length: hotel.stars }).map((_, i) => (
                                        <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                                      ))}
                                    </div>
                                  </div>
                                </div>
                                
                                <div className="flex items-center space-x-3">
                                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <MapPin className="h-5 w-5" />
                                  </div>
                                  <div>
                                    <h3 className="font-medium">Location</h3>
                                    <p className="text-gray-700">{hotel.location}</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            <Separator />
                            
                            <div>
                              <h3 className="font-medium mb-4">How It Works</h3>
                              <ol className="space-y-4">
                                <li className="flex items-start">
                                  <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center mr-3 flex-shrink-0">
                                    1
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Book your hours</h4>
                                    <p className="text-sm text-gray-600">Select the date, time, and number of hours you need the room for.</p>
                                  </div>
                                </li>
                                
                                <li className="flex items-start">
                                  <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center mr-3 flex-shrink-0">
                                    2
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Receive confirmation</h4>
                                    <p className="text-sm text-gray-600">Get instant confirmation with your booking details.</p>
                                  </div>
                                </li>
                                
                                <li className="flex items-start">
                                  <div className="h-6 w-6 rounded-full bg-primary text-white flex items-center justify-center mr-3 flex-shrink-0">
                                    3
                                  </div>
                                  <div>
                                    <h4 className="font-medium">Check-in & enjoy</h4>
                                    <p className="text-sm text-gray-600">Arrive at your booked time and present your booking reference.</p>
                                  </div>
                                </li>
                              </ol>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="amenities">
                        <Card>
                          <CardHeader>
                            <CardTitle>Hotel Amenities</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {amenities.length === 0 ? (
                              <p className="text-gray-500 text-center py-4">Amenity information not available</p>
                            ) : (
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                  <h3 className="font-medium mb-3">Basic Amenities</h3>
                                  <ul className="space-y-2">
                                    {amenities.slice(0, Math.ceil(amenities.length / 2)).map((amenity, index) => (
                                      <li key={index} className="flex items-center text-gray-700">
                                        <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        {amenity}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                
                                {amenities.length > 1 && (
                                  <div>
                                    <h3 className="font-medium mb-3">Additional Amenities</h3>
                                    <ul className="space-y-2">
                                      {amenities.slice(Math.ceil(amenities.length / 2)).map((amenity, index) => (
                                        <li key={index} className="flex items-center text-gray-700">
                                          <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                          </svg>
                                          {amenity}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="faqs">
                        <Card>
                          <CardHeader>
                            <CardTitle>Frequently Asked Questions</CardTitle>
                          </CardHeader>
                          <CardContent>
                            {faqs.length === 0 ? (
                              <div>
                                <p className="text-gray-500 text-center py-4">No FAQs available for this hotel</p>
                                <div className="space-y-4 mt-4">
                                  <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">What is the minimum booking duration?</h3>
                                    <p className="text-gray-600">You can book this hotel for a minimum of {hotel.min_hours} {hotel.min_hours === 1 ? 'hour' : 'hours'}.</p>
                                  </div>
                                  
                                  <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Is ID proof required for check-in?</h3>
                                    <p className="text-gray-600">Yes, a valid government ID proof is required at the time of check-in.</p>
                                  </div>
                                  
                                  <div className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">Can I extend my stay?</h3>
                                    <p className="text-gray-600">Yes, you can extend your stay subject to availability. Additional charges will apply based on the hourly rate.</p>
                                  </div>
                                </div>
                              </div>
                            ) : (
                              <div className="space-y-4">
                                {faqs.map((faq) => (
                                  <div key={faq.id} className="p-4 border rounded-lg">
                                    <h3 className="font-medium mb-2">{faq.question}</h3>
                                    <p className="text-gray-600">{faq.answer}</p>
                                  </div>
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      </TabsContent>
                      
                      <TabsContent value="location">
                        <Card>
                          <CardHeader>
                            <CardTitle>Location</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="aspect-video relative rounded-md overflow-hidden border mb-4">
                              <iframe
                                src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(hotel.location)},Mount+Abu&zoom=15`}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="absolute inset-0"
                              />
                            </div>
                            
                            <div className="flex items-start space-x-2 mb-4">
                              <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                              <div>
                                <h3 className="font-medium">Address</h3>
                                <p className="text-gray-600">{hotel.name}, {hotel.location}, Mount Abu, Rajasthan, India</p>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center space-x-2">
                                <Phone className="h-5 w-5 text-primary flex-shrink-0" />
                                <div>
                                  <h3 className="font-medium">Phone</h3>
                                  <p className="text-gray-600">+91 2974 123456</p>
                                </div>
                              </div>
                              
                              <div className="flex items-center space-x-2">
                                <Mail className="h-5 w-5 text-primary flex-shrink-0" />
                                <div>
                                  <h3 className="font-medium">Email</h3>
                                  <p className="text-gray-600">info@hotelinmountabu.com</p>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </div>
              
              <div>
                <div className="sticky top-32">
                  <Card>
                    <CardHeader>
                      <CardTitle>Book This Hotel</CardTitle>
                      <CardDescription>Pay by the hour, no need to book for the entire day</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-lg font-semibold">₹{hotel.hourly_rate}</span>
                        <span className="text-gray-500">per hour</span>
                      </div>
                      
                      <div className="bg-gray-50 p-3 rounded-md">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 text-primary mr-2" />
                            <span className="text-sm font-medium">Booking Duration</span>
                          </div>
                          <span className="text-sm">{hotel.min_hours}-{hotel.max_hours} hours</span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Users className="h-4 w-4 text-primary mr-2" />
                            <span className="text-sm font-medium">Max Occupancy</span>
                          </div>
                          <span className="text-sm">2 Guests</span>
                        </div>
                      </div>
                      
                      <Button className="w-full" onClick={handleBookNow}>
                        Book Now
                      </Button>
                      
                      <div className="text-xs text-gray-500 text-center">
                        No credit card required to book. Pay at hotel.
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Booking Dialog */}
      <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Book Hotel by Hour</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input 
                    id="date" 
                    type="date" 
                    required
                    className="pl-10" 
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="time">Start Time</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input 
                    id="time" 
                    type="time" 
                    required
                    className="pl-10" 
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="hours">Number of Hours</Label>
              <Select value={hours} onValueChange={setHours}>
                <SelectTrigger>
                  <SelectValue placeholder="Select hours" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: hotel.max_hours - hotel.min_hours + 1 }, (_, i) => hotel.min_hours + i).map(num => (
                    <SelectItem key={num} value={num.toString()}>
                      {num} {num === 1 ? 'hour' : 'hours'} (₹{hotel.hourly_rate * num})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input 
                id="name" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input 
                  id="phone" 
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            
            <Separator />
            
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Rate per hour</span>
              <span>₹{hotel.hourly_rate}</span>
            </div>
            
            <div className="flex justify-between font-semibold">
              <span>Total ({hours} {parseInt(hours) === 1 ? 'hour' : 'hours'})</span>
              <span className="text-primary">₹{hotel.hourly_rate * parseInt(hours || '0')}</span>
            </div>
            
            <DialogFooter>
              <Button type="submit" className="w-full" disabled={isBookingLoading}>
                {isBookingLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Complete Booking
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
      
      {/* Booking Success Dialog */}
      <Dialog open={showBookingSuccess} onOpenChange={setShowBookingSuccess}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-4">
            <div className="mx-auto h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <DialogTitle className="text-xl">Booking Confirmed!</DialogTitle>
            <p className="text-gray-500 mt-2">Your hotel has been booked successfully</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-md mb-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Booking Reference</span>
                <span className="font-semibold">{bookingReference}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Hotel</span>
                <span>{hotel.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Date</span>
                <span>{date}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Time</span>
                <span>{time}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Duration</span>
                <span>{hours} {parseInt(hours) === 1 ? 'hour' : 'hours'}</span>
              </div>
              <div className="flex justify-between text-sm font-semibold">
                <span>Total Amount</span>
                <span>₹{hotel.hourly_rate * parseInt(hours || '0')}</span>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-gray-500 text-center">
            Please present your booking reference at the reception. You'll receive a confirmation email shortly.
          </p>
          
          <DialogFooter className="flex-col sm:flex-row sm:justify-center sm:space-x-2">
            <Button variant="outline" onClick={() => setShowBookingSuccess(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EarlyHotelDetail;

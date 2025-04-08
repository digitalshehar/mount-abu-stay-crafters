
import React, { useState } from 'react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, Clock, MapPin, Info, Wifi, Coffee, Tv, Car, BedDouble } from "lucide-react";
import { EarlyHotel } from "@/components/admin/hotels/types/earlyHotel";
import { useEarlyHotelBooking } from "@/hooks/useEarlyHotelBooking";
import { toast } from "sonner";

interface EarlyHotelDetailsProps {
  hotel: EarlyHotel | null;
  isLoading?: boolean;
}

const EarlyHotelDetails: React.FC<EarlyHotelDetailsProps> = ({ hotel, isLoading = false }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const {
    showBookingForm,
    setShowBookingForm,
    selectedHours,
    setSelectedHours,
    handleInitiateBooking,
    calculateTotalPrice
  } = useEarlyHotelBooking(hotel);

  const renderAmenities = (amenities: string[] | undefined) => {
    if (!amenities || amenities.length === 0) {
      return <p className="text-muted-foreground">No amenities listed</p>;
    }

    // Map amenities to icons
    const amenityIcons: Record<string, React.ReactNode> = {
      "WiFi": <Wifi className="h-4 w-4" />,
      "Breakfast": <Coffee className="h-4 w-4" />,
      "TV": <Tv className="h-4 w-4" />,
      "Parking": <Car className="h-4 w-4" />,
      "Room Service": <BedDouble className="h-4 w-4" />
    };

    return (
      <div className="grid grid-cols-2 gap-2">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center gap-2">
            <span className="text-primary">
              {amenityIcons[amenity] || <Info className="h-4 w-4" />}
            </span>
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="container max-w-6xl mx-auto py-8 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="h-64 bg-gray-200 rounded mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="h-12 bg-gray-200 rounded mb-4"></div>
            <div className="h-32 bg-gray-200 rounded mb-4"></div>
          </div>
          <div>
            <div className="h-48 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="container max-w-6xl mx-auto py-12">
        <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Hotel Not Found</h2>
              <p className="text-muted-foreground">
                The hotel you are looking for could not be found or may have been removed.
              </p>
              <Button className="mt-4" onClick={() => window.history.back()}>
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleHoursChange = (hours: number) => {
    if (hotel) {
      const minHours = hotel.min_hours;
      const maxHours = hotel.max_hours;
      
      if (hours < minHours) {
        toast.info(`Minimum booking is ${minHours} hours`);
        setSelectedHours(minHours);
      } else if (hours > maxHours) {
        toast.info(`Maximum booking is ${maxHours} hours`);
        setSelectedHours(maxHours);
      } else {
        setSelectedHours(hours);
      }
    }
  };

  return (
    <div className="container max-w-6xl mx-auto py-8">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">{hotel.name}</h1>
            <div className="flex items-center mt-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 mr-1" />
              <span>{hotel.location}</span>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                {Array.from({ length: hotel.stars }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-amber-400 fill-amber-400" />
                ))}
              </div>
            </div>
          </div>
          
          {hotel.status === 'active' && (
            <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
              Available
            </Badge>
          )}
          
          {hotel.featured && (
            <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
              Featured
            </Badge>
          )}
        </div>
        
        <div className="aspect-[16/7] overflow-hidden rounded-xl bg-slate-100">
          {hotel.image ? (
            <img 
              src={hotel.image} 
              alt={hotel.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <p className="text-muted-foreground">No image available</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="policies">Policies</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>About this hotel</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{hotel.description}</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Stay by the Hour</CardTitle>
                  <CardDescription>
                    Perfect for short stays, business meetings, or day use
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>Minimum booking: {hotel.min_hours} hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>Maximum booking: {hotel.max_hours} hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Info className="h-4 w-4 text-primary" />
                      <span>Rate: ₹{hotel.hourly_rate} per hour</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="amenities">
              <Card>
                <CardHeader>
                  <CardTitle>Amenities</CardTitle>
                  <CardDescription>
                    Facilities available during your stay
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {renderAmenities(hotel.amenities)}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="policies">
              <Card>
                <CardHeader>
                  <CardTitle>Policies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-medium">Check-in & Check-out</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Flexible check-in based on availability. Check-out time depends on your booking duration.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Cancellation Policy</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Free cancellation up to 1 hour before your scheduled check-in time.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Payment</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Pay at the hotel. All major credit cards accepted.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Book Your Stay</CardTitle>
              <CardDescription>
                Select the number of hours for your stay
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span>Hours:</span>
                    <div className="flex items-center space-x-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleHoursChange(selectedHours - 1)}
                        disabled={selectedHours <= hotel.min_hours}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{selectedHours}</span>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        onClick={() => handleHoursChange(selectedHours + 1)}
                        disabled={selectedHours >= hotel.max_hours}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  
                  <div className="text-sm text-muted-foreground mb-4">
                    {hotel.min_hours} hours minimum, {hotel.max_hours} hours maximum
                  </div>
                  
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Rate per hour:</span>
                      <span>₹{hotel.hourly_rate}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>{selectedHours} hours:</span>
                      <span>₹{hotel.hourly_rate * selectedHours}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span>Taxes (18%):</span>
                      <span>₹{Math.round(hotel.hourly_rate * selectedHours * 0.18)}</span>
                    </div>
                    
                    <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                      <span>Total:</span>
                      <span>₹{calculateTotalPrice(hotel, selectedHours)}</span>
                    </div>
                  </div>
                </div>
                
                <Button 
                  className="w-full" 
                  onClick={handleInitiateBooking}
                >
                  Book Now
                </Button>
                
                <p className="text-xs text-center text-muted-foreground">
                  No credit card required. Pay at the hotel.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EarlyHotelDetails;

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Calendar, Users, MapPin, ArrowLeft, Car, Settings, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { CarRental } from "@/integrations/supabase/custom-types";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import FavoriteButton from "@/components/FavoriteButton";
import BookingForm, { BookingFormValues } from "@/components/BookingForm";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";

const CarRentalDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const { user } = useAuth();
  const [car, setCar] = useState<CarRental | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{ pickup: string; dropoff: string }>({
    pickup: "",
    dropoff: ""
  });
  const [totalDays, setTotalDays] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    const fetchCar = async () => {
      setIsLoading(true);
      try {
        const carId = parseInt(id || '0', 10);
        
        const { data, error } = await supabase
          .from('car_rentals')
          .select('*')
          .eq('id', carId)
          .single();

        if (error) throw error;

        if (data) {
          let carStatus: 'available' | 'booked' | 'maintenance' = 'available';
          
          if (data.status === 'booked' || data.status === 'maintenance') {
            carStatus = data.status;
          }
          
          const slug = data.name.toLowerCase().replace(/\s+/g, '-');
          
          document.title = `${data.name} - Mount Abu Car Rental`;
          
          setCar({
            id: data.id,
            name: data.name,
            type: data.type,
            capacity: data.capacity,
            transmission: data.transmission,
            price: parseFloat(data.price.toString()),
            image: data.image,
            bookings: data.bookings || 0,
            status: carStatus,
            description: data.description || '',
            slug: slug
          });
        }
      } catch (error) {
        console.error("Error fetching car:", error);
        toast({
          title: "Error",
          description: "Failed to load car details. Please try again.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCar();
    }
  }, [id, toast]);

  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      
      dates.push({ value: dateString, label: dateString });
    }
    
    return dates;
  };

  useEffect(() => {
    if (selectedDates.pickup && selectedDates.dropoff && car) {
      const pickup = new Date(selectedDates.pickup);
      const dropoff = new Date(selectedDates.dropoff);
      
      const diffTime = Math.abs(dropoff.getTime() - pickup.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      setTotalDays(diffDays || 1);
      setTotalPrice(car.price * (diffDays || 1));
    } else if (car) {
      setTotalPrice(car.price);
    }
  }, [selectedDates, car]);

  const handleInitiateBooking = () => {
    if (!selectedDates.pickup || !selectedDates.dropoff) {
      toast({
        title: "Please select both pickup and drop-off dates",
        description: "Both dates are required to complete your booking.",
        variant: "destructive"
      });
      return;
    }
    
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to complete your booking.",
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
      
      toast({
        title: "Booking Successful!",
        description: `Your ${car?.name} is booked from ${selectedDates.pickup} to ${selectedDates.dropoff}.`,
      });
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="container-custom py-12">
        <div className="bg-white rounded-xl shadow-sm p-8 animate-pulse">
          <div className="h-8 bg-stone-200 rounded w-1/3 mb-4"></div>
          <div className="h-64 bg-stone-200 rounded mb-4"></div>
          <div className="h-4 bg-stone-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-stone-200 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="container-custom py-12">
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <h1 className="text-2xl font-bold mb-4">Car Not Found</h1>
          <p className="text-stone-500 mb-6">Sorry, we couldn't find the car you're looking for.</p>
          <Link to="/rentals/car" className="inline-flex items-center text-primary hover:underline">
            <ArrowLeft size={16} className="mr-2" /> Back to Car Rentals
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <Link to="/rentals/car" className="inline-flex items-center text-primary hover:underline mb-6">
        <ArrowLeft size={16} className="mr-2" /> Back to Car Rentals
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="relative h-96">
              <img 
                src={car.image} 
                alt={car.name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 flex space-x-2">
                {car.status !== 'available' && (
                  <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {car.status === 'booked' ? 'Currently Booked' : 'Under Maintenance'}
                  </div>
                )}
                <FavoriteButton 
                  itemId={car.id} 
                  itemType="car" 
                  variant="outline"
                  className="bg-white/80 hover:bg-white"
                />
              </div>
            </div>
            
            <div className="p-6">
              <h1 className="font-display font-bold text-3xl mb-2">{car.name}</h1>
              <div className="flex flex-wrap gap-4 text-sm text-stone-500 mb-6">
                <div className="flex items-center">
                  <Car size={16} className="mr-1" />
                  <span>{car.type}</span>
                </div>
                <div className="flex items-center">
                  <Settings size={16} className="mr-1" />
                  <span>{car.transmission}</span>
                </div>
                <div className="flex items-center">
                  <Users size={16} className="mr-1" />
                  <span>{car.capacity} Seats</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  <span>Mount Abu</span>
                </div>
              </div>
              
              <Separator className="mb-6" />
              
              <h2 className="font-display font-bold text-xl mb-4">Car Description</h2>
              <p className="text-stone-600 mb-6">{car.description || "Explore Mount Abu in comfort with this reliable and well-maintained vehicle. Perfect for families and small groups."}</p>
              
              <h2 className="font-display font-bold text-xl mb-4">Features & Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                {['Air Conditioning', 'Bluetooth', 'USB Charger', 'Music System', 'Central Locking', 'Power Windows'].map((feature, index) => (
                  <div key={index} className="flex items-center text-stone-600">
                    <CheckCircle size={16} className="text-primary mr-2" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <Separator className="mb-6" />
              
              <h2 className="font-display font-bold text-xl mb-4">Rental Terms</h2>
              <ul className="list-disc list-inside text-stone-600 space-y-2 mb-6">
                <li>Valid driving license required</li>
                <li>Security deposit: ₹2,000 (refundable)</li>
                <li>Fuel policy: Same-to-same</li>
                <li>Free cancellation up to 24 hours before pickup</li>
                <li>Unlimited kilometers</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 border border-stone-100 sticky top-24">
            <h2 className="text-2xl font-display font-semibold mb-2">Book This Car</h2>
            <p className="text-2xl font-bold text-primary mb-6">₹{car.price}<span className="text-sm font-normal text-stone-500">/day</span></p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label htmlFor="pickup-date" className="block text-sm font-medium text-stone-600 mb-1">Pickup Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                  <select
                    id="pickup-date"
                    value={selectedDates.pickup}
                    onChange={(e) => setSelectedDates(prev => ({ ...prev, pickup: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 rounded-md border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                  >
                    <option value="">Select pickup date</option>
                    {generateDates().map((date) => (
                      <option key={`pickup-${date.value}`} value={date.value} disabled={selectedDates.dropoff && new Date(date.value) > new Date(selectedDates.dropoff)}>
                        {date.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="dropoff-date" className="block text-sm font-medium text-stone-600 mb-1">Drop-off Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                  <select
                    id="dropoff-date"
                    value={selectedDates.dropoff}
                    onChange={(e) => setSelectedDates(prev => ({ ...prev, dropoff: e.target.value }))}
                    className="w-full pl-10 pr-4 py-2 rounded-md border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                  >
                    <option value="">Select drop-off date</option>
                    {generateDates().map((date) => (
                      <option key={`dropoff-${date.value}`} value={date.value} disabled={selectedDates.pickup && new Date(date.value) < new Date(selectedDates.pickup)}>
                        {date.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <Separator className="my-6" />
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-stone-600">Car rental fee</span>
                <span>₹{car.price} × {totalDays} {totalDays === 1 ? 'day' : 'days'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600">Taxes & fees</span>
                <span>₹{Math.round(totalPrice * 0.05)}</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>₹{Math.round(totalPrice * 1.05)}</span>
              </div>
            </div>
            
            <Button 
              className="w-full" 
              size="lg" 
              onClick={handleInitiateBooking}
              disabled={car.status !== 'available'}
            >
              {car.status === 'available' ? 'Book Now' : 'Not Available'}
            </Button>
            
            <div className="mt-4 text-sm text-stone-500">
              <p className="flex items-center mb-1">
                <Calendar className="h-3 w-3 mr-1" />
                <span>Free cancellation up to 24 hours before pickup</span>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Complete Your Car Rental</DialogTitle>
            <DialogDescription>
              Please provide your details to rent the {car?.name} from {selectedDates.pickup} to {selectedDates.dropoff}.
            </DialogDescription>
          </DialogHeader>
          
          <BookingForm 
            onSubmit={handleBookingSubmit} 
            isLoading={isBookingLoading} 
            bookingType="car" 
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CarRentalDetail;

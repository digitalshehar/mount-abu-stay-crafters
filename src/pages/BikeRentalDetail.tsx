import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Bike, MapPin, ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { BikeRental } from "@/integrations/supabase/custom-types";
import { format } from "date-fns";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import BookingForm, { BookingFormValues } from "@/components/BookingForm";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const BikeRentalDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [bike, setBike] = useState<BikeRental | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rentalDays, setRentalDays] = useState(1);
  const [startDate, setStartDate] = useState<Date | undefined>(undefined);
  const [endDate, setEndDate] = useState<Date | undefined>(undefined);
  const [dateOpen, setDateOpen] = useState(false);
  const [dateRange, setDateRange] = useState<string>("");
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isBookingLoading, setIsBookingLoading] = useState(false);

  useEffect(() => {
    const fetchBike = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from("bike_rentals")
          .select("*")
          .eq("id", parseInt(id as string))
          .single();

        if (error) throw error;
        
        const bikeData = data as BikeRental;
        const slug = bikeData.name.toLowerCase().replace(/\s+/g, '-');
        
        document.title = `${bikeData.name} - Mount Abu Bike Rental`;
        
        setBike({
          ...bikeData,
          slug: slug
        });
      } catch (error) {
        console.error("Error fetching bike details:", error);
        toast({
          title: "Error",
          description: "Failed to load bike details",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchBike();
    }
  }, [id, toast]);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (!startDate) {
      setStartDate(selectedDate);
      setEndDate(undefined);
    } else if (selectedDate && selectedDate >= startDate) {
      setEndDate(selectedDate);
      
      const diffTime = Math.abs(selectedDate.getTime() - startDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setRentalDays(diffDays);
      
      const formattedRange = `${format(startDate, "MMM dd, yyyy")} — ${format(selectedDate, "MMM dd, yyyy")}`;
      setDateRange(formattedRange);
      
      setDateOpen(false);
    } else {
      setStartDate(selectedDate);
      setEndDate(undefined);
    }
  };

  const handleInitiateBooking = () => {
    if (!startDate || !endDate) {
      toast({
        title: "Please select dates",
        description: "You need to select both pickup and return dates",
        variant: "destructive",
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
        title: "Booking confirmed",
        description: `You have booked the ${bike?.name} for ${rentalDays} days from ${format(startDate, "MMM dd")} to ${format(endDate, "MMM dd")}`,
      });
    }, 1500);
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-10">
          <div className="container-custom">
            <div className="animate-pulse">
              <div className="h-8 bg-stone-200 rounded w-64 mb-4"></div>
              <div className="h-48 bg-stone-200 rounded mb-6"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-2">
                  <div className="h-6 bg-stone-200 rounded w-1/2 mb-4"></div>
                  <div className="h-4 bg-stone-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-stone-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-stone-200 rounded w-3/4 mb-6"></div>
                </div>
                <div>
                  <div className="h-64 bg-stone-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!bike) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-10">
          <div className="container-custom text-center">
            <h1 className="text-2xl font-bold mb-4">Bike Not Found</h1>
            <p className="mb-6">The bike you're looking for doesn't exist or has been removed.</p>
            <Link to="/rentals/bike">
              <Button>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to All Bikes
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        <div className="bg-stone-50 py-4">
          <div className="container-custom">
            <Link to="/rentals/bike" className="inline-flex items-center text-primary hover:underline mb-2">
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to All Bikes
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold">{bike.name}</h1>
            <div className="flex items-center text-stone-500 text-sm mt-1">
              <Bike className="h-4 w-4 mr-1" />
              <span className="mr-3">{bike.type}</span>
              <span>{bike.engine}</span>
            </div>
          </div>
        </div>

        <div className="container-custom py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <div className="rounded-xl overflow-hidden mb-8 h-96">
                <img src={bike.image} alt={bike.name} className="w-full h-full object-cover" />
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">About this Bike</h2>
                {bike.description ? (
                  <p className="text-stone-600">{bike.description}</p>
                ) : (
                  <p className="text-stone-600">
                    Experience the thrill of riding the {bike.name}, a {bike.type} bike with a powerful {bike.engine} engine. 
                    Perfect for navigating the scenic roads of Mount Abu, this bike offers a comfortable ride with 
                    excellent handling and fuel efficiency.
                  </p>
                )}
              </div>

              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">Specifications</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-stone-50 p-4 rounded-lg">
                    <p className="text-stone-500 text-sm">Type</p>
                    <p className="font-medium">{bike.type}</p>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-lg">
                    <p className="text-stone-500 text-sm">Engine</p>
                    <p className="font-medium">{bike.engine}</p>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-lg">
                    <p className="text-stone-500 text-sm">Status</p>
                    <p className="font-medium capitalize">{bike.status}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-4">Rental Policies</h2>
                <ul className="list-disc list-inside space-y-2 text-stone-600">
                  <li>Valid driver's license required</li>
                  <li>Security deposit of ₹2000 required (refundable)</li>
                  <li>Minimum rental period is 4 hours</li>
                  <li>Fuel is provided with a full tank</li>
                  <li>Helmet provided free of charge</li>
                  <li>Late returns incur additional charges</li>
                </ul>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-3">Rental Details</h3>
                <div className="flex justify-between items-center mb-4 pb-4 border-b">
                  <p>Price per day</p>
                  <p className="text-xl font-bold text-primary">₹{bike.price}</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Pick-up & Return Location</label>
                    <div className="flex items-center border rounded-md p-3 bg-stone-50">
                      <MapPin className="text-stone-400 mr-2 h-5 w-5" />
                      <span>Mount Abu Central</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Pick-up & Return Date</label>
                    <Popover open={dateOpen} onOpenChange={setDateOpen}>
                      <PopoverTrigger asChild>
                        <div className="flex items-center border rounded-md p-3 bg-stone-50 cursor-pointer">
                          <Calendar className="text-stone-400 mr-2 h-5 w-5" />
                          <span>{dateRange || "Select dates"}</span>
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={endDate || startDate}
                          onSelect={handleDateSelect}
                          disabled={(date) => date < new Date()}
                          initialFocus
                          className="p-3 pointer-events-auto"
                          footer={
                            <div className="px-4 pt-2 pb-4 text-sm text-muted-foreground">
                              {!startDate ? "Select pickup date" : !endDate ? "Now select return date" : ""}
                            </div>
                          }
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Rental Duration ({rentalDays} {rentalDays === 1 ? 'day' : 'days'})</label>
                    <div className="flex items-center">
                      <button 
                        className="w-10 h-10 rounded-l-md border flex items-center justify-center bg-stone-50 hover:bg-stone-100"
                        onClick={() => setRentalDays(Math.max(1, rentalDays - 1))}
                        disabled={!!startDate && !!endDate}
                      >-</button>
                      <div className="h-10 w-12 border-t border-b flex items-center justify-center">
                        {rentalDays}
                      </div>
                      <button 
                        className="w-10 h-10 rounded-r-md border flex items-center justify-center bg-stone-50 hover:bg-stone-100"
                        onClick={() => setRentalDays(rentalDays + 1)}
                        disabled={!!startDate && !!endDate}
                      >+</button>
                    </div>
                  </div>
                </div>

                <div className="border-t pt-4 mb-6">
                  <div className="flex justify-between mb-2">
                    <span>₹{bike.price} × {rentalDays} days</span>
                    <span>₹{bike.price * rentalDays}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Security deposit</span>
                    <span>₹2,000</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Insurance</span>
                    <span>₹300</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg mt-4">
                    <span>Total</span>
                    <span>₹{bike.price * rentalDays + 2000 + 300}</span>
                  </div>
                </div>

                <Button className="w-full" size="lg" onClick={handleInitiateBooking}>
                  Book Now
                </Button>
                <p className="text-center text-xs text-stone-500 mt-3">
                  You won't be charged yet
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Dialog open={showBookingForm} onOpenChange={setShowBookingForm}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Complete Your Bike Rental</DialogTitle>
            <DialogDescription>
              Please provide your details to rent the {bike?.name} from {startDate ? format(startDate, "MMM dd, yyyy") : ""} to {endDate ? format(endDate, "MMM dd, yyyy") : ""}.
            </DialogDescription>
          </DialogHeader>
          
          <BookingForm 
            onSubmit={handleBookingSubmit} 
            isLoading={isBookingLoading} 
            bookingType="bike" 
          />
        </DialogContent>
      </Dialog>
      
      <Footer />
    </>
  );
};

export default BikeRentalDetail;


import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Calendar, MapPin, Car, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { CarRental } from "@/integrations/supabase/custom-types";

const CarRentalDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [car, setCar] = useState<CarRental | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [location, setLocation] = useState("Mount Abu");

  useEffect(() => {
    const fetchCarDetails = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('car_rentals')
          .select('*')
          .eq('id', id)
          .single();
        
        if (error) throw error;
        
        setCar(data as CarRental);
      } catch (error) {
        console.error("Error fetching car details:", error);
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
      fetchCarDetails();
    }
  }, [id, toast]);

  const handleBooking = (e) => {
    e.preventDefault();
    
    if (!pickupDate || !returnDate) {
      toast({
        title: "Missing dates",
        description: "Please select pickup and return dates",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Booking initiated",
      description: "Your booking request has been received. We'll contact you shortly.",
    });
  };

  const calculateTotalPrice = () => {
    if (!car || !pickupDate || !returnDate) return 0;
    
    const start = new Date(pickupDate);
    const end = new Date(returnDate);
    const diffDays = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    
    return car.price * diffDays;
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-10">
          <div className="container-custom">
            <div className="animate-pulse">
              <div className="h-8 bg-stone-200 rounded w-1/3 mb-6"></div>
              <div className="h-80 bg-stone-200 rounded mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="col-span-2 space-y-4">
                  <div className="h-6 bg-stone-200 rounded w-2/3"></div>
                  <div className="h-6 bg-stone-200 rounded w-1/2"></div>
                  <div className="h-6 bg-stone-200 rounded w-3/4"></div>
                </div>
                <div className="h-64 bg-stone-200 rounded"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!car) {
    return (
      <>
        <Header />
        <main className="min-h-screen py-10">
          <div className="container-custom text-center py-20">
            <h1 className="title-medium mb-4">Car Not Found</h1>
            <p className="subtitle mb-8">The car you're looking for doesn't exist or has been removed.</p>
            <Link
              to="/rentals/car"
              className="bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-lg shadow transition-all"
            >
              Browse All Cars
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
        <section className="bg-white py-10">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Car Details */}
              <div className="w-full md:w-2/3">
                <h1 className="title-medium mb-2">{car.name}</h1>
                <div className="flex items-center text-stone-500 mb-6">
                  <Car className="mr-2" size={18} />
                  <span className="mr-4">{car.type}</span>
                  <span>{car.transmission}</span>
                </div>

                <div className="rounded-xl overflow-hidden mb-8 shadow-sm">
                  <img 
                    src={car.image} 
                    alt={car.name} 
                    className="w-full h-[400px] object-cover" 
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-stone-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-1">Type</h3>
                    <p>{car.type}</p>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-1">Capacity</h3>
                    <p>{car.capacity} Seats</p>
                  </div>
                  <div className="bg-stone-50 p-4 rounded-lg">
                    <h3 className="font-medium mb-1">Transmission</h3>
                    <p>{car.transmission}</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl mb-8">
                  <h2 className="text-xl font-bold mb-4">About this car</h2>
                  <p className="text-stone-600">
                    {car.description || "Experience the comfort and reliability of our well-maintained fleet. This car is perfect for exploring Mount Abu and its surrounding areas. It comes with comprehensive insurance and 24/7 roadside assistance."}
                  </p>
                </div>
                
                <div className="bg-white rounded-xl mb-8">
                  <h2 className="text-xl font-bold mb-4">What's included</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {["Comprehensive insurance", "24/7 roadside assistance", "Unlimited kilometers", "Fuel efficient", "Regularly serviced", "Clean & sanitized"].map((item, index) => (
                      <li key={index} className="flex items-center">
                        <Check size={18} className="text-green-500 mr-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Booking Panel */}
              <div className="w-full md:w-1/3">
                <div className="bg-white rounded-xl shadow-md p-6 sticky top-10">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-xl">₹{car.price}</h3>
                      <p className="text-sm text-stone-500">per day</p>
                    </div>
                  </div>

                  <form onSubmit={handleBooking} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Pickup Location</label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                        <input
                          type="text"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Pickup Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                        <input
                          type="date"
                          value={pickupDate}
                          onChange={(e) => setPickupDate(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">Return Date</label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                        <input
                          type="date"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 rounded-lg border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div className="border-t border-stone-200 pt-4">
                      <div className="flex justify-between mb-2">
                        <span>Base rate</span>
                        <span>₹{car.price}/day</span>
                      </div>
                      <div className="flex justify-between mb-2">
                        <span>Number of days</span>
                        <span>{pickupDate && returnDate ? Math.max(1, Math.ceil((new Date(returnDate).getTime() - new Date(pickupDate).getTime()) / (1000 * 60 * 60 * 24))) : 1}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg mt-4">
                        <span>Total</span>
                        <span>₹{calculateTotalPrice()}</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-3 px-4 rounded-lg shadow-sm transition-all"
                    >
                      Book Now
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default CarRentalDetail;

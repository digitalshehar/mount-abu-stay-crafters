
import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { 
  Calendar, 
  Users, 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  Star, 
  ChevronRight, 
  MapPin 
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Calendar as CalendarUI } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

const AdventureDetail = () => {
  const { adventureSlug } = useParams();
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [participants, setParticipants] = useState(1);
  
  // Fetch adventure data from Supabase
  const { data: adventure, isLoading, error } = useQuery({
    queryKey: ["adventure", adventureSlug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("adventures")
        .select("*")
        .eq("status", "active")
        .ilike("name", `%${adventureSlug?.replace(/-/g, " ")}%`)
        .limit(1)
        .single();
      
      if (error) throw error;
      return data;
    },
  });

  if (error) {
    console.error("Error fetching adventure:", error);
  }

  const handleBookNow = () => {
    if (!selectedDate) {
      toast.error("Please select a date for your adventure");
      return;
    }

    toast.success("Booking initiated! We'll contact you to confirm your adventure.");
    // In a real application, this would submit to a backend
  };

  // Increase number of participants
  const increaseParticipants = () => {
    if (participants < 10) {
      setParticipants(participants + 1);
    }
  };

  // Decrease number of participants
  const decreaseParticipants = () => {
    if (participants > 1) {
      setParticipants(participants - 1);
    }
  };

  // Adventure features
  const features = [
    { icon: <Clock className="h-5 w-5 text-primary" />, text: adventure?.duration || "Duration unknown" },
    { icon: <AlertCircle className="h-5 w-5 text-amber-500" />, text: adventure?.difficulty || "Difficulty unknown" },
    { icon: <Users className="h-5 w-5 text-blue-500" />, text: "Age 12+ recommended" },
    { icon: <CheckCircle className="h-5 w-5 text-green-500" />, text: "Equipment provided" },
  ];

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-32 pb-16">
          <div className="container-custom">
            <div className="animate-pulse">
              <div className="h-10 bg-stone-200 rounded w-3/4 mb-4"></div>
              <div className="h-6 bg-stone-200 rounded w-1/2 mb-8"></div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <div className="h-80 bg-stone-200 rounded-xl mb-6"></div>
                  <div className="space-y-4">
                    <div className="h-6 bg-stone-200 rounded w-1/3"></div>
                    <div className="h-4 bg-stone-200 rounded w-full"></div>
                    <div className="h-4 bg-stone-200 rounded w-full"></div>
                    <div className="h-4 bg-stone-200 rounded w-2/3"></div>
                  </div>
                </div>
                <div>
                  <div className="h-80 bg-stone-200 rounded-xl"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Error state
  if (error || !adventure) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-32 pb-16">
          <div className="container-custom">
            <Card className="max-w-2xl mx-auto p-8 text-center">
              <h2 className="text-2xl font-semibold mb-4">Adventure Not Found</h2>
              <p className="text-stone-600 mb-6">
                We couldn't find the adventure you're looking for. It might have been removed or the URL could be incorrect.
              </p>
              <div className="flex justify-center gap-4">
                <Link to="/adventures">
                  <Button>View All Adventures</Button>
                </Link>
                <Link to="/">
                  <Button variant="outline">Go Home</Button>
                </Link>
              </div>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow pt-28 pb-16">
        <div className="container-custom">
          {/* Breadcrumb */}
          <div className="flex items-center text-sm text-stone-500 mb-6">
            <Link to="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="mx-2" />
            <Link to="/adventures" className="hover:text-primary transition-colors">
              Adventures
            </Link>
            <ChevronRight size={14} className="mx-2" />
            <span className="text-stone-800">{adventure.name}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Adventure Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title and Rating */}
              <div>
                <h1 className="text-3xl md:text-4xl font-bold font-display mb-2">
                  {adventure.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center">
                    <MapPin size={16} className="text-stone-500 mr-1" />
                    <span className="text-stone-600">Mount Abu, Rajasthan</span>
                  </div>
                  <div className="flex items-center">
                    <div className="flex mr-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={`${
                            i < Math.floor(adventure.rating)
                              ? "text-yellow-500 fill-yellow-500"
                              : "text-stone-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-stone-600">
                      {adventure.rating} ({adventure.bookings} bookings)
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Image */}
              <div className="rounded-xl overflow-hidden">
                <img
                  src={adventure.image}
                  alt={adventure.name}
                  className="w-full h-96 object-cover"
                />
              </div>

              {/* Features */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="bg-stone-50 rounded-lg p-4 flex flex-col items-center text-center"
                  >
                    {feature.icon}
                    <span className="mt-2 text-sm">{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-semibold mb-3">About This Adventure</h2>
                <p className="text-stone-600">
                  {adventure.description || 
                    `Join us for an unforgettable ${adventure.name} experience in the beautiful hills of Mount Abu. This ${adventure.difficulty.toLowerCase()} level adventure is perfect for ${adventure.difficulty === 'Easy' ? 'beginners and families' : adventure.difficulty === 'Moderate' ? 'those with some experience' : 'experienced adventurers'}.
                    
                    Explore the stunning landscapes and enjoy the thrill of outdoor activities with our expert guides who prioritize your safety and enjoyment throughout the ${adventure.duration.toLowerCase()} journey.`
                  }
                </p>
              </div>

              {/* What to expect */}
              <div>
                <h2 className="text-xl font-semibold mb-3">What to Expect</h2>
                <ul className="space-y-2 text-stone-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Professional guides with extensive local knowledge and safety training</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>All necessary equipment provided for your adventure</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Breathtaking views of Mount Abu's natural landscapes</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Complimentary refreshments and snacks during the adventure</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Photo opportunities at scenic viewpoints</span>
                  </li>
                </ul>
              </div>

              {/* Recommended adventures */}
              <div>
                <h2 className="text-xl font-semibold mb-4">You Might Also Like</h2>
                <p className="text-stone-600 mb-4">
                  Check out these other popular adventures in Mount Abu
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Link to="/adventure/sunrise-trekking">
                    <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                      <div className="aspect-video relative">
                        <img
                          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&auto=format&fit=crop"
                          alt="Sunrise Trekking"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold">Sunrise Trekking</h3>
                        <div className="flex items-center text-sm text-stone-500">
                          <Clock size={14} className="mr-1" /> 3 hours
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                  <Link to="/adventure/rock-climbing">
                    <Card className="overflow-hidden h-full transition-all hover:shadow-md">
                      <div className="aspect-video relative">
                        <img
                          src="https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?w=400&auto=format&fit=crop"
                          alt="Rock Climbing"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold">Rock Climbing</h3>
                        <div className="flex items-center text-sm text-stone-500">
                          <Clock size={14} className="mr-1" /> 4 hours
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Column - Booking */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-stone-100 p-6 sticky top-28">
                <h2 className="text-xl font-semibold mb-2">Book This Adventure</h2>
                <div className="flex items-center text-2xl font-bold mb-6">
                  ₹{adventure.price}
                  <span className="text-sm font-normal text-stone-500 ml-2">per person</span>
                </div>

                <Separator className="mb-6" />

                {/* Date Selection */}
                <div className="space-y-4 mb-6">
                  <label className="block text-sm font-medium">
                    Choose Date
                  </label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <Calendar className="mr-2 h-4 w-4" />
                        {selectedDate ? (
                          format(selectedDate, "PPP")
                        ) : (
                          <span>Select a date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarUI
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        initialFocus
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Participants */}
                <div className="space-y-4 mb-6">
                  <label className="block text-sm font-medium">
                    Number of Participants
                  </label>
                  <div className="flex items-center">
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon"
                      onClick={decreaseParticipants}
                      disabled={participants <= 1}
                    >
                      -
                    </Button>
                    <Input
                      className="w-16 text-center mx-2"
                      value={participants}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value >= 1 && value <= 10) {
                          setParticipants(value);
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon"
                      onClick={increaseParticipants}
                      disabled={participants >= 10}
                    >
                      +
                    </Button>
                  </div>
                </div>

                {/* Summary */}
                <div className="space-y-3 mb-6 text-sm">
                  <div className="flex justify-between">
                    <span>₹{adventure.price} × {participants} participants</span>
                    <span>₹{adventure.price * participants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Service fee</span>
                    <span>₹{Math.round(adventure.price * participants * 0.1)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-medium text-base">
                    <span>Total</span>
                    <span>₹{adventure.price * participants + Math.round(adventure.price * participants * 0.1)}</span>
                  </div>
                </div>

                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>

                <p className="text-xs text-stone-500 text-center mt-4">
                  You won't be charged yet. We'll contact you to confirm availability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdventureDetail;

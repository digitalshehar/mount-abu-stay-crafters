
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  Star, 
  MapPin, 
  Clock, 
  Users, 
  Award, 
  Calendar, 
  Check, 
  AlertTriangle,
  ChevronRight 
} from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Adventure } from "@/integrations/supabase/custom-types";
import { supabase } from "@/integrations/supabase/client";

const AdventureDetail = () => {
  const { adventureSlug } = useParams<{ adventureSlug: string }>();
  const [adventure, setAdventure] = useState<Adventure | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedAdventures, setRelatedAdventures] = useState<Adventure[]>([]);
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState("");
  const [numParticipants, setNumParticipants] = useState("2");

  useEffect(() => {
    fetchAdventureDetails();
  }, [adventureSlug]);

  const fetchAdventureDetails = async () => {
    try {
      setLoading(true);
      
      // Fetch adventure by slug
      const { data: adventureData, error: adventureError } = await supabase
        .from('adventures')
        .select('*')
        .eq('slug', adventureSlug)
        .single();
      
      if (adventureError) throw adventureError;
      
      if (!adventureData) {
        setAdventure(null);
        setLoading(false);
        return;
      }
      
      // Transform data to match our Adventure interface
      const adventure: Adventure = {
        id: adventureData.id,
        name: adventureData.name,
        type: adventureData.type,
        duration: adventureData.duration,
        difficulty: adventureData.difficulty,
        price: parseFloat(adventureData.price.toString()),
        image: adventureData.image,
        bookings: adventureData.bookings || 0,
        rating: parseFloat(adventureData.rating?.toString() || "0"),
        status: adventureData.status as 'active' | 'inactive',
        description: adventureData.description || "",
        slug: adventureData.slug || "",
        location: adventureData.location || "Mount Abu",
        meetingPoint: adventureData.meeting_point || "Central Tourist Office",
        cancellationPolicy: adventureData.cancellation_policy || "Free cancellation up to 24 hours before the experience",
        maxGroupSize: adventureData.max_group_size || 12,
        minAge: adventureData.min_age || 10,
        includes: adventureData.includes || [
          "Professional guide",
          "Safety equipment",
          "Water bottle",
          "Snacks",
          "Photos of your experience"
        ],
        timeline: adventureData.timeline || [
          "8:00 AM - Meet at the starting point",
          "8:30 AM - Safety briefing and equipment check",
          "9:00 AM - Begin the adventure",
          "12:00 PM - Lunch break with stunning views",
          "3:00 PM - Return to meeting point"
        ],
        requirements: adventureData.requirements || [
          "Moderate fitness level",
          "Comfortable clothing and hiking shoes",
          "Sunscreen and hat",
          "Small backpack for personal items"
        ],
        reviewCount: adventureData.review_count || 0
      };
      
      setAdventure(adventure);
      
      // Fetch related adventures of the same type
      const { data: relatedData, error: relatedError } = await supabase
        .from('adventures')
        .select('*')
        .eq('type', adventureData.type)
        .neq('id', adventureData.id)
        .limit(3);
      
      if (relatedError) throw relatedError;
      
      // Transform related adventures data
      const relatedAdventures: Adventure[] = relatedData.map(item => ({
        id: item.id,
        name: item.name,
        type: item.type,
        duration: item.duration,
        difficulty: item.difficulty,
        price: parseFloat(item.price.toString()),
        image: item.image,
        bookings: item.bookings || 0,
        rating: parseFloat(item.rating?.toString() || "0"),
        status: item.status as 'active' | 'inactive',
        description: item.description || "",
        slug: item.slug || "",
        location: item.location || "Mount Abu",
        reviewCount: item.review_count || 0
      }));
      
      setRelatedAdventures(relatedAdventures);
    } catch (error) {
      console.error("Error fetching adventure details:", error);
      toast({
        title: "Error",
        description: "There was a problem loading the adventure details.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBookNow = () => {
    if (!selectedDate) {
      toast({
        title: "Please select a date",
        description: "You must select a date for your adventure.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Booking successful!",
      description: `Your ${adventure?.name} adventure has been booked for ${selectedDate} with ${numParticipants} participants.`,
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!adventure) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold mb-4">Adventure Not Found</h1>
            <p className="text-stone-600 mb-6">Sorry, we couldn't find the adventure you're looking for.</p>
            <Button asChild>
              <Link to="/adventures">Browse All Adventures</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Generate dates for the next 30 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      const formattedDate = new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        weekday: 'short'
      }).format(date);
      
      dates.push({ value: dateString, label: formattedDate });
    }
    
    return dates;
  };

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-[60vh] overflow-hidden">
          <img 
            src={adventure.image} 
            alt={adventure.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex items-end">
            <div className="container-custom pb-12">
              <div className="flex items-center text-white text-sm mb-2">
                <Link to="/" className="hover:underline">Home</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link to="/adventures" className="hover:underline">Adventures</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span>{adventure.name}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-3">{adventure.name}</h1>
              <div className="flex flex-wrap items-center text-white gap-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{adventure.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{adventure.duration}</span>
                </div>
                <div className="flex items-center">
                  <Award className="w-4 h-4 mr-1" />
                  <span>{adventure.difficulty}</span>
                </div>
                <div className="flex items-center bg-white/20 px-2 py-1 rounded">
                  <Star className="w-4 h-4 text-yellow-500 mr-1" />
                  <span>{adventure.rating}</span>
                  <span className="text-sm ml-1">({adventure.reviewCount} reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview">
                <TabsList className="mb-6">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="includes">What's Included</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-display font-semibold mb-4">About this adventure</h2>
                    <p className="text-stone-600 leading-relaxed">{adventure.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-3">Meeting Point</h3>
                    <div className="bg-stone-100 p-4 rounded-lg flex items-start">
                      <MapPin className="text-primary mt-1 mr-2 flex-shrink-0" />
                      <div>
                        <p className="font-medium">{adventure.meetingPoint}</p>
                        <p className="text-stone-600 text-sm">You'll receive detailed directions upon booking</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-display font-semibold mb-3">Group Size</h3>
                    <div className="flex items-center text-stone-600">
                      <Users className="mr-2" />
                      <span>Maximum {adventure.maxGroupSize} participants</span>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="includes" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-display font-semibold mb-4">What's Included</h2>
                    <ul className="space-y-2">
                      {adventure.includes.map((item, index) => (
                        <li key={index} className="flex items-center text-stone-600">
                          <Check className="text-green-500 mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
                
                <TabsContent value="timeline" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-display font-semibold mb-4">Activity Timeline</h2>
                    <div className="space-y-4">
                      {adventure.timeline.map((item, index) => (
                        <div key={index} className="flex">
                          <div className="mr-4 relative">
                            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center">
                              {index + 1}
                            </div>
                            {index < adventure.timeline.length - 1 && (
                              <div className="absolute top-6 bottom-0 left-3 w-px bg-stone-200"></div>
                            )}
                          </div>
                          <div className="pb-6">
                            <p className="text-stone-600">{item}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="requirements" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-display font-semibold mb-4">Requirements</h2>
                    <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg mb-4">
                      <div className="flex items-start">
                        <AlertTriangle className="text-amber-500 mt-1 mr-2 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-amber-900">Important Information</p>
                          <p className="text-amber-800">Minimum age: {adventure.minAge} years</p>
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {adventure.requirements.map((item, index) => (
                        <li key={index} className="flex items-center text-stone-600">
                          <Check className="text-primary mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
              
              {/* Related Adventures */}
              <div className="mt-12">
                <h2 className="text-2xl font-display font-semibold mb-6">Similar Adventures</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {relatedAdventures.map((relatedAdventure) => (
                    <Link 
                      key={relatedAdventure.id} 
                      to={`/adventure/${relatedAdventure.slug}`}
                      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={relatedAdventure.image} 
                          alt={relatedAdventure.name} 
                          className="w-full h-full object-cover transition-transform hover:scale-105"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{relatedAdventure.name}</h3>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-sm">
                            <Clock className="w-3 h-3 mr-1 text-stone-500" />
                            <span className="text-stone-500">{relatedAdventure.duration}</span>
                          </div>
                          <div className="flex items-center text-sm">
                            <Star className="w-3 h-3 mr-1 text-yellow-500" />
                            <span>{relatedAdventure.rating}</span>
                          </div>
                        </div>
                        <div className="mt-2 font-semibold text-primary">₹{relatedAdventure.price.toLocaleString()}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Booking Panel */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 border border-stone-100 sticky top-24">
                <h2 className="text-2xl font-display font-semibold mb-2">Book This Adventure</h2>
                <p className="text-2xl font-bold text-primary mb-6">₹{adventure.price.toLocaleString()}<span className="text-sm font-normal text-stone-500">/person</span></p>
                
                <div className="space-y-4 mb-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-stone-600 mb-1">Select Date</label>
                    <select
                      id="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-2 rounded-md border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                    >
                      <option value="">Select a date</option>
                      {generateDates().map((date) => (
                        <option key={date.value} value={date.value}>
                          {date.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="participants" className="block text-sm font-medium text-stone-600 mb-1">Number of Participants</label>
                    <div className="relative">
                      <Users className="absolute left-3 top-3 h-4 w-4 text-stone-400" />
                      <select
                        id="participants"
                        value={numParticipants}
                        onChange={(e) => setNumParticipants(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-md border border-stone-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent appearance-none"
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                          <option key={num} value={num.toString()}>
                            {num} {num === 1 ? 'Person' : 'People'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                
                <Separator className="my-6" />
                
                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Adventure price</span>
                    <span>₹{adventure.price.toLocaleString()} × {numParticipants}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Taxes & fees</span>
                    <span>₹{Math.round(adventure.price * parseInt(numParticipants) * 0.05).toLocaleString()}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{(adventure.price * parseInt(numParticipants) + Math.round(adventure.price * parseInt(numParticipants) * 0.05)).toLocaleString()}</span>
                  </div>
                </div>
                
                <Button className="w-full" size="lg" onClick={handleBookNow}>
                  Book Now
                </Button>
                
                <div className="mt-4 text-sm text-stone-500">
                  <p className="flex items-center mb-1">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>Free cancellation {adventure.cancellationPolicy}</span>
                  </p>
                </div>
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

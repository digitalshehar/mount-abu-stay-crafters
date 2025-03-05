
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  MapPin, Calendar, Clock, Star, 
  Users, Award, ArrowRight, 
  Clipboard, CheckCircle, AlertCircle, 
  Heart
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { Adventure } from "@/integrations/supabase/custom-types";

const AdventureDetail = () => {
  const { adventureSlug } = useParams();
  const { toast } = useToast();
  const [adventure, setAdventure] = useState<Adventure | null>(null);
  const [similarAdventures, setSimilarAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    // This would normally fetch from Supabase, but we're using static data for demonstration
    const fetchAdventure = () => {
      setLoading(true);
      
      // Mock adventure data - replace with actual API call
      const adventures = [
        {
          id: 1,
          name: "Sunset Point Trekking",
          slug: "sunset-point-trekking",
          type: "Trekking",
          duration: "3 hours",
          difficulty: "Easy",
          price: 800,
          image: "https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=1574&ixlib=rb-4.0.3",
          bookings: 124,
          rating: 4.8,
          description: "Experience the breathtaking sunset views from the highest point in Mount Abu on this guided trekking tour. Perfect for beginners and photography enthusiasts, this trek takes you through lush forests and rocky terrain to reach the panoramic viewpoint.",
          includes: ["Professional guide", "Bottled water", "Snacks", "Photography assistance"],
          timeline: ["2:30 PM: Meet at the starting point", "3:00 PM: Begin trek", "4:30 PM: Reach Sunset Point", "5:30 PM: Watch sunset", "6:30 PM: Return trek begins"],
          requirements: ["Comfortable walking shoes", "Water bottle", "Camera (optional)", "Light jacket"],
          location: "Sunset Point, Mount Abu",
          meetingPoint: "Nakki Lake Parking Area",
          cancellationPolicy: "Free cancellation up to 24 hours before the activity",
          maxGroupSize: 12,
          minAge: 8
        },
        {
          id: 2,
          name: "Wildlife Safari",
          slug: "wildlife-safari",
          type: "Sightseeing",
          duration: "5 hours",
          difficulty: "Easy",
          price: 1200,
          image: "https://images.unsplash.com/photo-1561040594-a1b8785b8d1e?auto=format&fit=crop&q=80&w=1548&ixlib=rb-4.0.3",
          bookings: 98,
          rating: 4.5,
          description: "Explore the rich biodiversity of Mount Abu Wildlife Sanctuary on this guided safari tour. Spot various animals including leopards, sambhar deer, wild boars, and numerous bird species in their natural habitat.",
          includes: ["Jeep safari", "Professional naturalist guide", "Bottled water", "Entrance fees", "Binoculars for use"],
          timeline: ["6:00 AM: Meet at sanctuary entrance", "6:30 AM: Safari begins", "9:30 AM: Refreshment break", "11:00 AM: Return to entrance"],
          requirements: ["Comfortable clothing", "Binoculars (optional)", "Camera with zoom lens (recommended)"],
          location: "Mount Abu Wildlife Sanctuary",
          meetingPoint: "Wildlife Sanctuary Main Gate",
          cancellationPolicy: "Free cancellation up to 48 hours before the activity",
          maxGroupSize: 6,
          minAge: 5
        },
        {
          id: 3,
          name: "Nakki Lake Boating",
          slug: "nakki-lake-boating",
          type: "Water Activity",
          duration: "1 hour",
          difficulty: "Easy",
          price: 500,
          image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
          bookings: 210,
          rating: 4.3,
          description: "Enjoy a serene boating experience on the historic Nakki Lake, surrounded by hills and lush greenery. Perfect for families and couples looking for a relaxing activity in Mount Abu.",
          includes: ["Boat rental", "Life jackets", "Basic rowing instructions"],
          timeline: ["Choose any 1-hour slot between 8:00 AM and 6:00 PM", "30 minutes: Guided rowing", "30 minutes: Self rowing"],
          requirements: ["No special requirements", "Children must be accompanied by adults"],
          location: "Nakki Lake, Mount Abu",
          meetingPoint: "Nakki Lake Boating Point",
          cancellationPolicy: "Non-refundable once booked",
          maxGroupSize: 4,
          minAge: 3
        },
        {
          id: 4,
          name: "Overnight Camping",
          slug: "overnight-camping",
          type: "Camping",
          duration: "24 hours",
          difficulty: "Moderate",
          price: 2500,
          image: "https://images.unsplash.com/photo-1517823382935-51bfcb0ec6bc?auto=format&fit=crop&q=80&w=1740&ixlib=rb-4.0.3",
          bookings: 76,
          rating: 4.9,
          description: "Experience the magic of camping under the stars in the Aravalli hills. This overnight camping adventure includes trekking, campfire activities, stargazing, and more for an unforgettable outdoor experience.",
          includes: ["Tent accommodation", "All meals (dinner, breakfast, lunch)", "Guided trek", "Campfire", "Stargazing session", "Basic camping gear"],
          timeline: ["Day 1, 2:00 PM: Meet at base camp", "3:00 PM: Trek to camping site", "5:00 PM: Set up camp", "7:00 PM: Dinner and campfire", "9:00 PM: Stargazing", "Day 2, 7:00 AM: Breakfast", "9:00 AM: Morning activity", "12:00 PM: Lunch", "2:00 PM: Return trek"],
          requirements: ["Warm clothing for night", "Personal toiletries", "Comfortable trekking shoes", "Flashlight", "Sleeping bag (can be rented)"],
          location: "Aravalli Wilderness Area",
          meetingPoint: "Mount Abu Adventure Center",
          cancellationPolicy: "75% refund up to 72 hours before the activity",
          maxGroupSize: 10,
          minAge: 12
        },
      ];

      const selectedAdventure = adventures.find(a => a.slug === adventureSlug);
      
      if (selectedAdventure) {
        setAdventure(selectedAdventure);
        document.title = `${selectedAdventure.name} - Mount Abu Adventures`;
        
        // Get similar adventures (same type or difficulty)
        const similar = adventures.filter(a => 
          a.id !== selectedAdventure.id && 
          (a.type === selectedAdventure.type || a.difficulty === selectedAdventure.difficulty)
        ).slice(0, 3);
        
        setSimilarAdventures(similar);
      } else {
        toast({
          title: "Adventure not found",
          description: "We couldn't find the adventure you're looking for.",
          variant: "destructive"
        });
      }
      
      setLoading(false);
    };

    fetchAdventure();
  }, [adventureSlug, toast]);

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted 
        ? "This adventure has been removed from your wishlist" 
        : "This adventure has been added to your wishlist",
    });
  };

  const handleBookNow = () => {
    toast({
      title: "Booking initialized",
      description: "You'll be redirected to complete your booking details.",
    });
    // In a real implementation, redirect to booking form or open booking modal
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="pt-28 pb-16">
          <div className="container-custom">
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-stone-200 rounded w-3/4"></div>
              <div className="h-6 bg-stone-200 rounded w-1/2"></div>
              <div className="h-96 bg-stone-200 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!adventure) {
    return (
      <>
        <Header />
        <main className="pt-28 pb-16 min-h-[70vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-display font-bold mb-4">Adventure Not Found</h1>
            <p className="text-stone-600 mb-6">The adventure you're looking for doesn't exist or has been moved.</p>
            <Link to="/adventures">
              <Button>View All Adventures</Button>
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
      <main className="pt-28 pb-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Adventure Images */}
              <div className="rounded-xl overflow-hidden h-[400px]">
                <img 
                  src={adventure.image} 
                  alt={adventure.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Adventure Overview */}
              <div>
                <div className="flex items-center text-primary text-sm font-medium mb-2">
                  {adventure.type}
                </div>
                
                <h1 className="text-3xl font-display font-bold mb-2">
                  {adventure.name}
                </h1>
                
                <div className="flex items-center text-sm text-stone-500 mb-4">
                  <MapPin size={16} className="mr-1" />
                  <span className="mr-4">{adventure.location}</span>
                  
                  <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="mr-1">{adventure.rating}</span>
                  <span className="mr-4">({adventure.bookings} reviews)</span>
                  
                  <Award size={16} className="mr-1" />
                  <span>{adventure.difficulty}</span>
                </div>
                
                <p className="text-stone-600 leading-relaxed mb-6">
                  {adventure.description}
                </p>
              </div>
              
              {/* Activity Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-stone-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock size={18} className="text-primary mr-2" />
                    <span className="font-medium">Duration</span>
                  </div>
                  <p className="text-stone-600">{adventure.duration}</p>
                </div>
                
                <div className="bg-stone-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Users size={18} className="text-primary mr-2" />
                    <span className="font-medium">Group Size</span>
                  </div>
                  <p className="text-stone-600">Up to {adventure.maxGroupSize} people</p>
                </div>
                
                <div className="bg-stone-50 p-4 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Award size={18} className="text-primary mr-2" />
                    <span className="font-medium">Difficulty</span>
                  </div>
                  <p className="text-stone-600">{adventure.difficulty}</p>
                </div>
              </div>
              
              {/* What to Expect */}
              <div>
                <h2 className="text-xl font-display font-bold mb-4">What to Expect</h2>
                <div className="prose max-w-none">
                  <p className="text-stone-600 mb-6">{adventure.description}</p>
                  
                  <h3 className="text-lg font-semibold mt-6 mb-3">What's Included</h3>
                  <ul className="space-y-2 mb-6">
                    {adventure.includes.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <h3 className="text-lg font-semibold mt-6 mb-3">Activity Timeline</h3>
                  <ul className="space-y-3 mb-6">
                    {adventure.timeline.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <div className="bg-primary/10 text-primary rounded-full h-6 w-6 flex items-center justify-center mr-3 shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <h3 className="text-lg font-semibold mt-6 mb-3">What to Bring</h3>
                  <ul className="space-y-2 mb-6">
                    {adventure.requirements.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <Clipboard size={18} className="text-stone-500 mr-2 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              {/* Meeting Point */}
              <div className="bg-stone-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-3">Meeting Point</h3>
                <div className="flex items-start">
                  <MapPin size={20} className="text-primary mr-3 mt-1 shrink-0" />
                  <div>
                    <p className="font-medium mb-1">{adventure.meetingPoint}</p>
                    <p className="text-stone-600 text-sm">{adventure.location}</p>
                  </div>
                </div>
              </div>
              
              {/* Cancellation Policy */}
              <div className="border border-stone-200 p-6 rounded-xl">
                <div className="flex items-start">
                  <AlertCircle size={20} className="text-amber-500 mr-3 mt-0.5 shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold mb-1">Cancellation Policy</h3>
                    <p className="text-stone-600">{adventure.cancellationPolicy}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div>
              <div className="bg-white border border-stone-200 rounded-xl p-6 shadow-sm sticky top-28">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-primary text-2xl font-bold">₹{adventure.price}</p>
                    <p className="text-stone-500 text-sm">per person</p>
                  </div>
                  <button 
                    onClick={handleWishlist}
                    className="rounded-full p-2 hover:bg-stone-100 transition-colors"
                  >
                    <Heart 
                      size={20} 
                      className={isWishlisted ? "fill-red-500 text-red-500" : "text-stone-400"} 
                    />
                  </button>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-stone-600">Duration:</span>
                    <span className="font-medium">{adventure.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Difficulty:</span>
                    <span className="font-medium">{adventure.difficulty}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Group Size:</span>
                    <span className="font-medium">Up to {adventure.maxGroupSize} people</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600">Min. Age:</span>
                    <span className="font-medium">{adventure.minAge}+ years</span>
                  </div>
                </div>
                
                <Button onClick={handleBookNow} className="w-full mb-3">
                  Book Now
                </Button>
                
                <p className="text-xs text-center text-stone-500">
                  No payment required now - pay at the activity
                </p>
              </div>
            </div>
          </div>
          
          {/* Similar Adventures */}
          {similarAdventures.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-display font-bold mb-6">
                Similar Adventures You Might Like
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarAdventures.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden card-hover">
                    <div className="relative h-48">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium">
                        {item.difficulty}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-primary font-medium">{item.type}</p>
                          <h3 className="font-display font-bold text-xl mb-1">{item.name}</h3>
                          <p className="text-sm text-stone-500 mb-2">{item.duration}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-primary font-bold text-xl">₹{item.price}</p>
                          <p className="text-xs text-stone-500">per person</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center text-sm text-stone-500 mt-4 mb-6">
                        <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="mr-1">{item.rating}</span>
                        <span className="mr-3">({item.bookings} reviews)</span>
                      </div>
                      
                      <Link
                        to={`/adventure/${item.slug}`}
                        className="block w-full bg-primary hover:bg-primary/90 text-white text-center font-medium py-2 px-4 rounded-lg shadow-sm transition-all"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <Link to="/adventures" className="inline-flex items-center text-primary font-medium hover:text-primary/80 transition-colors">
                  View All Adventures <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default AdventureDetail;

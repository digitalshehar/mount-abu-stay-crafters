
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { MapPin, Clock, Star, ChevronRight } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Adventure, Destination } from "@/integrations/supabase/custom-types";
import { supabase } from "@/integrations/supabase/client";

const DestinationDetail = () => {
  const { destinationSlug } = useParams<{ destinationSlug: string }>();
  const [destination, setDestination] = useState<Destination | null>(null);
  const [adventures, setAdventures] = useState<Adventure[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinationDetails();
  }, [destinationSlug]);

  const fetchDestinationDetails = async () => {
    try {
      setLoading(true);
      
      // Fetch destination by slug from Supabase
      const { data: destinationData, error: destinationError } = await supabase
        .from('destinations')
        .select('*')
        .eq('slug', destinationSlug)
        .single();
      
      if (destinationError) throw destinationError;
      
      if (!destinationData) {
        setDestination(null);
        setLoading(false);
        return;
      }
      
      const destination: Destination = {
        id: destinationData.id,
        name: destinationData.name,
        description: destinationData.description,
        image: destinationData.image,
        activities: destinationData.activities || [],
        location: destinationData.location,
        slug: destinationData.slug,
        bestTimeToVisit: destinationData.best_time_to_visit || "October to March",
        highlights: destinationData.highlights || [
          "Sunset Point",
          "Nakki Lake",
          "Dilwara Jain Temples",
          "Wildlife Sanctuary",
          "Achalgarh Fort"
        ]
      };
      
      setDestination(destination);
      
      // Fetch related adventures for this destination from Supabase
      const { data: adventureData, error: adventureError } = await supabase
        .from('adventures')
        .select('*')
        .eq('location', destinationData.name)
        .limit(6);
      
      if (adventureError) throw adventureError;
      
      // Transform the adventure data
      const adventures: Adventure[] = adventureData.map(item => ({
        id: item.id,
        name: item.name,
        slug: item.slug || "",
        type: item.type,
        duration: item.duration,
        difficulty: item.difficulty,
        rating: parseFloat(item.rating?.toString() || "0"),
        reviewCount: item.review_count || 0,
        price: parseFloat(item.price.toString()),
        image: item.image,
        location: item.location || "Mount Abu",
        status: item.status as 'active' | 'inactive',
      }));
      
      setAdventures(adventures);
    } catch (error) {
      console.error("Error fetching destination details:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="min-h-screen bg-stone-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-3xl font-bold mb-4">Destination Not Found</h1>
            <p className="text-stone-600 mb-6">Sorry, we couldn't find the destination you're looking for.</p>
            <Button asChild>
              <Link to="/destinations">Browse All Destinations</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="relative h-[60vh] overflow-hidden">
          <img 
            src={destination.image} 
            alt={destination.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-black/20 flex items-end">
            <div className="container-custom pb-12">
              <div className="flex items-center text-white text-sm mb-2">
                <Link to="/" className="hover:underline">Home</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <Link to="/destinations" className="hover:underline">Destinations</Link>
                <ChevronRight className="h-4 w-4 mx-1" />
                <span>{destination.name}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-3">{destination.name}</h1>
              <div className="flex flex-wrap items-center text-white gap-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{destination.location}</span>
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
                  <TabsTrigger value="highlights">Highlights</TabsTrigger>
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-display font-semibold mb-4">About {destination.name}</h2>
                    <p className="text-stone-600 leading-relaxed mb-4">{destination.description}</p>
                  </div>
                  
                  <div className="bg-stone-100 p-6 rounded-lg">
                    <h3 className="text-xl font-display font-semibold mb-3">Best Time to Visit</h3>
                    <p className="text-stone-600">{destination.bestTimeToVisit}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="highlights" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-display font-semibold mb-4">Top Attractions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {destination.highlights.map((highlight, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-stone-100">
                          <h3 className="font-semibold">{highlight}</h3>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="activities" className="space-y-6">
                  <div>
                    <h2 className="text-2xl font-display font-semibold mb-4">Popular Activities</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {destination.activities.map((activity, index) => (
                        <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-stone-100">
                          <h3 className="font-semibold">{activity}</h3>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              {/* Adventures at this location */}
              {adventures.length > 0 && (
                <div className="mt-12">
                  <h2 className="text-2xl font-display font-semibold mb-6">Explore Adventures in {destination.name}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {adventures.map((adventure) => (
                      <Link 
                        key={adventure.id} 
                        to={`/adventure/${adventure.slug}`}
                        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex"
                      >
                        <div className="w-1/3 h-auto overflow-hidden">
                          <img 
                            src={adventure.image} 
                            alt={adventure.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-2/3 p-4">
                          <h3 className="font-semibold mb-1 line-clamp-1">{adventure.name}</h3>
                          <div className="flex items-center text-sm mb-1">
                            <Clock className="w-3 h-3 mr-1 text-stone-500" />
                            <span className="text-stone-500">{adventure.duration}</span>
                          </div>
                          <div className="flex items-center text-sm mb-2">
                            <Star className="w-3 h-3 mr-1 text-yellow-500" />
                            <span>{adventure.rating}</span>
                            <span className="text-xs text-stone-500 ml-1">({adventure.reviewCount} reviews)</span>
                          </div>
                          <div className="font-semibold text-primary">₹{adventure.price.toLocaleString()}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 border border-stone-100 sticky top-24">
                <h2 className="text-2xl font-display font-semibold mb-4">Location Information</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium mb-2">Weather</h3>
                    <p className="text-stone-600">Due to its elevation, Mount Abu enjoys a pleasant climate throughout most of the year. Summers (April to June) are mild compared to the surrounding regions, while winters (November to February) can get quite cool.</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-2">How to Reach</h3>
                    <div className="space-y-2 text-stone-600">
                      <p><span className="font-medium">By Air:</span> The nearest airport is Udaipur (185 km).</p>
                      <p><span className="font-medium">By Train:</span> Abu Road railway station (28 km) is well connected.</p>
                      <p><span className="font-medium">By Road:</span> Well connected to major cities in Rajasthan and Gujarat.</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-medium mb-2">Local Transportation</h3>
                    <p className="text-stone-600">Taxis, auto-rickshaws, and rental vehicles are readily available for local transportation.</p>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button asChild className="w-full">
                    <Link to="/adventures">Explore All Adventures</Link>
                  </Button>
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

export default DestinationDetail;

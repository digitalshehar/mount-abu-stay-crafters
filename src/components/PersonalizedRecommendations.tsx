
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Hotel } from '@/components/admin/hotels/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type RecommendationType = "hotel" | "activity" | "restaurant" | "attraction";

interface RecommendationItem {
  id: number;
  name: string;
  type: RecommendationType;
  description: string;
  image: string;
  price: string;
  rating: number;
  tags: string[];
}

const PersonalizedRecommendations = () => {
  const [activeTab, setActiveTab] = useState<string>("forYou");
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  
  useEffect(() => {
    // Fetch hotels from Supabase
    const fetchHotels = async () => {
      try {
        const { data, error } = await supabase
          .from('hotels')
          .select('*')
          .order('rating', { ascending: false })
          .limit(3);

        if (error) throw error;

        if (data) {
          // Transform data to match the Hotel type
          const mappedHotels: Hotel[] = data.map((item: any) => ({
            id: item.id,
            name: item.name,
            slug: item.slug,
            location: item.location,
            stars: item.stars,
            pricePerNight: item.price_per_night,
            image: item.image,
            status: item.status as "active" | "inactive",
            description: item.description || "",
            amenities: item.amenities || [],
            featured: item.featured || false,
            reviewCount: item.review_count || 0,
            rating: item.rating || 0,
            gallery: Array.isArray(item.gallery) ? item.gallery : [],
            categories: item.categories || [],
            rooms: [], // Initializing as empty array
            seasonalPricing: []
          }));

          setHotels(mappedHotels);
        }
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };

    // Generate personalized recommendations
    const generateRecommendations = () => {
      const baseRecommendations: RecommendationItem[] = [
        {
          id: 1,
          name: "Nakki Lake Paddle Boating",
          type: "activity" as RecommendationType,
          description: "Experience the serene waters of Nakki Lake with our paddle boats. Perfect for couples and families.",
          image: "https://images.unsplash.com/photo-1601794590530-93b57767e259?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
          price: "₹350 per hour",
          rating: 4.8,
          tags: ["Outdoors", "Water Activity", "Family-friendly"]
        },
        {
          id: 2,
          name: "Sunset Point Jeep Safari",
          type: "activity" as RecommendationType,
          description: "Explore the wilderness around Mount Abu's famous Sunset Point with our guided jeep safaris.",
          image: "https://images.unsplash.com/photo-1501612780327-45045538702b?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
          price: "₹1,200 per person",
          rating: 4.7,
          tags: ["Adventure", "Wildlife", "Sunset Views"]
        },
        {
          id: 3,
          name: "Arbuda Restaurant",
          type: "restaurant" as RecommendationType,
          description: "Traditional Rajasthani cuisine in a royal setting with live folk music performances.",
          image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
          price: "₹800 for two",
          rating: 4.6,
          tags: ["Rajasthani Cuisine", "Live Music", "Dinner"]
        },
        {
          id: 4,
          name: "Dilwara Temples Tour",
          type: "attraction" as RecommendationType,
          description: "Guided tour of the magnificent Jain temples known for their remarkable marble carvings.",
          image: "https://images.unsplash.com/photo-1585468274952-66591eb14165?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
          price: "₹500 per person",
          rating: 4.9,
          tags: ["Cultural", "Historical", "Architecture"]
        },
        {
          id: 5,
          name: "Mount Abu Wildlife Sanctuary Trek",
          type: "activity" as RecommendationType,
          description: "Half-day guided trek through the wildlife sanctuary to spot indigenous flora and fauna.",
          image: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
          price: "₹950 per person",
          rating: 4.5,
          tags: ["Trekking", "Wildlife", "Nature"]
        }
      ];

      setRecommendations(baseRecommendations);
      setIsLoading(false);
    };

    fetchHotels();
    generateRecommendations();
  }, []);

  const getRecommendationsForTab = (tab: string): RecommendationItem[] => {
    switch (tab) {
      case "forYou":
        return recommendations.filter(r => r.rating >= 4.7);
      case "trending":
        return recommendations.filter(r => r.tags.includes("Adventure") || r.tags.includes("Wildlife"));
      case "popular":
        return [...recommendations].sort((a, b) => b.rating - a.rating);
      default:
        return recommendations;
    }
  };

  // Get recommendations for the active tab
  const currentRecommendations = getRecommendationsForTab(activeTab);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg border border-stone-200 shadow-sm p-6 animate-pulse">
        <div className="h-6 bg-stone-200 rounded w-3/4 mb-6"></div>
        <div className="h-4 bg-stone-200 rounded w-full mb-8"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-20 bg-stone-200 rounded mb-2"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-stone-200 shadow-sm p-6">
      <h3 className="text-xl font-display font-semibold mb-2">Personalized Recommendations</h3>
      <p className="text-stone-600 text-sm mb-6">
        Curated experiences in Mount Abu based on your interests and browsing history.
      </p>

      <Tabs defaultValue="forYou" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 bg-stone-100">
          <TabsTrigger value="forYou">For You</TabsTrigger>
          <TabsTrigger value="trending">Trending</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-4">
          {currentRecommendations.length > 0 ? (
            currentRecommendations.map((item) => (
              <RecommendationCard key={item.id} item={item} />
            ))
          ) : (
            <div className="text-center py-4">
              <p className="text-stone-500">No recommendations available</p>
            </div>
          )}
          
          {/* Hotel recommendations */}
          {hotels.length > 0 && activeTab === "forYou" && (
            <div className="pt-4 border-t border-stone-200">
              <h4 className="text-md font-semibold mb-3">Hotels You Might Like</h4>
              <div className="space-y-3">
                {hotels.slice(0, 2).map((hotel) => (
                  <Link
                    key={hotel.id}
                    to={`/hotel/${hotel.slug}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-stone-50 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                      <img 
                        src={hotel.image} 
                        alt={hotel.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <div className="flex-grow">
                      <h5 className="font-medium text-sm">{hotel.name}</h5>
                      <p className="text-xs text-stone-500">{hotel.location}</p>
                      <div className="flex items-center mt-1">
                        <div className="flex">
                          {[...Array(Math.floor(hotel.rating))].map((_, i) => (
                            <span key={i} className="text-yellow-500 text-xs">★</span>
                          ))}
                        </div>
                        <span className="text-xs text-stone-500 ml-1">
                          ({hotel.rating.toFixed(1)})
                        </span>
                        <span className="text-xs font-medium text-green-600 ml-auto">
                          ₹{hotel.pricePerNight}/night
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              <Link 
                to="/hotels" 
                className="block text-center text-sm text-primary font-medium mt-4 hover:underline"
              >
                View All Hotels
              </Link>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

const RecommendationCard: React.FC<{ item: RecommendationItem }> = ({ item }) => {
  // Determine the link based on the recommendation type
  const getLink = (item: RecommendationItem) => {
    switch (item.type) {
      case "hotel":
        return `/hotels/${item.id}`;
      case "activity":
        return `/adventures/${item.id}`;
      case "restaurant":
        return `/dining/${item.id}`;
      case "attraction":
        return `/destinations/${item.id}`;
      default:
        return "#";
    }
  };

  return (
    <Link to={getLink(item)} className="flex group hover:bg-stone-50 p-2 rounded-lg transition-colors">
      <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </div>
      <div className="ml-3 flex-grow">
        <h4 className="font-medium text-sm group-hover:text-primary transition-colors">{item.name}</h4>
        <p className="text-xs text-stone-500 line-clamp-1">{item.description}</p>
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center">
            <span className="text-yellow-500 text-xs">★</span>
            <span className="text-xs ml-1">{item.rating.toFixed(1)}</span>
          </div>
          <span className="text-xs font-medium text-green-600">{item.price}</span>
        </div>
      </div>
    </Link>
  );
};

export default PersonalizedRecommendations;

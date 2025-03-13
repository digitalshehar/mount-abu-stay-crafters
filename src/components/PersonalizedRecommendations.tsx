
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useAuth } from '@/context/AuthContext';
import PreferenceSelector from './recommendations/PreferenceSelector';
import RecommendationItem from './recommendations/RecommendationItem';
import { supabase } from '@/integrations/supabase/client';
import { Hotel } from '@/components/admin/hotels/types';
import { useRecommendations } from '@/hooks/useRecommendations';
import { Loader2 } from 'lucide-react';

interface PersonalizedRecommendationsProps {
  className?: string;
}

const PersonalizedRecommendations: React.FC<PersonalizedRecommendationsProps> = ({ className = '' }) => {
  const { user } = useAuth();
  const { preferences, togglePreference } = useRecommendations();
  const [showPreferences, setShowPreferences] = useState(false);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        
        // Fetch hotels from Supabase
        const { data, error } = await supabase
          .from("hotels")
          .select("id, name, location, price_per_night, image, rating, review_count, amenities, stars, slug")
          .eq("status", "active")
          .order('rating', { ascending: false })
          .limit(4);
          
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
            amenities: item.amenities || [],
            reviewCount: item.review_count || 0,
            rating: item.rating || 0,
          }));
          
          setHotels(mappedHotels);
        }
      } catch (error) {
        console.error("Error fetching hotels for recommendations:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchHotels();
  }, []);
  
  // Transform hotels to recommendation items
  const getRecommendationItems = () => {
    return hotels.map(hotel => {
      // Define tags based on hotel features
      const tags: string[] = [];
      
      // Add luxury or budget tag based on price
      if (hotel.pricePerNight > 4000) {
        tags.push('luxury');
      } else if (hotel.pricePerNight < 2000) {
        tags.push('budget');
      }
      
      // Check amenities for preferences
      if (hotel.amenities) {
        if (hotel.amenities.some(a => a.toLowerCase().includes('family') || a.toLowerCase().includes('kid'))) {
          tags.push('family-friendly');
        }
        if (hotel.amenities.some(a => a.toLowerCase().includes('spa') || a.toLowerCase().includes('massage'))) {
          tags.push('relaxation');
        }
        if (hotel.amenities.some(a => a.toLowerCase().includes('restaurant') || a.toLowerCase().includes('dining'))) {
          tags.push('food');
        }
        if (hotel.amenities.some(a => a.toLowerCase().includes('heritage') || a.toLowerCase().includes('historic'))) {
          tags.push('historic');
        }
      }
      
      // Add couple-friendly for high-rated hotels
      if (hotel.rating > 4.5) {
        tags.push('couples');
      }
      
      // Add location-based tags
      if (hotel.location.toLowerCase().includes('lake')) {
        tags.push('nature');
      }
      if (hotel.location.toLowerCase().includes('temple') || hotel.location.toLowerCase().includes('dilwara')) {
        tags.push('cultural');
      }
      
      // Make sure we have at least 2 tags
      if (tags.length < 2) {
        if (!tags.includes('photography') && Math.random() > 0.5) {
          tags.push('photography');
        }
        if (!tags.includes('shopping') && Math.random() > 0.5) {
          tags.push('shopping');
        }
      }
      
      return {
        id: hotel.id,
        name: hotel.name,
        type: 'hotel',
        description: `${hotel.stars}-star hotel in ${hotel.location}`,
        image: hotel.image,
        price: `₹${hotel.pricePerNight}/night`,
        rating: hotel.rating,
        tags: tags
      };
    });
  };

  // Filter recommendations based on preferences
  const getFilteredRecommendations = () => {
    const items = getRecommendationItems();
    
    if (preferences.length === 0) {
      return items;
    }
    
    return items.filter(item => 
      item.tags.some(tag => preferences.includes(tag))
    );
  };
  
  const filteredRecommendations = getFilteredRecommendations();

  // Add some adventure activities to recommendations
  const adventureActivities = [
    {
      id: 999,
      name: "Sunset Point Trekking",
      type: "activity",
      description: "Experience breathtaking sunset views with guided trekking tour",
      image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      price: "₹800/person",
      rating: 4.7,
      tags: ["adventure", "nature", "photography"]
    },
    {
      id: 998,
      name: "Heritage Walk Tour",
      type: "activity",
      description: "Guided tour through historic temples and colonial architecture",
      image: "https://images.unsplash.com/photo-1592639296346-560c37a0f711?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      price: "₹500/person",
      rating: 4.6,
      tags: ["cultural", "historic", "photography"]
    }
  ];
  
  // Add restaurant recommendations
  const restaurantRecommendations = [
    {
      id: 997,
      name: "Rajasthani Flavors",
      type: "restaurant",
      description: "Authentic Rajasthani cuisine with lake views",
      image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=2574&ixlib=rb-4.0.3",
      price: "₹600 for two",
      rating: 4.5,
      tags: ["food", "cultural"]
    }
  ];
  
  // Combine all recommendations
  const allRecommendations = [...filteredRecommendations];
  
  // Add adventure activities and restaurants if preferences match
  if (preferences.includes('adventure') || preferences.includes('nature') || preferences.length === 0) {
    allRecommendations.push(adventureActivities[0]);
  }
  
  if (preferences.includes('cultural') || preferences.includes('historic') || preferences.length === 0) {
    allRecommendations.push(adventureActivities[1]);
  }
  
  if (preferences.includes('food') || preferences.includes('cultural') || preferences.length === 0) {
    allRecommendations.push(restaurantRecommendations[0]);
  }

  return (
    <Card className={`overflow-hidden ${className}`}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle>Personalized Recommendations</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowPreferences(!showPreferences)}
          >
            {showPreferences ? 'Hide Preferences' : 'Set Preferences'}
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="pb-4">
        {showPreferences && (
          <PreferenceSelector 
            preferences={preferences}
            togglePreference={togglePreference}
          />
        )}
        
        {loading ? (
          <div className="h-[200px] flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <ScrollArea className="h-[300px]">
            <div className="space-y-3">
              {!user && !showPreferences && (
                <div className="bg-gray-50 p-3 rounded-lg mb-3">
                  <p className="text-sm">
                    <a href="/auth" className="text-primary font-medium">Sign in</a> to receive personalized recommendations based on your preferences.
                  </p>
                </div>
              )}
              
              {allRecommendations.length > 0 ? (
                allRecommendations.map(item => (
                  <RecommendationItem 
                    key={item.id} 
                    item={item} 
                    preferences={preferences} 
                  />
                ))
              ) : (
                <div className="text-center p-6 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-500">
                    No recommendations match your current preferences.
                  </p>
                  <Button 
                    variant="link" 
                    size="sm" 
                    onClick={() => togglePreference(preferences[0] || 'luxury')}
                    className="mt-2"
                  >
                    Try different preferences
                  </Button>
                </div>
              )}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};

export default PersonalizedRecommendations;

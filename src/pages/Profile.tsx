
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

// Define the type for favorites
type Favorite = {
  id: string;
  item_type: 'hotel' | 'adventure' | 'car' | 'bike';
  item_id: number;
  name?: string;
  image?: string;
  price?: number;
  location?: string;
  created_at?: string;
  user_id?: string;
};

const Profile = () => {
  const { user, profile, loading: authLoading } = useAuth();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [filteredFavorites, setFilteredFavorites] = useState<Favorite[]>([]);
  const [activeTab, setActiveTab] = useState<'hotel' | 'adventure' | 'car' | 'bike'>('hotel');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

  useEffect(() => {
    if (favorites.length > 0) {
      setFilteredFavorites(favorites.filter(fav => fav.item_type === activeTab));
    }
  }, [favorites, activeTab]);

  const fetchFavorites = async () => {
    try {
      setLoading(true);
      const { data: favoritesData, error: favoritesError } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user?.id);

      if (favoritesError) throw favoritesError;

      // Process favorites to get item details
      const enrichedFavorites: Favorite[] = [];
      
      for (const fav of favoritesData) {
        // Ensure item_type is one of the allowed types
        if (!['hotel', 'adventure', 'car', 'bike'].includes(fav.item_type)) {
          console.error(`Unknown item_type: ${fav.item_type}`);
          continue;
        }
        
        const itemType = fav.item_type as 'hotel' | 'adventure' | 'car' | 'bike';
        const table = itemType === 'hotel' ? 'hotels' : 
                      itemType === 'adventure' ? 'adventures' : 
                      itemType === 'car' ? 'car_rentals' : 'bike_rentals';
        
        try {
          const { data, error } = await supabase
            .from(table)
            .select('*')
            .eq('id', fav.item_id)
            .single();

          if (error) {
            console.error(`Error fetching ${itemType} details:`, error);
            // Still include the favorite with basic info
            enrichedFavorites.push({
              ...fav,
              item_type: itemType
            });
          } else {
            // Add details from the related table
            enrichedFavorites.push({
              ...fav,
              item_type: itemType,
              name: data.name,
              image: data.image,
              price: data.price || data.price_per_night,
              location: data.location
            });
          }
        } catch (error) {
          console.error(`Error processing ${itemType}:`, error);
        }
      }

      setFavorites(enrichedFavorites);
      setFilteredFavorites(enrichedFavorites.filter(fav => fav.item_type === activeTab));
    } catch (error) {
      console.error('Error fetching favorites:', error);
      toast({
        title: "Error",
        description: "Failed to load favorites. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const removeFavorite = async (favoriteId: string) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', favoriteId);

      if (error) throw error;

      // Update state locally after successful deletion
      setFavorites(prevFavorites => prevFavorites.filter(fav => fav.id !== favoriteId));
      toast({
        title: "Success",
        description: "Item removed from favorites",
      });
    } catch (error) {
      console.error('Error removing favorite:', error);
      toast({
        title: "Error",
        description: "Failed to remove from favorites",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <Header />
      <main className="flex-1 container-custom py-12">
        {/* Profile section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-4">
                  <AvatarImage src={profile?.avatar_url || ''} alt={profile?.username || 'User'} />
                  <AvatarFallback>
                    {profile?.username?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <h2 className="text-xl font-semibold">{profile?.full_name || profile?.username || user?.email}</h2>
                <p className="text-stone-500 text-sm mt-1">{user?.email}</p>
                <Button className="mt-6 w-full" variant="outline" onClick={() => navigate('/auth?tab=edit-profile')}>
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h2 className="text-xl font-semibold mb-6">Your Favorites</h2>
              
              <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'hotel' | 'adventure' | 'car' | 'bike')}>
                <TabsList className="mb-6">
                  <TabsTrigger value="hotel">Hotels</TabsTrigger>
                  <TabsTrigger value="adventure">Adventures</TabsTrigger>
                  <TabsTrigger value="car">Cars</TabsTrigger>
                  <TabsTrigger value="bike">Bikes</TabsTrigger>
                </TabsList>
                
                {(['hotel', 'adventure', 'car', 'bike'] as const).map((type) => (
                  <TabsContent key={type} value={type}>
                    {loading ? (
                      <div className="text-center py-10">Loading favorites...</div>
                    ) : filteredFavorites.length === 0 ? (
                      <div className="text-center py-10">
                        <p className="text-stone-500">No favorites found.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {filteredFavorites.map((favorite) => (
                          <div key={favorite.id} className="bg-stone-50 rounded-lg overflow-hidden shadow-sm">
                            <div className="aspect-video relative overflow-hidden">
                              <img 
                                src={favorite.image || '/placeholder.svg'} 
                                alt={favorite.name || 'Favorite item'} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="p-4">
                              <h3 className="font-medium">{favorite.name || 'Unnamed item'}</h3>
                              <p className="text-sm text-stone-500 mt-1">{favorite.location || 'No location'}</p>
                              <div className="flex justify-between items-center mt-3">
                                <span className="font-semibold">₹{favorite.price?.toLocaleString() || 'N/A'}</span>
                                <Button 
                                  variant="destructive" 
                                  size="sm"
                                  onClick={() => removeFavorite(favorite.id)}
                                >
                                  Remove
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;

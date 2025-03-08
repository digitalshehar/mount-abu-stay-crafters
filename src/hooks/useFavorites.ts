
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Favorite } from '@/types/favorites';
import { User } from '@supabase/supabase-js';

export const useFavorites = (user: User | null) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchFavorites();
    }
  }, [user]);

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
        
        // Type assertion to ensure TypeScript knows this is a valid type
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
            // Extract price based on item type
            let price: number | undefined;
            let location: string | undefined = 'No location';
            
            if (itemType === 'hotel' && 'price_per_night' in data) {
              price = data.price_per_night;
            } else if ('price' in data) {
              price = data.price;
            }
            
            // Check if location exists before trying to access it
            if ('location' in data) {
              location = data.location;
            }
            
            // Add details from the related table
            enrichedFavorites.push({
              ...fav,
              item_type: itemType,
              name: data.name,
              image: data.image,
              price: price,
              location: location
            });
          }
        } catch (error) {
          console.error(`Error processing ${itemType}:`, error);
        }
      }

      setFavorites(enrichedFavorites);
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

  const addFavorite = async (item: { 
    id: number;
    name: string;
    type: 'hotel' | 'adventure' | 'car' | 'bike';
    image: string;
    location: string;
    price: number;
    slug?: string;
  }) => {
    try {
      const { data, error } = await supabase.from('favorites').insert({
        user_id: user?.id,
        item_type: item.type,
        item_id: item.id
      }).select().single();

      if (error) throw error;

      // Add the new favorite to state with the full details
      setFavorites([...favorites, {
        ...data,
        name: item.name,
        image: item.image,
        price: item.price,
        location: item.location
      }]);

      toast({
        title: "Added to Favorites",
        description: `${item.name} has been added to your favorites.`,
      });
      
      return true;
    } catch (error) {
      console.error('Error adding favorite:', error);
      toast({
        title: "Error",
        description: "Failed to add to favorites. Please try again.",
        variant: "destructive",
      });
      return false;
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

  return { favorites, loading, removeFavorite, addFavorite };
};

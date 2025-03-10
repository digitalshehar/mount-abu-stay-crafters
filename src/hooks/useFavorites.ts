
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export interface Favorite {
  id: string;
  user_id: string;
  item_id: number;
  item_type: string;
  created_at: string;
}

export const useFavorites = (user: User | null) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchFavorites = async () => {
    if (!user) {
      setFavorites([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      console.log('Fetching favorites for user ID:', user.id);
      
      const { data, error } = await supabase
        .from('favorites')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching favorites:', error);
        throw error;
      }

      console.log('Favorites fetched:', data);
      setFavorites(data || []);
    } catch (error) {
      console.error('Error in fetchFavorites:', error);
      toast({
        title: 'Error',
        description: 'Failed to load favorites',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const addToFavorites = async (itemId: number, itemType: string) => {
    if (!user) {
      toast({
        title: 'Authentication Required',
        description: 'Please sign in to add favorites',
      });
      return false;
    }

    try {
      console.log('Adding to favorites:', { itemId, itemType });
      
      const { data, error } = await supabase
        .from('favorites')
        .insert({
          user_id: user.id,
          item_id: itemId,
          item_type: itemType
        })
        .select();

      if (error) {
        console.error('Error adding to favorites:', error);
        throw error;
      }

      setFavorites(prev => [...prev, data[0]]);
      
      toast({
        title: 'Added to Favorites',
        description: 'Item has been added to your favorites',
      });
      
      return true;
    } catch (error) {
      console.error('Error in addToFavorites:', error);
      toast({
        title: 'Error',
        description: 'Failed to add to favorites',
        variant: 'destructive',
      });
      return false;
    }
  };

  const removeFromFavorites = async (itemId: number, itemType: string) => {
    if (!user) return false;

    try {
      console.log('Removing from favorites:', { itemId, itemType });
      
      // Find the favorite ID to remove
      const favoriteToRemove = favorites.find(
        fav => fav.item_id === itemId && fav.item_type === itemType
      );
      
      if (!favoriteToRemove) {
        console.warn('Favorite not found:', { itemId, itemType });
        return false;
      }
      
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', favoriteToRemove.id);

      if (error) {
        console.error('Error removing from favorites:', error);
        throw error;
      }

      setFavorites(prev => 
        prev.filter(fav => !(fav.item_id === itemId && fav.item_type === itemType))
      );
      
      toast({
        title: 'Removed from Favorites',
        description: 'Item has been removed from your favorites',
      });
      
      return true;
    } catch (error) {
      console.error('Error in removeFromFavorites:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove from favorites',
        variant: 'destructive',
      });
      return false;
    }
  };

  // Add this function for direct removal by ID (used in other components)
  const removeFavorite = async (id: string) => {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error removing favorite by ID:', error);
        throw error;
      }

      setFavorites(prev => prev.filter(fav => fav.id !== id));
      
      toast({
        title: 'Removed from Favorites',
        description: 'Item has been removed from your favorites',
      });
      
      return true;
    } catch (error) {
      console.error('Error in removeFavorite:', error);
      toast({
        title: 'Error',
        description: 'Failed to remove from favorites',
        variant: 'destructive',
      });
      return false;
    }
  };

  const isFavorite = (itemId: number, itemType: string) => {
    return favorites.some(fav => fav.item_id === itemId && fav.item_type === itemType);
  };

  // Add a function to get favorite ID by item ID and type
  const getFavoriteId = (itemId: number, itemType: string): string | undefined => {
    const favorite = favorites.find(
      fav => fav.item_id === itemId && fav.item_type === itemType
    );
    return favorite?.id;
  };

  useEffect(() => {
    fetchFavorites();
  }, [user?.id]);

  return {
    favorites,
    loading,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    fetchFavorites,
    // Add additional methods for compatibility
    removeFavorite,
    getFavoriteId
  };
};

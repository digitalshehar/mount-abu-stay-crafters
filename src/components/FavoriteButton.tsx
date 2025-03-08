
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface FavoriteButtonProps {
  itemId: number;
  itemType: 'hotel' | 'car' | 'bike' | 'adventure';
  variant?: 'default' | 'ghost' | 'outline' | 'secondary' | 'destructive' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  itemId,
  itemType,
  variant = 'outline',
  size = 'icon',
  className = ''
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      checkIfFavorite();
    }
  }, [user, itemId, itemType]);

  const checkIfFavorite = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', user?.id)
        .eq('item_type', itemType)
        .eq('item_id', itemId)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setIsFavorite(true);
        setFavoriteId(data.id);
      } else {
        setIsFavorite(false);
        setFavoriteId(null);
      }
    } catch (error) {
      console.error('Error checking favorite status:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFavorite = async () => {
    if (!user) {
      toast({
        title: 'Authentication required',
        description: 'Please sign in to save favorites',
        variant: 'default',
      });
      navigate('/auth');
      return;
    }

    try {
      setLoading(true);
      
      if (isFavorite && favoriteId) {
        // Remove from favorites
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('id', favoriteId);

        if (error) throw error;

        setIsFavorite(false);
        setFavoriteId(null);
        
        toast({
          title: 'Removed from favorites',
          description: 'Item has been removed from your favorites.',
        });
      } else {
        // Add to favorites
        const { data, error } = await supabase
          .from('favorites')
          .insert({
            user_id: user.id,
            item_type: itemType,
            item_id: itemId
          })
          .select()
          .single();

        if (error) throw error;

        setIsFavorite(true);
        setFavoriteId(data.id);
        
        toast({
          title: 'Added to favorites',
          description: 'Item has been added to your favorites.',
        });
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      toast({
        title: 'Error',
        description: 'Failed to update favorites.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={`${className} ${isFavorite ? 'text-rose-500' : ''}`}
      onClick={toggleFavorite}
      disabled={loading}
    >
      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
    </Button>
  );
};

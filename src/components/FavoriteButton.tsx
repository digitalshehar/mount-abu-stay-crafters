
import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '@/hooks/useFavorites';

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
  const { isFavorite, addToFavorites, removeFromFavorites } = useFavorites(user);
  
  const [loading, setLoading] = useState(false);
  const [favorite, setFavorite] = useState(false);

  // Check if the item is in favorites when component mounts or user changes
  useEffect(() => {
    if (user) {
      setFavorite(isFavorite(itemId, itemType));
    } else {
      setFavorite(false);
    }
  }, [user, itemId, itemType, isFavorite]);

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
      
      if (favorite) {
        const success = await removeFromFavorites(itemId, itemType);
        if (success) {
          setFavorite(false);
        }
      } else {
        const success = await addToFavorites(itemId, itemType);
        if (success) {
          setFavorite(true);
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={`${className} ${favorite ? 'text-rose-500' : ''}`}
      onClick={toggleFavorite}
      disabled={loading}
    >
      <Heart className={`h-5 w-5 ${favorite ? 'fill-current' : ''}`} />
    </Button>
  );
};

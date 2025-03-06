
import React from 'react';
import { Button } from '@/components/ui/button';
import { Favorite } from '@/types/favorites';

interface FavoriteItemProps {
  favorite: Favorite;
  onRemove: (id: string) => void;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({ favorite, onRemove }) => {
  return (
    <div className="bg-stone-50 rounded-lg overflow-hidden shadow-sm">
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
            onClick={() => onRemove(favorite.id)}
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;

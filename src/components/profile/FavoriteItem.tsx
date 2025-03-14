
import React from 'react';
import { Button } from '@/components/ui/button';
import { Favorite } from '@/types/favorites';

interface FavoriteItemProps {
  favorite: Favorite;
  onRemove: (id: string) => void;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({ favorite, onRemove }) => {
  // Extract item details from joined data based on the item_type
  const itemData = favorite[`${favorite.item_type}s`] || {};
  const image = itemData.image || '/placeholder.svg';
  const name = itemData.name || 'Unnamed item';
  const location = itemData.location || 'No location';
  const price = itemData.price || itemData.price_per_night || 0;
  
  return (
    <div className="bg-stone-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium">{name}</h3>
        <p className="text-sm text-stone-500 mt-1">{location}</p>
        <div className="flex justify-between items-center mt-3">
          <span className="font-semibold">₹{price.toLocaleString() || 'N/A'}</span>
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


import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import FavoriteItem from './FavoriteItem';
import { Favorite } from '@/types/favorites';

interface FavoritesListProps {
  favorites: Favorite[];
  activeTab: 'hotel' | 'adventure' | 'car' | 'bike';
  setActiveTab: (tab: 'hotel' | 'adventure' | 'car' | 'bike') => void;
  loading: boolean;
  onRemoveFavorite: (id: string) => Promise<void>;
}

const FavoritesList: React.FC<FavoritesListProps> = ({ 
  favorites, 
  activeTab, 
  setActiveTab, 
  loading, 
  onRemoveFavorite 
}) => {
  // Filter favorites based on active tab
  const filteredFavorites = favorites.filter(fav => fav.item_type === activeTab);

  return (
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
                  <FavoriteItem 
                    key={favorite.id} 
                    favorite={favorite} 
                    onRemove={onRemoveFavorite} 
                  />
                ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default FavoritesList;

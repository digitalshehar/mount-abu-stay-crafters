
import React from 'react';
import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import FavoriteItem from './FavoriteItem';
import { Favorite as FavoriteType } from '@/types/favorites';

export interface Favorite {
  id: string;
  user_id: string;
  item_id: string | number;
  item_type: 'hotel' | 'destination' | 'adventure' | 'activity';
  created_at: string;
}

interface FavoritesListProps {
  favorites: FavoriteType[];
  activeTab: string;
  setActiveTab: (value: string) => void;
  loading: boolean;
  onRemoveFavorite: (id: string) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  activeTab,
  setActiveTab,
  loading,
  onRemoveFavorite
}) => {
  const filteredFavorites = favorites.filter(
    (fav) => fav.item_type === activeTab
  );

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold mb-6">Your Favorites</h2>
      
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 grid grid-cols-4 w-full">
          <TabsTrigger value="hotel">Hotels</TabsTrigger>
          <TabsTrigger value="destination">Destinations</TabsTrigger>
          <TabsTrigger value="adventure">Adventures</TabsTrigger>
          <TabsTrigger value="activity">Activities</TabsTrigger>
        </TabsList>
        
        {['hotel', 'destination', 'adventure', 'activity'].map((type) => (
          <TabsContent key={type} value={type}>
            {loading ? (
              <div className="flex justify-center items-center py-8">
                <p>Loading your favorites...</p>
              </div>
            ) : filteredFavorites.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredFavorites.map((favorite) => (
                  <FavoriteItem
                    key={favorite.id}
                    favorite={favorite}
                    onRemove={() => onRemoveFavorite(favorite.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-stone-500">
                  You haven't saved any {type}s as favorites yet.
                </p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default FavoritesList;

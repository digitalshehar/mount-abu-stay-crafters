
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hotel } from '@/components/admin/hotels/types';
import { Link } from 'react-router-dom';
import { Star, X, Map, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export interface Favorite {
  id: number;
  user_id: string;
  item_id: number;
  item_type: 'hotel' | 'destination' | 'adventure' | 'activity';
  created_at: string;
  hotel?: Hotel;
  destination?: any;
  adventure?: any;
  activity?: any;
}

export interface FavoritesListProps {
  favorites: Favorite[];
  activeTab: string;
  setActiveTab: (value: string) => void;
  loading: boolean;
  onRemoveFavorite: (id: number) => void;
}

const FavoritesList: React.FC<FavoritesListProps> = ({
  favorites,
  activeTab,
  setActiveTab,
  loading,
  onRemoveFavorite
}) => {
  // Filter favorites by type
  const getFilteredFavorites = (type: string) => {
    return favorites.filter(fav => fav.item_type === type);
  };

  const hotels = getFilteredFavorites('hotel');
  const destinations = getFilteredFavorites('destination');
  const adventures = getFilteredFavorites('adventure');
  const activities = getFilteredFavorites('activity');

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 animate-pulse">
        <div className="h-8 bg-stone-200 rounded w-1/4 mb-4"></div>
        <div className="h-10 bg-stone-200 rounded w-full mb-6"></div>
        <div className="space-y-4">
          {[...Array(3)].map((_, index) => (
            <div key={index} className="h-24 bg-stone-200 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="p-6 border-b border-stone-100">
        <h3 className="text-xl font-bold">My Favorites</h3>
        <p className="text-stone-500 text-sm mt-1">
          Items you've saved for future reference
        </p>
      </div>

      <Tabs defaultValue="hotels" value={activeTab} onValueChange={setActiveTab}>
        <div className="px-6 pt-4">
          <TabsList className="w-full justify-start border-b bg-transparent p-0">
            <TabsTrigger 
              value="hotels" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2 data-[state=active]:shadow-none"
            >
              Hotels ({hotels.length})
            </TabsTrigger>
            <TabsTrigger 
              value="destinations" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2 data-[state=active]:shadow-none"
            >
              Destinations ({destinations.length})
            </TabsTrigger>
            <TabsTrigger 
              value="adventures" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2 data-[state=active]:shadow-none"
            >
              Adventures ({adventures.length})
            </TabsTrigger>
            <TabsTrigger 
              value="activities" 
              className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-4 py-2 data-[state=active]:shadow-none"
            >
              Activities ({activities.length})
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="p-6">
          <TabsContent value="hotels" className="m-0">
            {hotels.length > 0 ? (
              <div className="space-y-4">
                {hotels.map((favorite) => (
                  <HotelFavoriteCard 
                    key={favorite.id} 
                    favorite={favorite} 
                    onRemove={onRemoveFavorite} 
                  />
                ))}
              </div>
            ) : (
              <EmptyState type="hotels" />
            )}
          </TabsContent>

          <TabsContent value="destinations" className="m-0">
            {destinations.length > 0 ? (
              <div className="space-y-4">
                {destinations.map((favorite) => (
                  <DestinationFavoriteCard 
                    key={favorite.id} 
                    favorite={favorite} 
                    onRemove={onRemoveFavorite} 
                  />
                ))}
              </div>
            ) : (
              <EmptyState type="destinations" />
            )}
          </TabsContent>

          <TabsContent value="adventures" className="m-0">
            {adventures.length > 0 ? (
              <div className="space-y-4">
                {adventures.map((favorite) => (
                  <AdventureFavoriteCard 
                    key={favorite.id} 
                    favorite={favorite} 
                    onRemove={onRemoveFavorite} 
                  />
                ))}
              </div>
            ) : (
              <EmptyState type="adventures" />
            )}
          </TabsContent>

          <TabsContent value="activities" className="m-0">
            {activities.length > 0 ? (
              <div className="space-y-4">
                {activities.map((favorite) => (
                  <ActivityFavoriteCard 
                    key={favorite.id} 
                    favorite={favorite} 
                    onRemove={onRemoveFavorite} 
                  />
                ))}
              </div>
            ) : (
              <EmptyState type="activities" />
            )}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

// Hotel Favorite Card
const HotelFavoriteCard: React.FC<{ 
  favorite: Favorite; 
  onRemove: (id: number) => void;
}> = ({ favorite, onRemove }) => {
  // Default data if hotel is not loaded
  const hotel = favorite.hotel || {
    name: "Hotel name not available",
    location: "Location not available",
    image: "/placeholder.svg",
    pricePerNight: 0,
    rating: 0,
    slug: ""
  };

  return (
    <div className="flex border border-stone-200 rounded-lg overflow-hidden group hover:border-primary transition-colors">
      <div className="w-24 h-24 overflow-hidden">
        <img 
          src={hotel.image} 
          alt={hotel.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </div>
      
      <div className="flex-grow p-4">
        <div className="flex justify-between">
          <Link to={`/hotel/${hotel.slug}`} className="font-medium group-hover:text-primary transition-colors">
            {hotel.name}
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 rounded-full hover:bg-red-50 hover:text-red-500 -mt-1 -mr-1"
            onClick={() => onRemove(favorite.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-stone-500">{hotel.location}</p>
        
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center text-sm">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
            <span>{hotel.rating.toFixed(1)}</span>
          </div>
          
          <span className="text-sm font-medium text-green-600">
            ₹{hotel.pricePerNight.toLocaleString()}/night
          </span>
        </div>
      </div>
    </div>
  );
};

// Destination Favorite Card
const DestinationFavoriteCard: React.FC<{ 
  favorite: Favorite; 
  onRemove: (id: number) => void;
}> = ({ favorite, onRemove }) => {
  return (
    <div className="flex border border-stone-200 rounded-lg overflow-hidden group hover:border-primary transition-colors">
      <div className="w-24 h-24 overflow-hidden bg-stone-100 flex items-center justify-center">
        <Map className="h-8 w-8 text-stone-400" />
      </div>
      
      <div className="flex-grow p-4">
        <div className="flex justify-between">
          <Link to={`/destinations/${favorite.item_id}`} className="font-medium group-hover:text-primary transition-colors">
            Destination #{favorite.item_id}
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 rounded-full hover:bg-red-50 hover:text-red-500 -mt-1 -mr-1"
            onClick={() => onRemove(favorite.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-stone-500">No details available</p>
      </div>
    </div>
  );
};

// Adventure Favorite Card
const AdventureFavoriteCard: React.FC<{ 
  favorite: Favorite; 
  onRemove: (id: number) => void;
}> = ({ favorite, onRemove }) => {
  return (
    <div className="flex border border-stone-200 rounded-lg overflow-hidden group hover:border-primary transition-colors">
      <div className="w-24 h-24 overflow-hidden bg-stone-100 flex items-center justify-center">
        <Calendar className="h-8 w-8 text-stone-400" />
      </div>
      
      <div className="flex-grow p-4">
        <div className="flex justify-between">
          <Link to={`/adventures/${favorite.item_id}`} className="font-medium group-hover:text-primary transition-colors">
            Adventure #{favorite.item_id}
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 rounded-full hover:bg-red-50 hover:text-red-500 -mt-1 -mr-1"
            onClick={() => onRemove(favorite.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-stone-500">No details available</p>
      </div>
    </div>
  );
};

// Activity Favorite Card
const ActivityFavoriteCard: React.FC<{ 
  favorite: Favorite; 
  onRemove: (id: number) => void;
}> = ({ favorite, onRemove }) => {
  return (
    <div className="flex border border-stone-200 rounded-lg overflow-hidden group hover:border-primary transition-colors">
      <div className="w-24 h-24 overflow-hidden bg-stone-100 flex items-center justify-center">
        <Calendar className="h-8 w-8 text-stone-400" />
      </div>
      
      <div className="flex-grow p-4">
        <div className="flex justify-between">
          <Link to={`/activities/${favorite.item_id}`} className="font-medium group-hover:text-primary transition-colors">
            Activity #{favorite.item_id}
          </Link>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-6 w-6 rounded-full hover:bg-red-50 hover:text-red-500 -mt-1 -mr-1"
            onClick={() => onRemove(favorite.id)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-stone-500">No details available</p>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState: React.FC<{ type: string }> = ({ type }) => {
  return (
    <div className="text-center py-12 px-4">
      <div className="bg-stone-100 p-4 rounded-full inline-block mb-4">
        <Star className="h-8 w-8 text-stone-400" />
      </div>
      <h4 className="text-lg font-medium mb-2">No favorite {type} yet</h4>
      <p className="text-stone-500 mb-6 max-w-sm mx-auto">
        Start exploring and save your favorite {type} for quick access later.
      </p>
      <Link 
        to={`/${type}`} 
        className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
      >
        Browse {type}
      </Link>
    </div>
  );
};

export default FavoritesList;

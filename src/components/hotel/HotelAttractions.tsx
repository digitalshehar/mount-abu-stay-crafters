
import React from 'react';
import { MapPin, Navigation, Clock, Camera, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export interface HotelAttractionsProps {
  attractions: any[];
  location: string;
}

const HotelAttractions: React.FC<HotelAttractionsProps> = ({ 
  attractions,
  location 
}) => {
  // Default attractions if none provided
  const defaultAttractions = [
    { 
      name: "Nakki Lake", 
      distance: "1.2 km", 
      description: "A popular recreational spot offering boating and scenic views.", 
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1626621331169-5f11a2f86029",
      type: "Nature"
    },
    { 
      name: "Sunset Point", 
      distance: "2.5 km", 
      description: "Perfect spot to enjoy beautiful sunsets over the hills of Mount Abu.", 
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1534274867514-d5b47ef89ed7",
      type: "Viewpoint"
    },
    { 
      name: "Dilwara Temples", 
      distance: "3.8 km", 
      description: "Famous Jain temples known for their stunning marble architecture.", 
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1590005354167-6da97870c757",
      type: "Religious"
    },
    { 
      name: "Guru Shikhar", 
      distance: "6.5 km", 
      description: "The highest peak of Aravalli Range offering panoramic views of the surroundings.", 
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1468476396571-4d6f2a427ee7",
      type: "Nature"
    },
    { 
      name: "Achalgarh Fort", 
      distance: "8.3 km", 
      description: "Historic fort built in the 14th century with beautiful temples inside.", 
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1599661046289-e31897846e41",
      type: "Historical"
    },
    { 
      name: "Wildlife Sanctuary", 
      distance: "5.7 km", 
      description: "Home to various species of wildlife including leopards, sloth bears, and sambhar.", 
      rating: 4.2,
      image: "https://images.unsplash.com/photo-1546182990-dffeafbe841d",
      type: "Nature"
    }
  ];
  
  const attractionsList = attractions.length > 0 ? attractions : defaultAttractions;
  
  return (
    <div>
      <h2 className="text-2xl font-display font-semibold mb-6">Nearby Attractions</h2>
      
      <Tabs defaultValue="all">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="nature">Nature</TabsTrigger>
            <TabsTrigger value="historical">Historical</TabsTrigger>
            <TabsTrigger value="religious">Religious</TabsTrigger>
          </TabsList>
          
          <div className="flex items-center text-sm text-stone-500">
            <MapPin className="h-4 w-4 mr-1 text-primary" /> 
            Distances from {location}
          </div>
        </div>
        
        <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {attractionsList.map((attraction, index) => (
            <AttractionCard key={index} attraction={attraction} />
          ))}
        </TabsContent>
        
        <TabsContent value="nature" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {attractionsList
            .filter(a => a.type?.toLowerCase() === 'nature')
            .map((attraction, index) => (
              <AttractionCard key={index} attraction={attraction} />
            ))}
        </TabsContent>
        
        <TabsContent value="historical" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {attractionsList
            .filter(a => a.type?.toLowerCase() === 'historical')
            .map((attraction, index) => (
              <AttractionCard key={index} attraction={attraction} />
            ))}
        </TabsContent>
        
        <TabsContent value="religious" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {attractionsList
            .filter(a => a.type?.toLowerCase() === 'religious')
            .map((attraction, index) => (
              <AttractionCard key={index} attraction={attraction} />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

interface AttractionCardProps {
  attraction: {
    name: string;
    distance: string;
    description: string;
    rating?: number;
    image?: string;
    type?: string;
  };
}

const AttractionCard: React.FC<AttractionCardProps> = ({ attraction }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-stone-100 flex flex-col">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={attraction.image || 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2'} 
          alt={attraction.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-white/90 text-stone-700">
            {attraction.type || 'Attraction'}
          </Badge>
        </div>
      </div>
      
      <div className="p-4 flex-grow">
        <div className="flex items-start justify-between">
          <h3 className="font-semibold text-lg">{attraction.name}</h3>
          {attraction.rating && (
            <div className="flex items-center bg-primary/10 px-2 py-1 rounded text-sm">
              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
              <span>{attraction.rating}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center mt-2 text-sm text-stone-500">
          <Navigation className="h-4 w-4 mr-1" />
          <span>{attraction.distance}</span>
        </div>
        
        <p className="mt-3 text-sm text-stone-600">{attraction.description}</p>
      </div>
      
      <div className="p-4 pt-2 border-t border-stone-100">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-full"
          onClick={() => window.open(`https://maps.google.com/?q=${attraction.name} ${location}`, '_blank')}
        >
          <MapPin className="h-4 w-4 mr-2" />
          View on Map
        </Button>
      </div>
    </div>
  );
};

export default HotelAttractions;

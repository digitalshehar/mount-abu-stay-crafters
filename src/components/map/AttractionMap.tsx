
import React, { useState, useMemo, useEffect } from 'react';
import { GoogleMap, useLoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { MapPin, Navigation, Car, Info, List, Camera, Hotel, Coffee, Mountain } from 'lucide-react';

interface Attraction {
  id: string;
  name: string;
  description: string;
  image: string;
  category: 'viewpoint' | 'temple' | 'nature' | 'activity' | 'hotel' | 'restaurant';
  position: {
    lat: number;
    lng: number;
  };
  rating?: number;
  address?: string;
  timings?: string;
  entryFee?: string;
}

const mapContainerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '0.5rem'
};

// Center coordinates for Mount Abu
const center = {
  lat: 24.5926,
  lng: 72.7156
};

const options = {
  disableDefaultUI: false,
  zoomControl: true,
  mapTypeControl: true,
  streetViewControl: false,
  fullscreenControl: true,
};

// Attraction categories with icons
const categories = [
  { id: 'all', label: 'All', icon: <List className="h-4 w-4" /> },
  { id: 'viewpoint', label: 'Viewpoints', icon: <Mountain className="h-4 w-4" /> },
  { id: 'temple', label: 'Temples', icon: <MapPin className="h-4 w-4" /> },
  { id: 'nature', label: 'Nature', icon: <MapPin className="h-4 w-4" /> },
  { id: 'activity', label: 'Activities', icon: <MapPin className="h-4 w-4" /> },
  { id: 'hotel', label: 'Hotels', icon: <Hotel className="h-4 w-4" /> },
  { id: 'restaurant', label: 'Restaurants', icon: <Coffee className="h-4 w-4" /> },
];

const AttractionMap = () => {
  const [attractions, setAttractions] = useState<Attraction[]>([]);
  const [selectedAttraction, setSelectedAttraction] = useState<Attraction | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isLoading, setIsLoading] = useState(true);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    const fetchAttractions = async () => {
      // Simulate API fetch
      setTimeout(() => {
        const mockAttractions: Attraction[] = [
          {
            id: 'nakki-lake',
            name: 'Nakki Lake',
            description: 'A sacred lake surrounded by hills, perfect for boating and picnics.',
            image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400',
            category: 'nature',
            position: { lat: 24.5879, lng: 72.7157 },
            rating: 4.5,
            address: 'Mount Abu, Rajasthan 307501',
            timings: '8:00 AM - 6:00 PM',
            entryFee: 'Free (Boating charges extra)'
          },
          {
            id: 'dilwara-temples',
            name: 'Dilwara Jain Temples',
            description: 'Exquisite marble temples known for their stunning architectural beauty and intricate carvings.',
            image: 'https://images.unsplash.com/photo-1576487248805-cf45bb9a77df?w=400',
            category: 'temple',
            position: { lat: 24.6236, lng: 72.7209 },
            rating: 4.8,
            address: 'Mount Abu, Rajasthan 307501',
            timings: '12:00 PM - 5:00 PM (Closed on Tuesdays)',
            entryFee: '₹50 for Indians, ₹100 for foreigners'
          },
          {
            id: 'sunset-point',
            name: 'Sunset Point',
            description: 'Popular viewpoint offering panoramic views of the sunset over the Aravalli mountains.',
            image: 'https://images.unsplash.com/photo-1626621344862-5e4a5d5575b5?w=400',
            category: 'viewpoint',
            position: { lat: 24.5987, lng: 72.7053 },
            rating: 4.6,
            address: 'Sunset Road, Mount Abu, Rajasthan 307501',
            timings: 'Open 24 hours (Best during sunset)',
            entryFee: 'Free'
          },
          {
            id: 'guru-shikhar',
            name: 'Guru Shikhar',
            description: 'The highest peak in the Aravalli Range, offering breathtaking views of Mount Abu and surroundings.',
            image: 'https://images.unsplash.com/photo-1575482420752-345ad9f48aa4?w=400',
            category: 'viewpoint',
            position: { lat: 24.6535, lng: 72.7796 },
            rating: 4.7,
            address: '15 km from Mount Abu, Rajasthan',
            timings: '8:00 AM - 6:00 PM',
            entryFee: '₹30 per person'
          },
          {
            id: 'wildlife-sanctuary',
            name: 'Mount Abu Wildlife Sanctuary',
            description: 'Home to diverse flora and fauna including leopards, sloth bears, and over 250 species of birds.',
            image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=400',
            category: 'nature',
            position: { lat: 24.6009, lng: 72.7361 },
            rating: 4.3,
            address: 'Mount Abu, Rajasthan 307501',
            timings: '8:00 AM - 5:00 PM',
            entryFee: '₹50 for Indians, ₹300 for foreigners'
          },
          {
            id: 'toad-rock',
            name: 'Toad Rock',
            description: 'A rock formation resembling a toad, located near Nakki Lake.',
            image: 'https://images.unsplash.com/photo-1626621344862-5e4a5d5575b5?w=400',
            category: 'nature',
            position: { lat: 24.5826, lng: 72.7146 },
            rating: 4.0,
            address: 'Near Nakki Lake, Mount Abu, Rajasthan',
            timings: '6:00 AM - 7:00 PM',
            entryFee: 'Free'
          },
          {
            id: 'honeymoon-point',
            name: 'Honeymoon Point',
            description: 'Also known as Anadhra Point, a romantic spot offering spectacular valley views.',
            image: 'https://images.unsplash.com/photo-1566553253535-2754e6762695?w=400',
            category: 'viewpoint',
            position: { lat: 24.6034, lng: 72.7035 },
            rating: 4.2,
            address: 'Mount Abu, Rajasthan 307501',
            timings: '9:00 AM - 6:00 PM',
            entryFee: 'Free'
          },
          {
            id: 'achalgarh-fort',
            name: 'Achalgarh Fort',
            description: 'Ancient fort built by the Paramara dynasty, featuring stunning temples and panoramic views.',
            image: 'https://images.unsplash.com/photo-1596205520154-40dbd4b729de?w=400',
            category: 'temple',
            position: { lat: 24.6166, lng: 72.7529 },
            rating: 4.4,
            address: '11 km from Mount Abu, Rajasthan',
            timings: '9:00 AM - 5:00 PM',
            entryFee: '₹15 per person'
          },
          {
            id: 'trevor-tank',
            name: 'Trevor\'s Tank',
            description: 'A paradise for nature lovers and bird watchers, built by British engineer Trevor in 1897.',
            image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400',
            category: 'nature',
            position: { lat: 24.5680, lng: 72.7381 },
            rating: 4.1,
            address: '5 km from Mount Abu, Rajasthan',
            timings: '8:00 AM - 6:00 PM',
            entryFee: '₹30 per person'
          },
          {
            id: 'hotel-palace',
            name: 'Hilltop Palace Hotel',
            description: 'Luxury 5-star hotel with panoramic views of the city.',
            image: 'https://images.unsplash.com/photo-1566553253535-2754e6762695?w=400',
            category: 'hotel',
            position: { lat: 24.5934, lng: 72.7174 },
            rating: 4.7,
            address: 'Main Road, Mount Abu, Rajasthan 307501',
            timings: '24 hours',
            entryFee: 'N/A'
          },
          {
            id: 'arbuda-restaurant',
            name: 'Arbuda Restaurant',
            description: 'Popular restaurant serving authentic Rajasthani cuisine.',
            image: 'https://images.unsplash.com/photo-1575482420752-345ad9f48aa4?w=400',
            category: 'restaurant',
            position: { lat: 24.5895, lng: 72.7137 },
            rating: 4.5,
            address: 'Near Nakki Lake, Mount Abu, Rajasthan 307501',
            timings: '11:00 AM - 10:30 PM',
            entryFee: 'N/A'
          },
          {
            id: 'camping-adventure',
            name: 'Mount Abu Camping',
            description: 'Experience camping under the stars with adventure activities.',
            image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=400',
            category: 'activity',
            position: { lat: 24.6074, lng: 72.7273 },
            rating: 4.3,
            address: 'Outskirts of Mount Abu, Rajasthan',
            timings: 'By reservation',
            entryFee: '₹1500 per person'
          }
        ];
        setAttractions(mockAttractions);
        setIsLoading(false);
      }, 1500);
    };

    fetchAttractions();

    // Try to get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          console.log("Error: The Geolocation service failed.");
        }
      );
    }
  }, []);

  const handleMarkerClick = (attraction: Attraction) => {
    setSelectedAttraction(attraction);
  };

  const filteredAttractions = useMemo(() => {
    if (selectedCategory === 'all') {
      return attractions;
    }
    return attractions.filter(attraction => attraction.category === selectedCategory);
  }, [attractions, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setSelectedAttraction(null);
  };

  const navigateToAttraction = (attraction: Attraction) => {
    if (userLocation) {
      const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${attraction.position.lat},${attraction.position.lng}`;
      window.open(directionsUrl, '_blank');
    } else {
      const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${attraction.position.lat},${attraction.position.lng}`;
      window.open(directionsUrl, '_blank');
    }
  };

  const handleUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        () => {
          console.log("Error: The Geolocation service failed.");
        }
      );
    } else {
      console.log("Error: Your browser doesn't support geolocation.");
    }
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  if (!isLoaded) {
    return <div>Loading maps...</div>;
  }

  return (
    <Card className="w-full mt-4">
      <CardHeader>
        <CardTitle>Explore Mount Abu Attractions</CardTitle>
        <CardDescription>Discover the best places to visit in Mount Abu</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="map" className="mb-4">
          <div className="flex justify-between items-center">
            <TabsList>
              <TabsTrigger value="map" className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>Map View</span>
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center gap-1">
                <List className="h-4 w-4" />
                <span>List View</span>
              </TabsTrigger>
            </TabsList>
            
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={handleUserLocation}
            >
              <Navigation className="h-4 w-4" />
              <span>My Location</span>
            </Button>
          </div>
          
          <div className="mt-4">
            <TabsList className="mb-4 w-full justify-start overflow-x-auto">
              {categories.map(category => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className={selectedCategory === category.id ? 'bg-primary text-primary-foreground' : ''}
                >
                  <div className="flex items-center gap-1">
                    {category.icon}
                    <span>{category.label}</span>
                  </div>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
          
          <TabsContent value="map" className="mt-2">
            {isLoading ? (
              <Skeleton className="w-full h-[500px] rounded-md" />
            ) : (
              <div className="relative">
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={13}
                  options={options}
                  onLoad={() => setMapLoaded(true)}
                >
                  {/* User Location Marker */}
                  {userLocation && (
                    <MarkerF
                      position={userLocation}
                      icon={{
                        path: google.maps.SymbolPath.CIRCLE,
                        scale: 7,
                        fillColor: "#4285F4",
                        fillOpacity: 1,
                        strokeColor: "white",
                        strokeWeight: 2,
                      }}
                    />
                  )}
                  
                  {/* Attraction Markers */}
                  {filteredAttractions.map(attraction => (
                    <MarkerF
                      key={attraction.id}
                      position={attraction.position}
                      onClick={() => handleMarkerClick(attraction)}
                      icon={{
                        url: getCategoryIcon(attraction.category),
                        scaledSize: new google.maps.Size(32, 32),
                      }}
                    />
                  ))}
                  
                  {/* Info Window for Selected Attraction */}
                  {selectedAttraction && (
                    <InfoWindowF
                      position={selectedAttraction.position}
                      onCloseClick={() => setSelectedAttraction(null)}
                    >
                      <div className="max-w-xs">
                        <img
                          src={selectedAttraction.image}
                          alt={selectedAttraction.name}
                          className="w-full h-32 object-cover rounded mb-2"
                        />
                        <h3 className="font-bold text-lg">{selectedAttraction.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{selectedAttraction.description.substring(0, 100)}...</p>
                        <div className="flex justify-between items-center">
                          <span className="flex items-center gap-1">
                            {selectedAttraction.rating && (
                              <>
                                <span className="bg-green-100 text-green-800 px-1.5 py-0.5 rounded text-xs font-medium">
                                  {selectedAttraction.rating}★
                                </span>
                              </>
                            )}
                          </span>
                          <Button
                            size="sm"
                            className="gap-1"
                            onClick={() => navigateToAttraction(selectedAttraction)}
                          >
                            <Car className="h-3 w-3" />
                            <span>Directions</span>
                          </Button>
                        </div>
                      </div>
                    </InfoWindowF>
                  )}
                </GoogleMap>
                
                {mapLoaded && (
                  <div className="absolute bottom-4 left-4 p-2 bg-white dark:bg-gray-800 rounded shadow-md text-xs">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="font-medium">Distance legend:</span>
                    </div>
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1">
                      <div className="flex items-center gap-1">
                        <span className="inline-block bg-blue-500 h-1 w-8"></span>
                        <span>1 km</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="inline-block bg-blue-500 h-1 w-4"></span>
                        <span>500 m</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="list" className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {isLoading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <Skeleton key={index} className="h-64 w-full rounded-md" />
                ))
              ) : (
                filteredAttractions.map(attraction => (
                  <Card key={attraction.id} className="overflow-hidden">
                    <div className="relative h-36">
                      <img
                        src={attraction.image}
                        alt={attraction.name}
                        className="w-full h-full object-cover"
                      />
                      {attraction.rating && (
                        <span className="absolute top-2 right-2 bg-white text-green-800 px-2 py-1 rounded-md text-xs font-medium">
                          {attraction.rating}★
                        </span>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-bold">{attraction.name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                        {attraction.description}
                      </p>
                      <div className="mt-3 flex justify-between items-center">
                        <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full capitalize">
                          {attraction.category}
                        </span>
                        <Button
                          size="sm"
                          className="gap-1"
                          onClick={() => navigateToAttraction(attraction)}
                        >
                          <Navigation className="h-3 w-3" />
                          <span>Directions</span>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

// Helper function to get icon based on category
function getCategoryIcon(category: string) {
  switch (category) {
    case 'viewpoint':
      return 'https://maps.google.com/mapfiles/ms/icons/scenic.png';
    case 'temple':
      return 'https://maps.google.com/mapfiles/ms/icons/purple.png';
    case 'nature':
      return 'https://maps.google.com/mapfiles/ms/icons/green.png';
    case 'activity':
      return 'https://maps.google.com/mapfiles/ms/icons/yellow.png';
    case 'hotel':
      return 'https://maps.google.com/mapfiles/ms/icons/blue.png';
    case 'restaurant':
      return 'https://maps.google.com/mapfiles/ms/icons/orange.png';
    default:
      return 'https://maps.google.com/mapfiles/ms/icons/red.png';
  }
}

export default AttractionMap;

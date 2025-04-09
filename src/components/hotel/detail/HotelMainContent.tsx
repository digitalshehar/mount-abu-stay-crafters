
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Share, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Hotel, Room, ContactInfo, Landmarks, Review } from '@/types';
import ImageGallery from './ImageGallery';
import { toast } from 'sonner';
import SocialSharing from './SocialSharing';
import HotelTabContent from './HotelTabContent';

// Define NearbyAttraction interface compatible with props
interface NearbyAttraction {
  name: string;
  distance: string;
  description?: string;
  image?: string;
  rating?: number;
}

interface HotelMainContentProps {
  hotel: Hotel | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  showFullGallery: boolean;
  setShowFullGallery: (show: boolean) => void;
  nearbyAttractions?: NearbyAttraction[];
  onBookRoom: (room: any) => void;
}

const HotelMainContent: React.FC<HotelMainContentProps> = ({
  hotel,
  activeTab,
  setActiveTab,
  isFavorite = false,
  onToggleFavorite = () => {},
  showFullGallery,
  setShowFullGallery,
  nearbyAttractions = [],
  onBookRoom
}) => {
  if (!hotel) return null;

  // Hotel gallery images
  const galleryImages = hotel.gallery && hotel.gallery.length > 0 
    ? hotel.gallery 
    : hotel.images && hotel.images.length > 0 
      ? hotel.images 
      : [hotel.image];
      
  // Get price from either price or pricePerNight
  const price = hotel.price || hotel.pricePerNight || 0;

  // Ensure rooms have the 'count' property
  const enhancedRooms: Room[] = (hotel.rooms || []).map(room => ({
    ...room,
    count: room.count || 5 // Default to 5 if count is not provided
  }));

  // Create properly typed ContactInfo and Landmarks
  const contactInfo: ContactInfo = {
    phone: hotel.contactInfo?.phone || "+91 9876543210",
    email: hotel.contactInfo?.email,
    website: hotel.contactInfo?.website
  };

  const landmarks: Landmarks = {
    airport: hotel.landmarks?.airport || "Nearest Airport (100 km)",
    busStation: hotel.landmarks?.busStation,
    cityCenter: hotel.landmarks?.cityCenter
  };

  // Add share functionality
  const handleShareHotel = () => {
    if (navigator.share) {
      navigator
        .share({
          title: hotel.name,
          text: `Check out ${hotel.name} in ${hotel.location}`,
          url: window.location.href,
        })
        .then(() => toast.success("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href).then(() => {
        toast.success("Link copied to clipboard");
      });
    }
  };

  return (
    <main className="container-custom py-6 lg:py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center mb-2 text-sm text-gray-600">
                  <span>{hotel.location}</span>
                  <span className="mx-2">•</span>
                  <div className="flex items-center">
                    {Array.from({ length: hotel.stars || 0 }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold">{hotel.name}</h1>
                <div className="flex items-center mt-2">
                  <div className="flex items-center mr-2">
                    <Star className="w-4 h-4 mr-1 text-amber-400 fill-amber-400" />
                    <span className="font-semibold">{(hotel.rating || 4.0).toFixed(1)}</span>
                  </div>
                  <span className="text-sm text-gray-600">
                    ({hotel.reviewCount || 0} {hotel.reviewCount === 1 ? 'review' : 'reviews'})
                  </span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={onToggleFavorite}>
                  <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                  {isFavorite ? 'Saved' : 'Save'}
                </Button>
                
                <SocialSharing 
                  hotelName={hotel.name}
                  hotelLocation={hotel.location}
                />
              </div>
            </div>
            
            <ImageGallery
              images={galleryImages}
              hotelName={hotel.name}
            />
            
            <div className="bg-white rounded-lg p-5 border">
              <h2 className="text-xl font-semibold mb-4">About this hotel</h2>
              <p className="text-gray-700">{hotel.description}</p>
            </div>
            
            <HotelTabContent 
              activeTab={activeTab}
              hotel={hotel}
              nearbyAttractions={nearbyAttractions}
              onBookRoom={onBookRoom}
            />
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="sticky top-32">
            <div className="bg-white rounded-lg border overflow-hidden">
              <div className="p-6">
                <div className="mb-2 text-lg font-bold text-primary">₹{price}</div>
                <div className="text-sm text-gray-500 mb-4">per night + taxes & fees</div>
                
                <Button className="w-full mb-2" onClick={() => setActiveTab('rooms')}>
                  View Room Options
                </Button>
                
                <Button variant="outline" className="w-full" onClick={() => setActiveTab('transport')}>
                  Book Airport Transfer
                </Button>
              </div>
              
              <div className="border-t px-6 py-4 bg-gray-50">
                <h3 className="text-sm font-medium mb-2">Price guarantee</h3>
                <p className="text-xs text-gray-600">
                  Found this hotel cheaper elsewhere? We'll match the price and give you an additional 10% off.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HotelMainContent;

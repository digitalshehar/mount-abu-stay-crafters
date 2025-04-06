
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Share2, MapPin, Star, StarHalf, CheckCircle2, Video, Camera, Building, Mail, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

import HotelRooms from "./HotelRooms";
import HotelReviews from "./HotelReviews";
import HotelLocation from "./HotelLocation";
import HotelGallery from "./HotelGallery";
import HotelTransport from "./HotelTransport";
import HotelAmenities from "./HotelAmenities";
import HotelPolicies from "./HotelPolicies";
import { Hotel } from "@/components/admin/hotels/types";

interface HotelMainContentProps {
  hotel: any;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  showFullGallery: boolean;
  setShowFullGallery: (show: boolean) => void;
  nearbyAttractions: any[];
  onBookRoom: (roomType?: string) => void;
}

const HotelMainContent: React.FC<HotelMainContentProps> = ({
  hotel,
  activeTab,
  setActiveTab,
  isFavorite,
  onToggleFavorite,
  showFullGallery,
  setShowFullGallery,
  nearbyAttractions,
  onBookRoom
}) => {
  // Split the image gallery into main image and secondary images
  const mainImage = hotel.gallery?.[0] || hotel.image;
  const secondaryImages = hotel.gallery?.slice(1, 5) || [];
  
  return (
    <div className="container mx-auto px-4 py-6">
      {/* Hotel Header */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
          <h1 className="text-3xl md:text-4xl font-bold">{hotel.name}</h1>
          <div className="flex items-center space-x-2 mt-2 md:mt-0">
            <Button variant="outline" size="sm" onClick={onToggleFavorite}>
              <Bookmark className={`h-4 w-4 mr-2 ${isFavorite ? "fill-primary text-primary" : ""}`} />
              {isFavorite ? "Saved" : "Save"}
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
        
        <div className="flex flex-wrap items-center text-gray-600 mb-3 gap-x-3 gap-y-1">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{hotel.location}</span>
          </div>
          
          <div className="flex items-center">
            <div className="flex mr-1">
              {Array.from({ length: Math.floor(hotel.rating) }).map((_, i) => (
                <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              ))}
              {hotel.rating % 1 !== 0 && (
                <StarHalf className="h-4 w-4 text-yellow-400 fill-yellow-400" />
              )}
            </div>
            <span>{hotel.rating} ({hotel.reviewCount} reviews)</span>
          </div>
          
          {hotel.featured && (
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              Featured
            </Badge>
          )}
        </div>
      </div>
      
      {/* Gallery Grid */}
      <div className="grid grid-cols-4 gap-2 mb-8 rounded-lg overflow-hidden h-[400px]">
        <div className="col-span-4 md:col-span-2 h-full relative">
          <img 
            src={mainImage} 
            alt={hotel.name + " main"} 
            className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity" 
            onClick={() => setShowFullGallery(true)}
          />
          <Badge variant="outline" className="absolute bottom-3 left-3 bg-white">
            ₹{hotel.price}/night
          </Badge>
        </div>
        
        <div className="hidden md:grid md:col-span-2 grid-cols-2 grid-rows-2 gap-2 h-full">
          {secondaryImages.map((image: string, index: number) => (
            <div key={index} className="relative overflow-hidden">
              <img 
                src={image} 
                alt={`${hotel.name} ${index + 1}`} 
                className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity" 
                onClick={() => setShowFullGallery(true)}
              />
              {index === 3 && hotel.gallery && hotel.gallery.length > 5 && (
                <div 
                  className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer"
                  onClick={() => setShowFullGallery(true)}
                >
                  <span className="text-white font-semibold">+{hotel.gallery.length - 5} more</span>
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="absolute top-2 right-2 hidden md:flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-white" 
            onClick={() => setShowFullGallery(true)}
          >
            <Camera className="h-4 w-4 mr-2" />
            View Photos
          </Button>
          <Button variant="outline" size="sm" className="bg-white">
            <Video className="h-4 w-4 mr-2" />
            Virtual Tour
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main content with tabs */}
        <div className="w-full lg:w-2/3">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="rooms">Rooms</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="location">Location</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="policies">Policies</TabsTrigger>
              <TabsTrigger value="transport">Transport</TabsTrigger>
            </TabsList>

            <TabsContent value="rooms" className="pt-6">
              <HotelRooms hotel={hotel} onBookRoom={onBookRoom} />
            </TabsContent>

            <TabsContent value="amenities" className="pt-6">
              <HotelAmenities hotel={hotel} />
            </TabsContent>

            <TabsContent value="location" className="pt-6">
              <HotelLocation 
                hotel={hotel}
                nearbyAttractions={nearbyAttractions}
              />
            </TabsContent>

            <TabsContent value="reviews" className="pt-6">
              <HotelReviews hotel={hotel} />
            </TabsContent>

            <TabsContent value="policies" className="pt-6">
              <HotelPolicies hotel={hotel} />
            </TabsContent>

            <TabsContent value="transport" className="pt-6">
              <HotelTransport hotel={hotel} />
            </TabsContent>
          </Tabs>
        </div>
        
        {/* Sidebar */}
        <div className="w-full lg:w-1/3">
          <div className="sticky top-24 space-y-6">
            {/* Quick booking card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-4">Book This Hotel</h3>
                <div className="mb-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Price per night:</span>
                    <span className="font-bold">₹{hotel.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Availability:</span>
                    <span className="text-green-600">Available</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full mb-4" 
                  size="lg"
                  onClick={() => onBookRoom()}
                >
                  Book Now
                </Button>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                    <span>Free cancellation 24 hours before check-in</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                    <span>No hidden fees</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 mr-2" />
                    <span>Best price guarantee</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Contact info card */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-3">Contact Information</h3>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 text-primary mr-3" />
                    <span>+91 98765 43210</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 text-primary mr-3" />
                    <span>info@{hotel.name.toLowerCase().replace(/\s+/g, '')}.com</span>
                  </div>
                  <div className="flex items-center">
                    <Building className="h-4 w-4 text-primary mr-3" />
                    <span>{hotel.location}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {showFullGallery && (
        <HotelGallery 
          hotel={hotel} 
          isOpen={showFullGallery} 
          onClose={() => setShowFullGallery(false)} 
        />
      )}
    </div>
  );
};

export default HotelMainContent;

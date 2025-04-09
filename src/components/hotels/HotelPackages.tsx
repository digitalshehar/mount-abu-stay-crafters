
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Hotel } from '@/types';
import { Heart, Check, Star } from 'lucide-react';
import { formatPrice } from '@/utils/hotel';

interface HotelPackagesProps {
  hotels: Hotel[];
  isLoading: boolean;
}

// Package types based on available hotels
interface Package {
  id: string;
  name: string;
  description: string;
  duration: string;
  price: number;
  discount: number;
  hotels: Hotel[];
  inclusions: string[];
  featured?: boolean;
  image: string;
}

const HotelPackages: React.FC<HotelPackagesProps> = ({ hotels, isLoading }) => {
  // Generate packages based on the hotels
  const generatePackages = (hotels: Hotel[]): Package[] => {
    if (hotels.length === 0) return [];
    
    // Filter featured hotels
    const featuredHotels = hotels.filter(hotel => hotel.featured);
    const randomHotels = [...hotels].sort(() => 0.5 - Math.random()).slice(0, 5);
    
    const packages: Package[] = [
      {
        id: 'weekend-getaway',
        name: 'Weekend Getaway',
        description: 'Perfect 2-night break in Mount Abu',
        duration: '2 Nights / 3 Days',
        price: 6999,
        discount: 15,
        hotels: featuredHotels.length > 0 ? featuredHotels.slice(0, 3) : randomHotels.slice(0, 3),
        inclusions: ['Accommodation', 'Breakfast', 'One dinner', 'Guided tour'],
        featured: true,
        image: featuredHotels[0]?.image || randomHotels[0]?.image || ''
      },
      {
        id: 'adventure-package',
        name: 'Adventure Explorer',
        description: 'Exciting adventure activities with comfortable stay',
        duration: '3 Nights / 4 Days',
        price: 9999,
        discount: 10,
        hotels: randomHotels.slice(0, 2),
        inclusions: ['Accommodation', 'All meals', 'Trekking', 'Boating', 'Transport'],
        image: randomHotels[1]?.image || ''
      },
      {
        id: 'honeymoon-special',
        name: 'Honeymoon Special',
        description: 'Romantic package for couples',
        duration: '4 Nights / 5 Days',
        price: 15999,
        discount: 12,
        hotels: featuredHotels.length > 0 ? [featuredHotels[0]] : [randomHotels[0]],
        inclusions: ['Luxury accommodation', 'All meals', 'Couples spa', 'Candlelight dinner', 'Sightseeing'],
        featured: true,
        image: featuredHotels[1]?.image || randomHotels[2]?.image || ''
      },
      {
        id: 'family-vacation',
        name: 'Family Vacation',
        description: 'Fun-filled family holiday',
        duration: '5 Nights / 6 Days',
        price: 19999,
        discount: 8,
        hotels: randomHotels.slice(1, 3),
        inclusions: ['Family rooms', 'All meals', 'Kid\'s activities', 'Sightseeing', 'Transport'],
        image: randomHotels[3]?.image || ''
      }
    ];
    
    return packages;
  };
  
  const packages = generatePackages(hotels);
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <Card key={i} className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-t-lg" />
            <CardHeader className="pb-2">
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 rounded w-full" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded w-full" />
                <div className="h-4 bg-gray-200 rounded w-5/6" />
                <div className="h-4 bg-gray-200 rounded w-4/6" />
              </div>
            </CardContent>
            <CardFooter>
              <div className="h-9 bg-gray-200 rounded w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    );
  }
  
  if (packages.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900">No packages available</h3>
        <p className="mt-2 text-sm text-gray-500">
          We couldn't find any packages matching your criteria.
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map(pkg => (
          <Card key={pkg.id} className="overflow-hidden flex flex-col">
            <div className="relative">
              <img 
                src={pkg.image} 
                alt={pkg.name} 
                className="h-48 w-full object-cover"
              />
              {pkg.featured && (
                <Badge className="absolute top-2 right-2 bg-amber-500">
                  <Star className="h-3 w-3 mr-1 fill-white" />
                  Featured
                </Badge>
              )}
              <Badge className="absolute top-2 left-2 bg-red-500">
                {pkg.discount}% OFF
              </Badge>
            </div>
            
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{pkg.name}</CardTitle>
                  <CardDescription>{pkg.duration}</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="flex-grow">
              <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">Inclusions:</p>
                <ul className="space-y-1">
                  {pkg.inclusions.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-gray-600">
                      <Check className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mt-3">
                <p className="text-sm font-medium">Hotels:</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {pkg.hotels.map(hotel => (
                    <Badge key={hotel.id} variant="outline" className="text-xs">
                      {hotel.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            
            <CardFooter className="border-t pt-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">From</p>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold">{formatPrice(pkg.price)}</span>
                  {pkg.discount > 0 && (
                    <span className="text-xs text-gray-500 line-through">
                      {formatPrice(Math.round(pkg.price / (1 - pkg.discount / 100)))}
                    </span>
                  )}
                </div>
              </div>
              <Button size="sm">View Details</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <div className="text-center">
        <Button variant="outline">Load More Packages</Button>
      </div>
    </div>
  );
};

export default HotelPackages;

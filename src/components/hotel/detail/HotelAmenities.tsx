
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wifi, Coffee, Utensils, Dumbbell, Car, Snowflake, Tv, Bath } from 'lucide-react';

interface HotelAmenitiesProps {
  amenities: string[];
}

const HotelAmenities: React.FC<HotelAmenitiesProps> = ({ amenities = [] }) => {
  // Map amenity names to icons
  const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase();
    
    if (amenityLower.includes('wifi') || amenityLower.includes('internet'))
      return <Wifi className="h-5 w-5" />;
    if (amenityLower.includes('breakfast') || amenityLower.includes('coffee'))
      return <Coffee className="h-5 w-5" />;
    if (amenityLower.includes('restaurant') || amenityLower.includes('food'))
      return <Utensils className="h-5 w-5" />;
    if (amenityLower.includes('gym') || amenityLower.includes('fitness'))
      return <Dumbbell className="h-5 w-5" />;
    if (amenityLower.includes('parking') || amenityLower.includes('valet'))
      return <Car className="h-5 w-5" />;
    if (amenityLower.includes('ac') || amenityLower.includes('air'))
      return <Snowflake className="h-5 w-5" />;
    if (amenityLower.includes('tv') || amenityLower.includes('television'))
      return <Tv className="h-5 w-5" />;
    if (amenityLower.includes('bathroom') || amenityLower.includes('shower'))
      return <Bath className="h-5 w-5" />;
      
    // Default icon
    return (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    );
  };

  // Group amenities by category
  const amenityCategories = {
    'Main Amenities': amenities.filter(a => 
      a.toLowerCase().includes('wifi') || 
      a.toLowerCase().includes('parking') || 
      a.toLowerCase().includes('ac') || 
      a.toLowerCase().includes('tv')
    ),
    'Food & Drink': amenities.filter(a => 
      a.toLowerCase().includes('breakfast') || 
      a.toLowerCase().includes('restaurant') || 
      a.toLowerCase().includes('coffee') || 
      a.toLowerCase().includes('bar')
    ),
    'Wellness': amenities.filter(a => 
      a.toLowerCase().includes('spa') || 
      a.toLowerCase().includes('gym') || 
      a.toLowerCase().includes('pool') || 
      a.toLowerCase().includes('fitness')
    ),
    'Other': amenities.filter(a => 
      !a.toLowerCase().includes('wifi') && 
      !a.toLowerCase().includes('parking') && 
      !a.toLowerCase().includes('ac') && 
      !a.toLowerCase().includes('tv') &&
      !a.toLowerCase().includes('breakfast') && 
      !a.toLowerCase().includes('restaurant') && 
      !a.toLowerCase().includes('coffee') && 
      !a.toLowerCase().includes('bar') &&
      !a.toLowerCase().includes('spa') && 
      !a.toLowerCase().includes('gym') && 
      !a.toLowerCase().includes('pool') && 
      !a.toLowerCase().includes('fitness')
    )
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hotel Amenities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
          {Object.entries(amenityCategories).map(([category, categoryAmenities]) => 
            categoryAmenities.length > 0 && (
              <div key={category} className="space-y-3">
                <h3 className="font-medium text-gray-800">{category}</h3>
                <ul className="space-y-2">
                  {categoryAmenities.map((amenity, index) => (
                    <li key={index} className="flex items-center text-gray-600">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-3">
                        {getAmenityIcon(amenity)}
                      </div>
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default HotelAmenities;


import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Users } from 'lucide-react';
import RoomDetailsExpanded from './RoomDetailsExpanded';

interface RoomCardProps {
  id: number;
  name: string;
  type: string;
  description: string;
  capacity: number;
  price: number;
  image: string;
  amenities: string[];
  availability: number;
  onSelect?: () => void;
}

const RoomCard: React.FC<RoomCardProps> = ({
  id,
  name,
  type,
  description,
  capacity,
  price,
  image,
  amenities,
  availability,
  onSelect
}) => {
  const [expanded, setExpanded] = useState(false);
  
  const toggleExpanded = () => {
    setExpanded(!expanded);
  };
  
  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-3">
        <div className="md:col-span-1">
          <div className="h-full">
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=1374';
              }}
            />
          </div>
        </div>
        
        <div className="md:col-span-2">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{name}</h3>
                <p className="text-sm text-gray-600">{type}</p>
              </div>
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-1 text-gray-500" />
                <span className="text-sm">Up to {capacity} {capacity === 1 ? 'person' : 'people'}</span>
              </div>
            </div>
            
            <div className="mt-2">
              <p className="text-sm line-clamp-2">{description}</p>
            </div>
            
            <div className="mt-2 flex flex-wrap gap-1">
              {amenities.slice(0, 3).map((amenity, index) => (
                <Badge key={index} variant="outline" className="bg-gray-100">
                  {amenity}
                </Badge>
              ))}
              {amenities.length > 3 && (
                <Badge variant="outline" className="bg-gray-100">
                  +{amenities.length - 3} more
                </Badge>
              )}
            </div>
            
            <div className="mt-4 flex justify-between items-center">
              <div>
                <span className="text-lg font-bold">₹{price}</span>
                <span className="text-sm text-gray-600 ml-1">per night</span>
              </div>
              
              <div className="flex items-center gap-2">
                {availability > 0 ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    {availability} {availability === 1 ? 'room' : 'rooms'} left
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                    Sold out
                  </Badge>
                )}
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="p-0 h-auto"
                  onClick={toggleExpanded}
                >
                  {expanded ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
            
            {expanded && (
              <div className="mt-4 pt-4 border-t">
                <RoomDetailsExpanded 
                  roomType={type} 
                  capacity={capacity} 
                  description={description}
                  amenities={amenities}
                  price={price}
                  onSelect={onSelect}
                />
              </div>
            )}
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default RoomCard;


import React from 'react';
import { MapPin, Calendar, Car } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CarSearchProps {
  search: {
    location: string;
    dates: string;
    type: string;
  };
  setSearch: React.Dispatch<React.SetStateAction<{
    location: string;
    dates: string;
    type: string;
  }>>;
}

const CarSearchForm: React.FC<CarSearchProps> = ({ search, setSearch }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="car-location" className="text-sm font-medium">Pickup Location</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            id="car-location"
            placeholder="Pickup location" 
            className="pl-10"
            value={search.location}
            onChange={(e) => setSearch(prev => ({ ...prev, location: e.target.value }))}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="car-dates" className="text-sm font-medium">Rental Period</Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            id="car-dates"
            placeholder="Pickup — Dropoff date" 
            className="pl-10"
            value={search.dates}
            onChange={(e) => setSearch(prev => ({ ...prev, dates: e.target.value }))}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="car-type" className="text-sm font-medium">Car Type</Label>
        <div className="relative">
          <Car className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            id="car-type"
            placeholder="Car type" 
            className="pl-10"
            value={search.type}
            onChange={(e) => setSearch(prev => ({ ...prev, type: e.target.value }))}
          />
        </div>
      </div>
    </div>
  );
};

export default CarSearchForm;

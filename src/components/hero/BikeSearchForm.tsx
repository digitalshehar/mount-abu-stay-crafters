
import React from 'react';
import { MapPin, Calendar, Bike } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BikeSearchProps {
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

const BikeSearchForm: React.FC<BikeSearchProps> = ({ search, setSearch }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="bike-location" className="text-sm font-medium">Pickup Location</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            id="bike-location"
            placeholder="Pickup location" 
            className="pl-10"
            value={search.location}
            onChange={(e) => setSearch(prev => ({ ...prev, location: e.target.value }))}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="bike-dates" className="text-sm font-medium">Rental Period</Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            id="bike-dates"
            placeholder="Pickup — Dropoff date" 
            className="pl-10"
            value={search.dates}
            onChange={(e) => setSearch(prev => ({ ...prev, dates: e.target.value }))}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="bike-type" className="text-sm font-medium">Bike Type</Label>
        <div className="relative">
          <Bike className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            id="bike-type"
            placeholder="Bike type" 
            className="pl-10"
            value={search.type}
            onChange={(e) => setSearch(prev => ({ ...prev, type: e.target.value }))}
          />
        </div>
      </div>
    </div>
  );
};

export default BikeSearchForm;

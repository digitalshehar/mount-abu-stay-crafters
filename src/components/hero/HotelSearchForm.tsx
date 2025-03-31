
import React from 'react';
import { MapPin, Calendar, Users } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface HotelSearchProps {
  search: {
    location: string;
    dates: string;
    guests: string;
  };
  setSearch: React.Dispatch<React.SetStateAction<{
    location: string;
    dates: string;
    guests: string;
  }>>;
}

const HotelSearchForm: React.FC<HotelSearchProps> = ({ search, setSearch }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="hotel-location" className="text-sm font-medium">Location</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            id="hotel-location"
            placeholder="Where are you going?" 
            className="pl-10"
            value={search.location}
            onChange={(e) => setSearch(prev => ({ ...prev, location: e.target.value }))}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="hotel-dates" className="text-sm font-medium">Dates</Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            id="hotel-dates"
            placeholder="Check-in — Check-out" 
            className="pl-10"
            value={search.dates}
            onChange={(e) => setSearch(prev => ({ ...prev, dates: e.target.value }))}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="hotel-guests" className="text-sm font-medium">Guests</Label>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            id="hotel-guests"
            placeholder="Guests & Rooms" 
            className="pl-10"
            value={search.guests}
            onChange={(e) => setSearch(prev => ({ ...prev, guests: e.target.value }))}
          />
        </div>
      </div>
    </div>
  );
};

export default HotelSearchForm;

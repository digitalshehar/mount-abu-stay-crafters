
import React from 'react';
import { MapPin, Calendar, Compass } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ActivitySearchProps {
  search: {
    location: string;
    date: string;
    type: string;
  };
  setSearch: React.Dispatch<React.SetStateAction<{
    location: string;
    date: string;
    type: string;
  }>>;
}

const ActivitySearchForm: React.FC<ActivitySearchProps> = ({ search, setSearch }) => {
  const handleInputChange = (field: string, value: string) => {
    setSearch(prev => ({ ...prev, [field]: value }));
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
      <div className="space-y-2">
        <Label htmlFor="activity-location" className="text-sm font-medium">Location</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            id="activity-location"
            placeholder="Activity location" 
            className="pl-10"
            value={search.location}
            onChange={(e) => handleInputChange("location", e.target.value)}
            type="text"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="activity-date" className="text-sm font-medium">Date</Label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            id="activity-date"
            placeholder="Select date" 
            className="pl-10"
            value={search.date}
            onChange={(e) => handleInputChange("date", e.target.value)}
            type="text"
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="activity-type" className="text-sm font-medium">Activity Type</Label>
        <div className="relative">
          <Compass className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input 
            id="activity-type"
            placeholder="Activity type" 
            className="pl-10"
            value={search.type}
            onChange={(e) => handleInputChange("type", e.target.value)}
            type="text"
          />
        </div>
      </div>
    </div>
  );
};

export default ActivitySearchForm;

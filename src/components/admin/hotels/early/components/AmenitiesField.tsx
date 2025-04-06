
import React, { useState } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Plus } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface AmenitiesFieldProps {
  amenities: string[];
  onChange: (amenities: string[]) => void;
}

const AmenitiesField: React.FC<AmenitiesFieldProps> = ({ amenities, onChange }) => {
  const [newAmenity, setNewAmenity] = useState('');

  const commonAmenities = [
    'WiFi', 
    'Air Conditioning', 
    'TV', 
    'Attached Bathroom', 
    'Hot Water', 
    'Power Backup', 
    'Room Service',
    'Clean Towels',
    'Toiletries',
    'Work Desk',
    'Tea/Coffee Maker'
  ];

  const handleAddAmenity = () => {
    if (newAmenity.trim() && !amenities.includes(newAmenity.trim())) {
      const updatedAmenities = [...amenities, newAmenity.trim()];
      onChange(updatedAmenities);
      setNewAmenity('');
    }
  };

  const handleRemoveAmenity = (amenity: string) => {
    const updatedAmenities = amenities.filter(a => a !== amenity);
    onChange(updatedAmenities);
  };

  const handleAddCommonAmenity = (amenity: string) => {
    if (!amenities.includes(amenity)) {
      const updatedAmenities = [...amenities, amenity];
      onChange(updatedAmenities);
    }
  };

  return (
    <div className="space-y-3">
      <Label>Amenities</Label>
      
      <div className="flex flex-wrap gap-2 mb-3">
        {amenities.map((amenity, index) => (
          <Badge key={index} variant="secondary" className="flex items-center gap-1">
            {amenity}
            <button 
              type="button" 
              onClick={() => handleRemoveAmenity(amenity)}
              className="ml-1 text-gray-500 hover:text-gray-700"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
      </div>
      
      <div className="flex gap-2">
        <Input
          placeholder="Add amenity"
          value={newAmenity}
          onChange={(e) => setNewAmenity(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAddAmenity();
            }
          }}
        />
        <Button 
          type="button" 
          variant="outline" 
          onClick={handleAddAmenity}
          disabled={!newAmenity.trim()}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
      
      <div className="mt-3">
        <Label className="text-sm text-gray-500">Quick Add:</Label>
        <div className="flex flex-wrap gap-2 mt-2">
          {commonAmenities.map((amenity) => (
            <Button
              key={amenity}
              type="button"
              variant="outline"
              size="sm"
              className={`text-xs ${amenities.includes(amenity) ? 'bg-primary/10 text-primary' : ''}`}
              onClick={() => handleAddCommonAmenity(amenity)}
              disabled={amenities.includes(amenity)}
            >
              {amenity}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AmenitiesField;

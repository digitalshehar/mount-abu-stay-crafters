
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Plus, X } from 'lucide-react';

interface AmenitiesFieldProps {
  amenities: string[];
  onChange: (amenities: string[]) => void;
}

const AmenitiesField: React.FC<AmenitiesFieldProps> = ({ amenities, onChange }) => {
  const [newAmenity, setNewAmenity] = useState('');

  const handleAddAmenity = () => {
    if (!newAmenity.trim()) return;
    if (amenities.includes(newAmenity.trim())) return;
    
    onChange([...amenities, newAmenity.trim()]);
    setNewAmenity('');
  };

  const handleRemoveAmenity = (amenity: string) => {
    onChange(amenities.filter(a => a !== amenity));
  };

  return (
    <div className="space-y-2">
      <Label>Amenities</Label>
      <div className="flex gap-2">
        <Input
          value={newAmenity}
          onChange={(e) => setNewAmenity(e.target.value)}
          placeholder="Add amenity"
        />
        <Button type="button" onClick={handleAddAmenity} size="sm">
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2 mt-2">
        {amenities.map((amenity) => (
          <Badge key={amenity} variant="secondary" className="flex items-center gap-1">
            {amenity}
            <button onClick={() => handleRemoveAmenity(amenity)} className="ml-1">
              <X className="h-3 w-3" />
            </button>
          </Badge>
        ))}
        {amenities.length === 0 && (
          <span className="text-sm text-muted-foreground">No amenities added</span>
        )}
      </div>
    </div>
  );
};

export default AmenitiesField;

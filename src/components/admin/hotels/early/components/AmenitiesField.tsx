
import React, { useState, useEffect } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { X, Plus, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";

interface AmenitiesFieldProps {
  amenities: string[];
  onChange: (amenities: string[]) => void;
}

interface AmenityCategory {
  id: number;
  name: string;
  icon: string;
}

const AmenitiesField: React.FC<AmenitiesFieldProps> = ({ amenities, onChange }) => {
  const [newAmenity, setNewAmenity] = useState('');
  const [categories, setCategories] = useState<AmenityCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [popularAmenities, setPopularAmenities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch amenity categories from database
  useEffect(() => {
    const fetchAmenityData = async () => {
      setIsLoading(true);
      try {
        // Fetch categories
        const { data: categoryData, error: categoryError } = await supabase
          .from('early_hotel_amenity_categories')
          .select('*')
          .order('display_order', { ascending: true });

        if (categoryError) throw categoryError;
        setCategories(categoryData || []);

        // Fetch popular amenities
        const { data: amenityData, error: amenityError } = await supabase
          .from('early_hotel_amenities')
          .select('name')
          .order('name');

        if (amenityError) throw amenityError;
        setPopularAmenities(amenityData?.map(a => a.name) || []);
      } catch (error) {
        console.error("Error fetching amenity data:", error);
        // Fallback to default amenities if there's an error
        setPopularAmenities([
          'WiFi', 'Air Conditioning', 'TV', 'Attached Bathroom', 
          'Hot Water', 'Power Backup', 'Room Service', 'Clean Towels',
          'Toiletries', 'Work Desk', 'Tea/Coffee Maker'
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAmenityData();
  }, []);

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

  // Define the amenities to show based on the active category
  const getFilteredAmenities = () => {
    if (isLoading || popularAmenities.length === 0) {
      return [];
    }
    
    if (activeCategory === "all") {
      return popularAmenities.slice(0, 12); // Show first 12 for "all" category
    }
    
    // In a real implementation, we'd filter by category from the database
    // For now we'll just return a subset based on the category name
    return popularAmenities.filter((_, index) => 
      index % categories.length === categories.findIndex(c => c.name === activeCategory)
    );
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
      
      <div className="mt-4">
        <Label className="text-sm text-gray-500 mb-2 block">Quick Add Amenities:</Label>
        
        <Tabs defaultValue="all" value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="mb-2 w-full flex overflow-x-auto">
            <TabsTrigger value="all" className="flex-shrink-0">All</TabsTrigger>
            {categories.map((category) => (
              <TabsTrigger key={category.id} value={category.name} className="flex-shrink-0">
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={activeCategory} className="mt-0">
            <div className="flex flex-wrap gap-2 mt-2">
              {isLoading ? (
                <div className="text-sm text-muted-foreground">Loading amenities...</div>
              ) : getFilteredAmenities().length > 0 ? (
                getFilteredAmenities().map((amenity) => (
                  <Button
                    key={amenity}
                    type="button"
                    variant="outline"
                    size="sm"
                    className={`text-xs ${amenities.includes(amenity) ? 'bg-primary/10 text-primary' : ''}`}
                    onClick={() => handleAddCommonAmenity(amenity)}
                    disabled={amenities.includes(amenity)}
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {amenity}
                  </Button>
                ))
              ) : (
                <div className="text-sm text-muted-foreground">No amenities in this category</div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AmenitiesField;

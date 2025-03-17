
import React from 'react';
import { ArrowLeft, List, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

interface MapHeaderProps {
  selectedHotel?: any | null;
  hotelsCount?: number;
  onOpenFilter?: () => void;
  viewMode?: 'map' | 'list';
  setViewMode?: (mode: 'map' | 'list') => void;
  activeFilterCount?: number;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  selectedStars?: number[];
  setSelectedStars?: (stars: number[]) => void;
  selectedAmenities?: string[];
  setSelectedAmenities?: (amenities: string[]) => void;
  priceRange?: [number, number];
  setPriceRange?: (range: [number, number]) => void;
  clearFilters?: () => void;
}

const MapHeader: React.FC<MapHeaderProps> = ({ 
  selectedHotel = null, 
  hotelsCount = 0, 
  onOpenFilter = () => {},
  viewMode,
  setViewMode,
  activeFilterCount,
  searchQuery,
  setSearchQuery,
  selectedStars,
  setSelectedStars,
  selectedAmenities,
  setSelectedAmenities,
  priceRange,
  setPriceRange,
  clearFilters
}) => {
  return (
    <div className="bg-white p-4 shadow-sm flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Link to="/hotels">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
        </Link>
        
        {selectedHotel ? (
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-primary mr-2" />
            <h1 className="text-lg font-medium">{selectedHotel.name}</h1>
          </div>
        ) : (
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-primary mr-2" />
            <h1 className="text-lg font-medium">Map View</h1>
            <span className="ml-2 text-sm text-muted-foreground">
              {hotelsCount} {hotelsCount === 1 ? 'hotel' : 'hotels'} found
            </span>
          </div>
        )}
      </div>
      
      {viewMode && setViewMode ? (
        <div className="flex gap-2">
          <Button 
            variant={viewMode === 'map' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setViewMode('map')}
          >
            Map View
          </Button>
          <Button 
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="sm" 
            onClick={() => setViewMode('list')}
          >
            List View
          </Button>
        </div>
      ) : (
        <Button variant="outline" size="sm" onClick={onOpenFilter}>
          <List className="h-4 w-4 mr-2" />
          Filters
        </Button>
      )}
    </div>
  );
};

export default MapHeader;

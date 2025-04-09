
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Map, Grid3X3, List, Package, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Hotel } from '@/types';
import HotelGridView from './HotelGridView';
import HotelListView from './HotelListView';
import HotelMapView from './HotelMapView';
import HotelPackages from './HotelPackages';
import HotelSortOptions from './HotelSortOptions';

interface HotelTabsProps {
  hotels: Hotel[];
  isLoading: boolean;
  hasError?: boolean;
  onFilterClick?: () => void;
  searchQuery?: string;
  onSearchChange?: (value: string) => void;
}

interface HotelViewProps {
  hotels: Hotel[];
  isLoading: boolean;
  hasError?: boolean;
}

interface HotelListViewProps extends HotelViewProps {
  sortBy: string;
  onSortChange: (value: string) => void;
}

const HotelsTabs: React.FC<HotelTabsProps> = ({
  hotels,
  isLoading,
  hasError = false,
  onFilterClick,
  searchQuery = '',
  onSearchChange
}) => {
  const [activeTab, setActiveTab] = useState('grid');
  const [sortBy, setSortBy] = useState('recommended');
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearchChange) {
      onSearchChange(e.target.value);
    }
  };
  
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <TabsList>
          <TabsTrigger value="grid" className="flex items-center gap-2 px-4">
            <Grid3X3 className="h-4 w-4" />
            <span className="hidden sm:inline">Grid</span>
          </TabsTrigger>
          <TabsTrigger value="list" className="flex items-center gap-2 px-4">
            <List className="h-4 w-4" />
            <span className="hidden sm:inline">List</span>
          </TabsTrigger>
          <TabsTrigger value="map" className="flex items-center gap-2 px-4">
            <Map className="h-4 w-4" />
            <span className="hidden sm:inline">Map</span>
          </TabsTrigger>
          <TabsTrigger value="packages" className="flex items-center gap-2 px-4">
            <Package className="h-4 w-4" />
            <span className="hidden sm:inline">Packages</span>
          </TabsTrigger>
        </TabsList>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search hotels..."
              className="w-full pl-9 pr-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          {onFilterClick && (
            <Button size="sm" variant="outline" onClick={onFilterClick} className="flex-shrink-0">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          )}
          
          {activeTab !== 'map' && (
            <div className="hidden md:block">
              <HotelSortOptions sortBy={sortBy} onSortChange={setSortBy} />
            </div>
          )}
        </div>
      </div>
      
      {/* Mobile sort options */}
      {activeTab !== 'map' && (
        <div className="md:hidden mb-4">
          <HotelSortOptions sortBy={sortBy} onSortChange={setSortBy} />
        </div>
      )}
      
      <TabsContent value="grid">
        <HotelGridView 
          hotels={hotels} 
          isLoading={isLoading} 
          hasError={hasError}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </TabsContent>
      
      <TabsContent value="list">
        <HotelListView 
          hotels={hotels} 
          isLoading={isLoading} 
          hasError={hasError}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />
      </TabsContent>
      
      <TabsContent value="map">
        <HotelMapView 
          hotels={hotels} 
          isLoading={isLoading} 
        />
      </TabsContent>
      
      <TabsContent value="packages">
        <HotelPackages 
          hotels={hotels} 
          isLoading={isLoading}
        />
      </TabsContent>
    </Tabs>
  );
};

export default HotelsTabs;


import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus } from 'lucide-react';

interface EarlyHotelSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  onSearch: (e: React.FormEvent) => void;
  onAddClick: () => void;
}

const EarlyHotelSearch: React.FC<EarlyHotelSearchProps> = ({
  searchTerm,
  setSearchTerm,
  onSearch,
  onAddClick
}) => {
  return (
    <div className="bg-white border rounded-lg p-4">
      <form onSubmit={onSearch} className="flex flex-col sm:flex-row gap-2">
        <Input
          placeholder="Search by hotel name or location..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <div className="flex gap-2">
          <Button type="submit" className="w-full sm:w-auto">
            <Search className="h-4 w-4 mr-2" /> Search
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={onAddClick}
            className="w-full sm:w-auto"
          >
            <Plus className="h-4 w-4 mr-2" /> Add Hotel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EarlyHotelSearch;

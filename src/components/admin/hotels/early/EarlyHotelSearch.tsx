
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
      <form onSubmit={onSearch} className="flex gap-2 mb-4">
        <Input
          placeholder="Search early hotels..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button type="submit">
          <Search className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};

export default EarlyHotelSearch;

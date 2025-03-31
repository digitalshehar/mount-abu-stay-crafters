
import React from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SearchButtonProps {
  activeTab: string;
  handleSearch?: () => void;
}

const SearchButton = ({ activeTab, handleSearch }: SearchButtonProps) => {
  const getSearchLabel = () => {
    switch (activeTab) {
      case 'hotels':
        return 'Search Hotels';
      case 'cars':
        return 'Search Cars';
      case 'bikes':
        return 'Search Bikes';
      case 'activities':
        return 'Search Activities';
      default:
        return 'Search';
    }
  };

  return (
    <div className="flex justify-end mt-4">
      <Button 
        type="submit" 
        onClick={handleSearch}
        className="px-6 py-6 text-base" 
        size="lg"
      >
        <Search className="h-5 w-5 mr-2" />
        {getSearchLabel()}
      </Button>
    </div>
  );
};

export default SearchButton;

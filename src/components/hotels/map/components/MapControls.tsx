
import React from 'react';
import { Button } from '@/components/ui/button';
import { Map as MapIcon, List } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface MapControlsProps {
  viewMode: 'map' | 'list';
  setViewMode: (mode: 'map' | 'list') => void;
}

const MapControls: React.FC<MapControlsProps> = ({ viewMode, setViewMode }) => {
  const navigate = useNavigate();

  const handleViewModeChange = (mode: 'map' | 'list') => {
    setViewMode(mode);
    
    // If switching to list view, navigate back to hotels page
    if (mode === 'list') {
      navigate('/hotels');
    }
  };

  return (
    <div className="flex items-center space-x-2 bg-white rounded-md shadow-sm border border-stone-200">
      <Button 
        variant={viewMode === 'map' ? 'default' : 'ghost'}
        size="sm"
        onClick={() => handleViewModeChange('map')}
        className={`flex items-center rounded-r-none ${viewMode === 'map' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
      >
        <MapIcon className="h-4 w-4 mr-1" />
        Map
      </Button>
      
      <div className="w-px h-8 bg-stone-200"></div>
      
      <Button 
        variant={viewMode === 'list' ? 'default' : 'ghost'} 
        size="sm"
        onClick={() => handleViewModeChange('list')}
        className={`flex items-center rounded-l-none ${viewMode === 'list' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
      >
        <List className="h-4 w-4 mr-1" />
        List
      </Button>
    </div>
  );
};

export default MapControls;

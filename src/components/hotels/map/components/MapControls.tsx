
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
    <div className="flex items-center space-x-2">
      <Button 
        variant={viewMode === 'map' ? 'default' : 'outline'}
        size="sm"
        onClick={() => handleViewModeChange('map')}
        className="flex items-center"
      >
        <MapIcon className="h-4 w-4 mr-1" />
        Map
      </Button>
      
      <Button 
        variant={viewMode === 'list' ? 'default' : 'outline'} 
        size="sm"
        onClick={() => handleViewModeChange('list')}
        className="flex items-center"
      >
        <List className="h-4 w-4 mr-1" />
        List
      </Button>
    </div>
  );
};

export default MapControls;

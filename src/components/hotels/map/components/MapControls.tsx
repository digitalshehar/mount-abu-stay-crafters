
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Map as MapIcon, List, Smartphone, Laptop, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface MapControlsProps {
  viewMode: 'map' | 'list';
  setViewMode: (mode: 'map' | 'list') => void;
}

const MapControls: React.FC<MapControlsProps> = ({ viewMode, setViewMode }) => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [displayMode, setDisplayMode] = useState<'auto' | 'light' | 'dark'>('auto');
  const [mobileOptimized, setMobileOptimized] = useState(true);

  const handleViewModeChange = (e: React.MouseEvent, mode: 'map' | 'list') => {
    e.preventDefault(); // Prevent default behavior
    setViewMode(mode);
    
    // If switching to list view, navigate back to hotels page
    if (mode === 'list') {
      navigate('/hotels');
    }
  };

  const toggleDisplayMode = () => {
    if (displayMode === 'auto') setDisplayMode('light');
    else if (displayMode === 'light') setDisplayMode('dark');
    else setDisplayMode('auto');
    
    // This would be implemented with actual theme switching logic
  };

  const toggleMobileOptimization = () => {
    setMobileOptimized(!mobileOptimized);
    // This would adjust map features for better mobile performance
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="bg-white rounded-md shadow-sm border border-stone-200">
        <Button 
          variant={viewMode === 'map' ? 'default' : 'ghost'}
          size="sm"
          onClick={(e) => handleViewModeChange(e, 'map')}
          className={`flex items-center rounded-r-none ${viewMode === 'map' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
        >
          <MapIcon className="h-4 w-4 mr-1" />
          Map
        </Button>
        
        <div className="w-px h-8 bg-stone-200 inline-block"></div>
        
        <Button 
          variant={viewMode === 'list' ? 'default' : 'ghost'} 
          size="sm"
          onClick={(e) => handleViewModeChange(e, 'list')}
          className={`flex items-center rounded-l-none ${viewMode === 'list' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
        >
          <List className="h-4 w-4 mr-1" />
          List
        </Button>
      </div>

      {viewMode === 'map' && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 px-2.5">
              <Smartphone className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="min-w-[200px]">
            <DropdownMenuLabel>Map Settings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            <DropdownMenuItem onClick={toggleDisplayMode} className="flex justify-between cursor-pointer">
              <span className="flex items-center">
                {displayMode === 'light' ? (
                  <Sun className="h-4 w-4 mr-2" />
                ) : displayMode === 'dark' ? (
                  <Moon className="h-4 w-4 mr-2" />
                ) : (
                  <div className="flex items-center justify-center mr-2 w-4 h-4">
                    <Sun className="h-3 w-3 absolute" />
                    <Moon className="h-3 w-3 absolute opacity-30" />
                  </div>
                )}
                Display Mode
              </span>
              <span className="text-xs text-stone-500 capitalize">{displayMode}</span>
            </DropdownMenuItem>
            
            <DropdownMenuItem onClick={toggleMobileOptimization} className="flex justify-between cursor-pointer">
              <span className="flex items-center">
                {mobileOptimized ? (
                  <Smartphone className="h-4 w-4 mr-2" />
                ) : (
                  <Laptop className="h-4 w-4 mr-2" />
                )}
                Mobile Optimization
              </span>
              <span className="text-xs text-stone-500">{mobileOptimized ? 'On' : 'Off'}</span>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-xs text-stone-500">
              Mobile optimization reduces map details for better performance on small screens.
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </div>
  );
};

export default MapControls;

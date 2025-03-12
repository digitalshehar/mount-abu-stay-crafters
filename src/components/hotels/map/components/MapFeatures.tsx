
import React from 'react';
import { Map, Landmark, Navigation, User, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface MapFeaturesProps {
  onToggleHeatmap: () => void;
  onToggleLandmarks: () => void;
  onToggleTraffic: () => void;
  onUserLocation: () => void;
  showHeatmap?: boolean;
}

const MapFeatures: React.FC<MapFeaturesProps> = ({
  onToggleHeatmap,
  onToggleLandmarks,
  onToggleTraffic,
  onUserLocation,
  showHeatmap = false
}) => {
  return (
    <div className="absolute top-4 right-4 bg-white rounded-md shadow-md p-2 flex flex-col gap-2 z-10">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant={showHeatmap ? "default" : "outline"}
              size="icon" 
              className={`h-8 w-8 ${showHeatmap ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
              onClick={onToggleHeatmap}
            >
              <Layers className={`h-4 w-4 ${showHeatmap ? 'text-white' : ''}`} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>{showHeatmap ? 'Hide' : 'Show'} hotel density heatmap</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8"
              onClick={onToggleLandmarks}
            >
              <Landmark className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Show landmarks</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8"
              onClick={onToggleTraffic}
            >
              <Map className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Show traffic</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline" 
              size="icon" 
              className="h-8 w-8"
              onClick={onUserLocation}
            >
              <User className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">
            <p>Show your location</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default MapFeatures;

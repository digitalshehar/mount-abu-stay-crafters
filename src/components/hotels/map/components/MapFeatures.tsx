
import React from 'react';
import { Map, Layers, Locate, Map as MapIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface MapFeaturesProps {
  onToggleHeatmap: () => void;
  onToggleLandmarks: () => void;
  onToggleTraffic: () => void;
  onUserLocation: () => void;
  showHeatmap: boolean;
  showLandmarks: boolean;
  showTraffic: boolean;
}

const MapFeatures: React.FC<MapFeaturesProps> = ({
  onToggleHeatmap,
  onToggleLandmarks,
  onToggleTraffic,
  onUserLocation,
  showHeatmap,
  showLandmarks,
  showTraffic
}) => {
  return (
    <div className="absolute top-4 right-4 z-10">
      <div className="bg-white rounded-lg shadow-md p-2">
        <TooltipProvider>
          <ToggleGroup type="multiple" className="flex flex-col space-y-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value="heatmap"
                  aria-label="Toggle heatmap"
                  className={`h-8 w-8 p-0 ${showHeatmap ? 'bg-amber-100 text-amber-700' : ''}`}
                  onClick={onToggleHeatmap}
                >
                  <Layers className="h-4 w-4" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Toggle price heatmap</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value="landmarks"
                  aria-label="Toggle landmarks"
                  className={`h-8 w-8 p-0 ${showLandmarks ? 'bg-blue-100 text-blue-700' : ''}`}
                  onClick={onToggleLandmarks}
                >
                  <MapIcon className="h-4 w-4" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Toggle points of interest</p>
              </TooltipContent>
            </Tooltip>
            
            <Tooltip>
              <TooltipTrigger asChild>
                <ToggleGroupItem
                  value="traffic"
                  aria-label="Toggle traffic"
                  className={`h-8 w-8 p-0 ${showTraffic ? 'bg-red-100 text-red-700' : ''}`}
                  onClick={onToggleTraffic}
                >
                  <Map className="h-4 w-4" />
                </ToggleGroupItem>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>Toggle traffic conditions</p>
              </TooltipContent>
            </Tooltip>
          </ToggleGroup>
        </TooltipProvider>
        
        <div className="mt-2 pt-2 border-t border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={onUserLocation}
          >
            <Locate className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MapFeatures;

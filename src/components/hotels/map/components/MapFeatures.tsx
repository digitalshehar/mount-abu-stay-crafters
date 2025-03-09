
import React from 'react';
import { Map, Landmark, Navigation, User, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MapFeaturesProps {
  onToggleHeatmap: () => void;
  onToggleLandmarks: () => void;
  onToggleTraffic: () => void;
  onUserLocation: () => void;
}

const MapFeatures: React.FC<MapFeaturesProps> = ({
  onToggleHeatmap,
  onToggleLandmarks,
  onToggleTraffic,
  onUserLocation
}) => {
  return (
    <div className="absolute top-4 right-4 bg-white rounded-md shadow-md p-2 flex flex-col gap-2 z-10">
      <Button 
        variant="outline" 
        size="icon" 
        className="h-8 w-8"
        onClick={onToggleHeatmap}
        title="Toggle price heatmap"
      >
        <Layers className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon" 
        className="h-8 w-8"
        onClick={onToggleLandmarks}
        title="Show landmarks"
      >
        <Landmark className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon" 
        className="h-8 w-8"
        onClick={onToggleTraffic}
        title="Show traffic"
      >
        <Map className="h-4 w-4" />
      </Button>
      
      <Button 
        variant="outline" 
        size="icon" 
        className="h-8 w-8"
        onClick={onUserLocation}
        title="Your location"
      >
        <User className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default MapFeatures;

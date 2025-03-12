
import React, { useState, useCallback } from 'react';
import MapFeatures from './MapFeatures';

interface MapFeaturesManagerProps {
  onUserLocation: () => void;
  setShowHeatmap: (show: boolean) => void;
  showHeatmap: boolean;
}

const MapFeaturesManager: React.FC<MapFeaturesManagerProps> = ({ 
  onUserLocation,
  setShowHeatmap,
  showHeatmap
}) => {
  const [showLandmarks, setShowLandmarks] = useState(false);
  const [showTraffic, setShowTraffic] = useState(false);

  // Toggle heatmap
  const handleToggleHeatmap = useCallback(() => {
    setShowHeatmap(!showHeatmap);
  }, [showHeatmap, setShowHeatmap]);
  
  // Toggle landmarks
  const handleToggleLandmarks = useCallback(() => {
    setShowLandmarks(prev => !prev);
  }, []);
  
  // Toggle traffic
  const handleToggleTraffic = useCallback(() => {
    setShowTraffic(prev => !prev);
  }, []);
  
  return (
    <MapFeatures 
      onToggleHeatmap={handleToggleHeatmap}
      onToggleLandmarks={handleToggleLandmarks}
      onToggleTraffic={handleToggleTraffic}
      onUserLocation={onUserLocation}
      showHeatmap={showHeatmap}
      showLandmarks={showLandmarks}
      showTraffic={showTraffic}
    />
  );
};

export default MapFeaturesManager;

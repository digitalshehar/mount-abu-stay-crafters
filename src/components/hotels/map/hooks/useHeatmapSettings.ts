
import { useState } from 'react';

export const useHeatmapSettings = () => {
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [heatmapRadius, setHeatmapRadius] = useState(20);
  const [heatmapIntensity, setHeatmapIntensity] = useState(0.7);
  const [heatmapColorScheme, setHeatmapColorScheme] = useState('default');
  
  return {
    showHeatmap,
    setShowHeatmap,
    heatmapRadius,
    setHeatmapRadius,
    heatmapIntensity,
    setHeatmapIntensity,
    heatmapColorScheme,
    setHeatmapColorScheme
  };
};

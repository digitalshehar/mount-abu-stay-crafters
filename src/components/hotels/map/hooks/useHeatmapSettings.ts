
import { useState } from 'react';

export const useHeatmapSettings = () => {
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [heatmapRadius, setHeatmapRadius] = useState(20);
  const [heatmapIntensity, setHeatmapIntensity] = useState(0.7);
  const [heatmapColorScheme, setHeatmapColorScheme] = useState('default');
  const [weightByPopularity, setWeightByPopularity] = useState(true);
  
  // List of available color schemes
  const colorSchemes = [
    { id: 'default', name: 'Default Blue-Red' },
    { id: 'green', name: 'Green Intensity' },
    { id: 'purple', name: 'Purple Spectrum' },
    { id: 'popularity', name: 'Popularity Heat' }
  ];
  
  // Reset heatmap settings to defaults
  const resetHeatmapSettings = () => {
    setHeatmapRadius(20);
    setHeatmapIntensity(0.7);
    setHeatmapColorScheme('default');
    setWeightByPopularity(true);
  };
  
  return {
    showHeatmap,
    setShowHeatmap,
    heatmapRadius,
    setHeatmapRadius,
    heatmapIntensity,
    setHeatmapIntensity,
    heatmapColorScheme,
    setHeatmapColorScheme,
    weightByPopularity,
    setWeightByPopularity,
    colorSchemes,
    resetHeatmapSettings
  };
};

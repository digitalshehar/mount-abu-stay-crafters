
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X } from 'lucide-react';

interface HeatmapControlsProps {
  showHeatmap: boolean;
  setShowHeatmap: (show: boolean) => void;
  dataPoints: number;
  heatmapRadius: number;
  setHeatmapRadius: (radius: number) => void;
  heatmapIntensity: number;
  setHeatmapIntensity: (intensity: number) => void;
  heatmapColorScheme: string;
  setHeatmapColorScheme: (scheme: string) => void;
  weightByPopularity?: boolean;
  setWeightByPopularity?: (value: boolean) => void;
  colorSchemes?: { id: string; name: string }[];
}

const HeatmapControls: React.FC<HeatmapControlsProps> = ({
  showHeatmap,
  setShowHeatmap,
  dataPoints,
  heatmapRadius,
  setHeatmapRadius,
  heatmapIntensity,
  setHeatmapIntensity,
  heatmapColorScheme,
  setHeatmapColorScheme,
  weightByPopularity = true,
  setWeightByPopularity = () => {},
  colorSchemes = [
    { id: 'default', name: 'Default Blue-Red' },
    { id: 'green', name: 'Green Intensity' },
    { id: 'purple', name: 'Purple Spectrum' },
    { id: 'popularity', name: 'Popularity Heat' }
  ]
}) => {
  if (!showHeatmap) {
    return null;
  }
  
  return (
    <Card className="absolute bottom-4 left-4 z-20 w-64 shadow-lg bg-white/95 backdrop-blur-sm">
      <CardContent className="py-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-medium">Heatmap Settings</h3>
          <button
            onClick={() => setShowHeatmap(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Radius</span>
              <span>{heatmapRadius}px</span>
            </div>
            <Slider
              value={[heatmapRadius]}
              min={10}
              max={50}
              step={1}
              onValueChange={(value) => setHeatmapRadius(value[0])}
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-gray-500">
              <span>Intensity</span>
              <span>{(heatmapIntensity * 100).toFixed(0)}%</span>
            </div>
            <Slider
              value={[heatmapIntensity * 100]}
              min={10}
              max={100}
              step={5}
              onValueChange={(value) => setHeatmapIntensity(value[0] / 100)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="colorScheme" className="text-xs text-gray-500">Color Scheme</Label>
            <Select 
              value={heatmapColorScheme} 
              onValueChange={setHeatmapColorScheme}
            >
              <SelectTrigger id="colorScheme" className="w-full">
                <SelectValue placeholder="Select color scheme" />
              </SelectTrigger>
              <SelectContent>
                {colorSchemes.map(scheme => (
                  <SelectItem key={scheme.id} value={scheme.id}>
                    {scheme.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center justify-between">
            <Label htmlFor="weight-by-popularity" className="text-xs text-gray-500">
              Weight by popularity
            </Label>
            <Switch 
              id="weight-by-popularity" 
              checked={weightByPopularity}
              onCheckedChange={setWeightByPopularity}
            />
          </div>
          
          <div className="text-xs text-gray-500 mt-2">
            Visualizing {dataPoints} hotels
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default HeatmapControls;

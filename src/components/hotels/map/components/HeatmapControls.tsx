
import React, { useState } from 'react';
import { Thermometer, Layers, AlertTriangle, Settings, Sliders } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface HeatmapControlsProps {
  showHeatmap: boolean;
  setShowHeatmap: (show: boolean) => void;
  dataPoints: number;
  heatmapRadius?: number;
  setHeatmapRadius?: (radius: number) => void;
  heatmapIntensity?: number;
  setHeatmapIntensity?: (intensity: number) => void;
  heatmapColorScheme?: string;
  setHeatmapColorScheme?: (scheme: string) => void;
}

const colorSchemes = [
  {
    name: 'default',
    label: 'Blue to Red',
    gradient: 'from-blue-500 via-yellow-500 to-red-500'
  },
  {
    name: 'green',
    label: 'Green to Red',
    gradient: 'from-green-500 via-yellow-500 to-red-500'
  },
  {
    name: 'purple',
    label: 'Purple to Red',
    gradient: 'from-purple-500 via-fuchsia-500 to-red-500'
  }
];

const HeatmapControls: React.FC<HeatmapControlsProps> = ({
  showHeatmap,
  setShowHeatmap,
  dataPoints,
  heatmapRadius = 20,
  setHeatmapRadius = () => {},
  heatmapIntensity = 0.7,
  setHeatmapIntensity = () => {},
  heatmapColorScheme = 'default',
  setHeatmapColorScheme = () => {}
}) => {
  const [advancedOpen, setAdvancedOpen] = useState(false);
  
  const handleToggleHeatmap = () => {
    setShowHeatmap(!showHeatmap);
  };

  const notEnoughData = dataPoints < 3;
  const selectedScheme = colorSchemes.find(scheme => scheme.name === heatmapColorScheme) || colorSchemes[0];

  return (
    <div className="absolute top-4 right-4 z-10 bg-white p-3 rounded-lg shadow-md">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <Thermometer className="h-4 w-4 text-amber-600 mr-2" />
            <span className="text-sm font-medium">Price Heatmap</span>
          </div>
          <Badge 
            variant={showHeatmap ? "default" : "outline"}
            className={showHeatmap ? "bg-amber-500" : ""}
          >
            {showHeatmap ? "ON" : "OFF"}
          </Badge>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="heatmap-toggle"
            checked={showHeatmap}
            onCheckedChange={handleToggleHeatmap}
            disabled={notEnoughData}
          />
          <Label htmlFor="heatmap-toggle" className="text-xs text-gray-500">
            {notEnoughData ? "Not enough data points" : "Toggle heatmap layer"}
          </Label>
        </div>
        
        {notEnoughData && (
          <div className="flex items-center text-xs text-amber-600 mt-1">
            <AlertTriangle className="h-3 w-3 mr-1" />
            <span>Need at least 3 hotels for heatmap</span>
          </div>
        )}
        
        {showHeatmap && (
          <>
            <div className="mt-2 pt-2 border-t border-gray-100">
              <div className={`h-2 w-full bg-gradient-to-r ${selectedScheme.gradient} rounded-full`} />
              <div className="flex justify-between mt-1">
                <span className="text-[10px] text-gray-500">Lower</span>
                <span className="text-[10px] text-gray-500">Higher</span>
              </div>
            </div>
            
            <Popover open={advancedOpen} onOpenChange={setAdvancedOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="mt-2 w-full flex items-center justify-center">
                  <Settings className="h-3 w-3 mr-1" />
                  <span className="text-xs">Customize Heatmap</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Heatmap Settings</h4>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="radius" className="text-xs">Radius</Label>
                      <span className="text-xs text-gray-500">{heatmapRadius}px</span>
                    </div>
                    <Slider 
                      id="radius"
                      min={10}
                      max={50}
                      step={1}
                      value={[heatmapRadius]}
                      onValueChange={(value) => setHeatmapRadius(value[0])}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="intensity" className="text-xs">Intensity</Label>
                      <span className="text-xs text-gray-500">{heatmapIntensity.toFixed(1)}</span>
                    </div>
                    <Slider 
                      id="intensity"
                      min={0.1}
                      max={1.0}
                      step={0.1}
                      value={[heatmapIntensity]}
                      onValueChange={(value) => setHeatmapIntensity(value[0])}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label className="text-xs">Color Scheme</Label>
                    <div className="grid grid-cols-3 gap-2">
                      {colorSchemes.map((scheme) => (
                        <div 
                          key={scheme.name}
                          className={`cursor-pointer p-1 rounded ${heatmapColorScheme === scheme.name ? 'ring-2 ring-primary' : 'hover:bg-gray-100'}`}
                          onClick={() => setHeatmapColorScheme(scheme.name)}
                        >
                          <div className={`h-2 w-full bg-gradient-to-r ${scheme.gradient} rounded-full mb-1`} />
                          <p className="text-[10px] text-center">{scheme.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </>
        )}
      </div>
    </div>
  );
};

export default HeatmapControls;

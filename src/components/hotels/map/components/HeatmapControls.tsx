
import React from 'react';
import { Thermometer, Layers, AlertTriangle } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface HeatmapControlsProps {
  showHeatmap: boolean;
  setShowHeatmap: (show: boolean) => void;
  dataPoints: number;
}

const HeatmapControls: React.FC<HeatmapControlsProps> = ({
  showHeatmap,
  setShowHeatmap,
  dataPoints
}) => {
  const handleToggleHeatmap = () => {
    setShowHeatmap(!showHeatmap);
  };

  const notEnoughData = dataPoints < 3;

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
          <div className="mt-2 pt-2 border-t border-gray-100">
            <div className="h-2 w-full bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500 rounded-full" />
            <div className="flex justify-between mt-1">
              <span className="text-[10px] text-gray-500">Lower</span>
              <span className="text-[10px] text-gray-500">Higher</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeatmapControls;

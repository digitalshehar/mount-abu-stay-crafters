
import React from 'react';
import { Hotel } from '@/components/admin/hotels/types';
import { Badge } from '@/components/ui/badge';

interface MapStatsProps {
  visibleHotels: Hotel[];
  showHeatmap: boolean;
  viewMode: 'map' | 'list';
  totalHotels: number;
}

const MapStats: React.FC<MapStatsProps> = ({ 
  visibleHotels, 
  showHeatmap, 
  viewMode,
  totalHotels
}) => {
  return (
    <div className="bg-stone-50 p-4 rounded-lg shadow-sm">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-sm text-stone-600">
          Showing <span className="font-semibold">{visibleHotels.length}</span> of {totalHotels} hotels in Mount Abu.
        </p>
        
        {showHeatmap && viewMode === 'map' && (
          <Badge variant="outline" className="bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 border-blue-200">
            Heatmap active
          </Badge>
        )}
        
        {visibleHotels.length < totalHotels && (
          <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
            Filters applied
          </Badge>
        )}
      </div>
      
      {showHeatmap && viewMode === 'map' && (
        <p className="text-xs text-stone-500 mt-1">
          The heatmap displays areas with high hotel concentration. Featured hotels are weighted more heavily.
        </p>
      )}
    </div>
  );
};

export default MapStats;

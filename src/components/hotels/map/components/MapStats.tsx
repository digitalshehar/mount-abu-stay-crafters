
import React from 'react';
import { Hotel } from '@/components/admin/hotels/types';

interface MapStatsProps {
  visibleHotels: Hotel[];
  showHeatmap: boolean;
  viewMode: 'map' | 'list';
}

const MapStats: React.FC<MapStatsProps> = ({ 
  visibleHotels, 
  showHeatmap, 
  viewMode 
}) => {
  return (
    <div className="bg-stone-50 p-4 rounded-lg">
      <p className="text-sm text-stone-600">
        Showing {visibleHotels.length} hotels in Mount Abu. 
        {showHeatmap && viewMode === 'map' && ' The heatmap displays areas with high hotel concentration.'}
      </p>
    </div>
  );
};

export default MapStats;

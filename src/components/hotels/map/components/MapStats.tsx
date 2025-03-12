
import React from 'react';
import { Hotel } from '@/components/admin/hotels/types';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/utils/hotel';

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
  const avgPrice = visibleHotels.length > 0 
    ? visibleHotels.reduce((sum, hotel) => sum + (hotel.pricePerNight || 0), 0) / visibleHotels.length 
    : 0;
    
  const topRatedHotel = visibleHotels.length > 0 
    ? visibleHotels.reduce((prev, current) => (current.rating > prev.rating) ? current : prev, visibleHotels[0])
    : null;

  return (
    <div className="bg-stone-50 p-4 rounded-lg shadow-sm">
      <div className="flex flex-wrap items-center gap-2 mb-2">
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
      
      <div className="flex flex-wrap gap-3 mt-1 text-xs text-stone-500">
        {avgPrice > 0 && (
          <span>Average price: <span className="font-medium">{formatCurrency(avgPrice)}</span></span>
        )}
        
        {topRatedHotel && (
          <span>Top rated: <span className="font-medium">{topRatedHotel.name}</span> ({topRatedHotel.rating}★)</span>
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

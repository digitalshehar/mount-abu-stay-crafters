
import React from 'react';
import { Hotel } from '@/components/admin/hotels/types';
import { Thermometer, MapPin, Star, Crosshair } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MapStatsProps {
  visibleHotels: Hotel[];
  showHeatmap: boolean;
  viewMode: 'map' | 'list';
}

const MapStats: React.FC<MapStatsProps> = ({ visibleHotels, showHeatmap, viewMode }) => {
  // Calculate stats
  const totalHotels = visibleHotels.length;
  const averageRating = totalHotels > 0 
    ? parseFloat((visibleHotels.reduce((sum, hotel) => sum + (hotel.rating || 0), 0) / totalHotels).toFixed(1))
    : 0;
  const featuredHotels = visibleHotels.filter(hotel => hotel.featured).length;
  const averagePrice = totalHotels > 0
    ? Math.round(visibleHotels.reduce((sum, hotel) => sum + hotel.pricePerNight, 0) / totalHotels)
    : 0;
  
  const stats = [
    {
      icon: MapPin,
      label: 'Visible Properties',
      value: totalHotels.toString(),
      color: 'text-blue-500',
    },
    {
      icon: Star,
      label: 'Average Rating',
      value: `${averageRating} / 5`,
      color: 'text-yellow-500',
    },
    {
      icon: Crosshair,
      label: 'Featured Properties',
      value: featuredHotels.toString(),
      color: 'text-purple-500',
    },
    {
      icon: Thermometer,
      label: 'Average Price',
      value: `₹${averagePrice}`,
      color: 'text-green-500',
      highlight: showHeatmap,
    },
  ];

  if (viewMode !== 'map') {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 mt-4">
      <h3 className="text-sm font-medium text-gray-700 mb-3">Map Statistics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="flex items-center space-x-2">
            <div className={cn("h-8 w-8 rounded-full flex items-center justify-center", 
              stat.highlight ? "bg-amber-100" : "bg-slate-100")}>
              <stat.icon className={cn("h-4 w-4", stat.color)} />
            </div>
            <div>
              <p className="text-xs text-gray-500">{stat.label}</p>
              <p className={cn("text-sm font-medium", 
                stat.highlight ? "text-amber-600" : "text-gray-900")}>
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {showHeatmap && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="flex items-center">
            <div className="h-3 w-full bg-gradient-to-r from-blue-500 via-yellow-500 to-red-500 rounded-full" />
          </div>
          <div className="flex justify-between mt-1">
            <span className="text-xs text-gray-500">Lower Price</span>
            <span className="text-xs text-gray-500">Higher Price</span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Heatmap intensity indicates price density in the area
          </p>
        </div>
      )}
    </div>
  );
};

export default MapStats;

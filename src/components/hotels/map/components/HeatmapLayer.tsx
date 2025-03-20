
import React, { useEffect, useState } from 'react';
import { HeatmapLayer as GoogleHeatmapLayer } from '@react-google-maps/api';
import { Hotel } from '@/components/admin/hotels/types';

interface HeatmapLayerProps {
  hotels: Hotel[];
  visible: boolean;
  radius?: number;
  opacity?: number;
  colorScheme?: string;
  weightByPopularity?: boolean;
}

// Color gradient definitions for different schemes
const gradientSchemes = {
  default: [
    'rgba(0, 255, 255, 0)',
    'rgba(0, 255, 255, 1)',
    'rgba(0, 191, 255, 1)',
    'rgba(0, 127, 255, 1)',
    'rgba(0, 63, 255, 1)',
    'rgba(0, 0, 255, 1)',
    'rgba(0, 0, 223, 1)',
    'rgba(0, 0, 191, 1)',
    'rgba(0, 0, 159, 1)',
    'rgba(0, 0, 127, 1)',
    'rgba(63, 0, 91, 1)',
    'rgba(127, 0, 63, 1)',
    'rgba(191, 0, 31, 1)',
    'rgba(255, 0, 0, 1)'
  ],
  green: [
    'rgba(0, 255, 127, 0)',
    'rgba(0, 255, 127, 1)',
    'rgba(0, 223, 127, 1)',
    'rgba(0, 191, 127, 1)',
    'rgba(0, 159, 127, 1)',
    'rgba(0, 127, 127, 1)',
    'rgba(63, 127, 0, 1)',
    'rgba(127, 127, 0, 1)',
    'rgba(191, 127, 0, 1)',
    'rgba(255, 127, 0, 1)',
    'rgba(255, 63, 0, 1)',
    'rgba(255, 0, 0, 1)'
  ],
  purple: [
    'rgba(128, 0, 255, 0)',
    'rgba(128, 0, 255, 1)',
    'rgba(148, 0, 235, 1)',
    'rgba(168, 0, 215, 1)',
    'rgba(188, 0, 195, 1)',
    'rgba(208, 0, 175, 1)',
    'rgba(228, 0, 155, 1)',
    'rgba(248, 0, 135, 1)',
    'rgba(255, 0, 115, 1)',
    'rgba(255, 0, 95, 1)',
    'rgba(255, 0, 75, 1)',
    'rgba(255, 0, 55, 1)',
    'rgba(255, 0, 35, 1)',
    'rgba(255, 0, 0, 1)'
  ],
  popularity: [
    'rgba(0, 255, 0, 0)',
    'rgba(0, 255, 0, 1)',
    'rgba(63, 255, 0, 1)',
    'rgba(127, 255, 0, 1)',
    'rgba(191, 255, 0, 1)',
    'rgba(255, 255, 0, 1)',
    'rgba(255, 223, 0, 1)',
    'rgba(255, 191, 0, 1)',
    'rgba(255, 159, 0, 1)',
    'rgba(255, 127, 0, 1)',
    'rgba(255, 95, 0, 1)',
    'rgba(255, 63, 0, 1)',
    'rgba(255, 31, 0, 1)',
    'rgba(255, 0, 0, 1)'
  ]
};

const HeatmapLayer: React.FC<HeatmapLayerProps> = ({ 
  hotels, 
  visible, 
  radius = 20, 
  opacity = 0.7,
  colorScheme = 'default',
  weightByPopularity = true
}) => {
  const [heatmapData, setHeatmapData] = useState<google.maps.visualization.WeightedLocation[]>([]);
  
  useEffect(() => {
    if (hotels.length > 0) {
      const points = hotels
        .filter(hotel => hotel.latitude && hotel.longitude)
        .map(hotel => {
          // Calculate weight based on various factors
          let weight = 1;
          
          if (weightByPopularity) {
            // Featured hotels have more weight
            if (hotel.featured) weight *= 1.5;
            
            // Higher rated hotels have more weight
            if (hotel.rating) weight *= (hotel.rating / 5) * 1.2;
            
            // Hotels with more reviews have more weight
            if (hotel.reviewCount) {
              // Log scale for review count to prevent extremely popular hotels from dominating
              const reviewFactor = Math.log10(hotel.reviewCount + 1) / 2;
              weight *= (1 + reviewFactor);
            }
            
            // Price could also be a factor (inverse relationship - lower prices more popular)
            if (hotel.pricePerNight) {
              const maxPrice = 1000; // Assume this as a benchmark
              const priceFactor = 1 - (hotel.pricePerNight / maxPrice) * 0.5; // 0.5-1.0 range
              weight *= Math.max(0.5, priceFactor); // Don't let it go below 0.5
            }
          }
          
          return {
            location: new google.maps.LatLng(hotel.latitude || 0, hotel.longitude || 0),
            weight
          };
        });
      
      setHeatmapData(points);
    }
  }, [hotels, weightByPopularity]);
  
  if (!visible || heatmapData.length === 0) {
    return null;
  }
  
  // Get the gradient for the selected scheme
  const gradient = gradientSchemes[colorScheme as keyof typeof gradientSchemes] || gradientSchemes.default;
  
  return (
    <GoogleHeatmapLayer
      data={heatmapData}
      options={{
        radius,
        opacity,
        gradient
      }}
    />
  );
};

export default HeatmapLayer;

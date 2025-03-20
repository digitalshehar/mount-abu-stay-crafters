
import React from 'react';
import { MapPin, Badge as BadgeIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface HotelsHeaderProps {
  hotelsCount: number;
}

const HotelsHeader: React.FC<HotelsHeaderProps> = ({ hotelsCount }) => {
  return (
    <div className="relative mb-8 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-pattern-dots"></div>
      <div className="relative z-10 px-6 py-12 md:py-16 text-white text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          Hotels in Mount Abu
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-6 text-blue-100">
          Find the perfect accommodation for your stay in Rajasthan's only hill station
        </p>
        <div className="flex items-center justify-center gap-2 text-sm">
          <MapPin className="h-4 w-4" />
          <span>Mount Abu, Rajasthan, India</span>
          <span className="mx-2">•</span>
          <Badge variant="secondary" className="bg-white/20 text-white hover:bg-white/30 border-none">
            {hotelsCount} properties
          </Badge>
        </div>
      </div>
    </div>
  );
};

export default HotelsHeader;

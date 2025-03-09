
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Define the zones in Mount Abu with the same data structure
const ZONES = [
  { 
    id: 'nakki-lake', 
    name: 'Nakki Lake Area', 
    description: 'Hotels near the beautiful Nakki Lake',
    bounds: {
      north: 24.6027,
      south: 24.5827,
      east: 72.7256,
      west: 72.7056
    }
  },
  { 
    id: 'sunset-point', 
    name: 'Sunset Point', 
    description: 'Hotels with stunning sunset views',
    bounds: {
      north: 24.6127,
      south: 24.5927,
      east: 72.7356,
      west: 72.7156
    }
  },
  { 
    id: 'dilwara-temples', 
    name: 'Dilwara Temples', 
    description: 'Hotels near the historic Dilwara Temples',
    bounds: {
      north: 24.6227,
      south: 24.6027,
      east: 72.7456,
      west: 72.7256
    }
  },
  { 
    id: 'downtown', 
    name: 'Downtown', 
    description: 'Hotels in the heart of Mount Abu',
    bounds: {
      north: 24.5927,
      south: 24.5727,
      east: 72.7256,
      west: 72.7056
    }
  }
];

interface ZoneSelectorProps {
  onSelectZone: (bounds: any) => void;
}

const ZoneSelector: React.FC<ZoneSelectorProps> = ({ onSelectZone }) => {
  const [activeZone, setActiveZone] = useState<string | null>(null);
  
  const handleZoneClick = (zoneId: string) => {
    const zone = ZONES.find(z => z.id === zoneId);
    if (!zone) return;
    
    setActiveZone(zoneId === activeZone ? null : zoneId);
    
    if (zoneId === activeZone) {
      // If clicking the already selected zone, clear the selection
      onSelectZone(null);
    } else {
      // Convert bounds to the format expected by the map component
      const bounds = {
        getSouth: () => zone.bounds.south,
        getNorth: () => zone.bounds.north,
        getWest: () => zone.bounds.west,
        getEast: () => zone.bounds.east
      };
      onSelectZone(bounds);
    }
  };
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="font-medium text-sm mb-3">Explore Zones in Mount Abu</h3>
      <div className="flex flex-wrap gap-2 mb-3">
        {ZONES.map(zone => (
          <Badge 
            key={zone.id}
            variant={activeZone === zone.id ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => handleZoneClick(zone.id)}
          >
            {zone.name}
          </Badge>
        ))}
      </div>
      {activeZone && (
        <div className="text-xs text-stone-500">
          {ZONES.find(z => z.id === activeZone)?.description}
        </div>
      )}
      {activeZone && (
        <Button 
          variant="ghost" 
          size="sm" 
          className="text-xs mt-2 h-7 px-2" 
          onClick={() => {
            setActiveZone(null);
            onSelectZone(null);
          }}
        >
          Clear Selection
        </Button>
      )}
    </div>
  );
};

export default ZoneSelector;

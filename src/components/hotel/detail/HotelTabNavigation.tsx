
import React from 'react';
import { cn } from "@/lib/utils";

export interface HotelTabNavigationProps {
  activeTab: string;
  onChange: (value: string) => void;
}

const HotelTabNavigation: React.FC<HotelTabNavigationProps> = ({ 
  activeTab,
  onChange
}) => {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'rooms', label: 'Rooms' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'policies', label: 'Policies' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'location', label: 'Location' },
    { id: 'attractions', label: 'Attractions' },
  ];

  return (
    <div className="border-b border-stone-200 mb-8">
      <div className="flex gap-2 md:gap-6 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={cn(
              "px-4 py-3 text-sm md:text-base whitespace-nowrap transition-colors",
              activeTab === tab.id
                ? "text-primary font-medium border-b-2 border-primary"
                : "text-stone-500 hover:text-stone-800"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default HotelTabNavigation;
